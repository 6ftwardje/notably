# Notably - YouTube Video Summarizer

A modern web application that transforms YouTube videos into practical study notes using AI-powered transcription and summarization.

## ✨ Features

- **YouTube Video Processing**: Accepts any YouTube URL and downloads the audio
- **AI Transcription**: Uses OpenAI Whisper for accurate speech-to-text conversion
- **Smart Summarization**: GPT-4 generates practical study notes from transcripts
- **Modern UI**: Clean, responsive design with dark theme and blue accents
- **Export Options**: Download transcripts and summaries as text files
- **Real-time Processing**: Live status updates during video processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- OpenAI API key
- FFmpeg (for audio processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/6ftwardje/notably.git
   cd notably
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Install FFmpeg** (if not already installed)
   
   **macOS:**
   ```bash
   brew install ffmpeg
   ```
   
   **Ubuntu/Debian:**
   ```bash
   sudo apt update
   sudo apt install ffmpeg
   ```
   
   **Windows:**
   Download from [FFmpeg official website](https://ffmpeg.org/download.html)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Paste a YouTube URL** in the input field
2. **Click "Generate Notes"** to start processing
3. **Wait for processing** (may take a few minutes for longer videos)
4. **View results** in the organized tabs:
   - **Key Study Notes**: Practical study notes and key takeaways
   - **Full Transcript**: Complete text transcription
5. **Download** results as text files or copy to clipboard

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Video Processing**: ytdl-core
- **AI Services**: OpenAI Whisper & GPT-4
- **Audio Processing**: FFmpeg

## 📁 Project Structure

```
notably/
├── app/
│   ├── api/transcribe/route.ts    # API endpoint for transcription
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page component
├── components/
│   ├── YouTubeForm.tsx           # URL input form
│   ├── ResultsDisplay.tsx        # Results display component
│   └── LoadingScreen.tsx         # Loading animation
├── temp/                         # Temporary audio files (auto-created)
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (get one at https://platform.openai.com/api-keys)

### API Rate Limits

- **Whisper API**: $0.006 per minute of audio
- **GPT-4 API**: ~$0.03 per 1K tokens for summarization

### Video Limitations

- **Duration**: Recommended under 2 hours for optimal performance
- **Format**: Any YouTube video (public or unlisted)
- **Language**: Whisper supports 99+ languages

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy**

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- **Render**: Add build command `npm run build`
- **Heroku**: Add `engines` to package.json
- **Railway**: Direct deployment from GitHub

## 🔒 Security Notes

- API keys are stored server-side only
- Temporary audio files are automatically cleaned up
- No user data is stored permanently
- YouTube URLs are validated before processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**"OpenAI API key not configured"**
- Ensure `.env.local` exists with your API key
- Restart the development server

**"FFmpeg not found"**
- Install FFmpeg following the installation guide above
- Ensure it's in your system PATH

**"Invalid YouTube URL"**
- Check that the URL is a valid YouTube video
- Ensure the video is not private or age-restricted

**"Processing timeout"**
- Long videos may take several minutes
- Check your internet connection
- Consider using shorter videos for testing

### Performance Tips

- Use shorter videos for faster processing
- Ensure stable internet connection
- Close other resource-intensive applications

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review OpenAI API documentation
- Open an issue on GitHub

---

Made with ❤️ by Notably — Powered by GPT-4 + Whisper 