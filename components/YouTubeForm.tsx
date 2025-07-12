'use client'

import { useState } from 'react'

interface YouTubeFormProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

export default function YouTubeForm({ onSubmit, isLoading }: YouTubeFormProps) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. https://www.youtube.com/watch?v=abc123"
            className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-lg transition-all duration-200"
            disabled={isLoading}
          />
          {url && !isValidYouTubeUrl(url) && (
            <p className="mt-2 text-sm text-red-400">
              Please enter a valid YouTube URL
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !url.trim() || !isValidYouTubeUrl(url)}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none text-lg"
        >
          {isLoading ? 'Processing video…' : 'Generate Notes'}
        </button>
      </form>
    </div>
  )
} 