'use client'

import { useState, useEffect } from 'react'
import YouTubeForm from '@/components/YouTubeForm'
import ResultsDisplay from '@/components/ResultsDisplay'
import LoadingScreen from '@/components/LoadingScreen'

export interface TranscriptionResult {
  transcript: string
  summary: string
  videoTitle?: string
  videoDuration?: string
}

export default function Home() {
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Debug state changes
  useEffect(() => {
    console.log('🔍 State changed:', { isLoading, showResults, hasResult: !!result })
  }, [isLoading, showResults, result])

  const handleSubmit = async (youtubeUrl: string) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setShowResults(false)

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process video')
      }

      const data = await response.json()
      console.log('✅ API Response received:', data)
      setResult(data)
      
      // Immediately stop loading and show results
      console.log('🔄 Setting loading to false and showing results')
      setIsLoading(false)
      setShowResults(true)
      
      // Scroll to results after a brief delay
      setTimeout(() => {
        console.log('📜 Scrolling to results')
        const resultsElement = document.querySelector('[data-results]')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          console.log('❌ Results element not found')
        }
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0F1A] text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#0D0F1A] via-[#0D0F1A]/95 to-[#0D0F1A] border-b border-blue-500/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Notably
              </h1>
            </div>
            
            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn faster with AI-generated video notes.
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Paste any YouTube link. We'll transcribe the audio and extract practical study points — in minutes.
            </p>
            
            {/* Form */}
            <YouTubeForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          <LoadingScreen isVisible={isLoading} />
          
          {result && (
            <div 
              data-results
              className={`transition-all duration-700 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {/* Info Box */}
              <div className="mb-8 p-6 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Video Summary Ready</h3>
                <p className="text-gray-300">AI has processed this video. You can review, copy, or download your notes below.</p>
              </div>
              
              <ResultsDisplay result={result} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-blue-500/10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Made with ❤️ by Notably — Powered by GPT-4 + Whisper</p>
        </div>
      </footer>
    </main>
  )
} 