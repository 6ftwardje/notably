import { NextRequest, NextResponse } from 'next/server'
import ytdl from 'ytdl-core'
import { exec } from 'child_process'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)

const isDev = process.env.NODE_ENV !== 'production'

// Download audio using yt-dlp
async function downloadAudioWithYtDlp(url: string, outputPath: string): Promise<void> {
  console.log('🔄 [yt-dlp] Downloading audio...')
  try {
    const command = `yt-dlp -f "bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio" -o "${outputPath}" "${url}" --no-playlist --extract-audio --audio-format mp3 --audio-quality 0`
    await execAsync(command)
    console.log('✅ [yt-dlp] Download successful')
  } catch (error) {
    console.log('❌ [yt-dlp] Download failed:', error)
    throw new Error('yt-dlp failed to download the video')
  }
}

// Initialize OpenAI client
let openai: OpenAI
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error)
  throw error
}

export async function POST(request: NextRequest) {
  let step = 'init'
  try {
    step = 'parse-request'
    const { url } = await request.json()
    console.log('📝 [parse-request] Received URL:', url)

    if (!url) {
      return NextResponse.json({ error: 'YouTube URL is required', step }, { status: 400 })
    }

    step = 'validate-url'
    if (!ytdl.validateURL(url)) {
      console.log('❌ [validate-url] Invalid YouTube URL:', url)
      return NextResponse.json({ error: 'Invalid YouTube URL', step }, { status: 400 })
    }
    console.log('✅ [validate-url] YouTube URL is valid')

    step = 'download-audio'
    // Prepare temp dir and file
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
      console.log('📁 [download-audio] Created temp directory')
    }
    const audioFilePath = path.join(tempDir, `audio-${Date.now()}.mp3`)
    console.log('💾 [download-audio] Audio file path:', audioFilePath)
    await downloadAudioWithYtDlp(url, audioFilePath)

    step = 'read-audio'
    const audioBuffer = fs.readFileSync(audioFilePath)
    console.log('📊 [read-audio] Audio file size:', audioBuffer.length, 'bytes')

    step = 'transcribe'
    console.log('🎤 [transcribe] Starting transcription with Whisper...')
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], 'audio.mp3', { type: 'audio/mp3' }),
      model: 'whisper-1',
      response_format: 'text',
    })
    console.log('✅ [transcribe] Transcription completed')
    console.log('📝 [transcribe] Transcript length:', transcription.length, 'characters')

    step = 'cleanup-audio'
    await unlink(audioFilePath)
    console.log('✅ [cleanup-audio] Audio file cleaned up')

    step = 'summarize'
    console.log('🧠 [summarize] Starting summarization with GPT-4...')
    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that creates practical study notes from video transcripts. Focus on extracting actionable insights, key concepts, and practical takeaways. Format your response as a clear, organized list of study points that someone could use for learning and reference.`
        },
        {
          role: 'user',
          content: `Please create practical study notes from this video transcript. Focus on the most important and actionable points:\n\n${transcription}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    })
    const summary = summaryResponse.choices[0]?.message?.content || 'No summary generated'
    console.log('✅ [summarize] Summarization completed')
    console.log('📋 [summarize] Summary length:', summary.length, 'characters')

    // No video info (since we skip ytdl-core for info)
    const videoTitle = 'YouTube Video'
    const videoDuration = ''

    step = 'done'
    return NextResponse.json({
      transcript: transcription,
      summary,
      videoTitle,
      videoDuration,
    })
  } catch (error) {
    console.error(`❌ [${step}] Error:`, error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
      details: isDev && error instanceof Error ? error.stack : undefined,
      step,
    }, { status: 500 })
  }
} 