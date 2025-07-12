'use client'

import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  isVisible: boolean
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { title: 'Validating YouTube URL', description: 'Checking if the video is accessible...', duration: 2000 },
    { title: 'Downloading Audio', description: 'Extracting audio from the video...', duration: 5000 },
    { title: 'Transcribing Content', description: 'Converting speech to text with Whisper AI...', duration: 8000 },
    { title: 'Generating Study Notes', description: 'Creating practical notes with GPT-4...', duration: 4000 }
  ]

  useEffect(() => {
    if (isVisible) {
      setFadeIn(true)
      setCurrentStep(0)
      
      // Simulate progress through steps with shorter durations
      const totalDuration = 15000 // 15 seconds total
      const stepDuration = totalDuration / steps.length
      
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index + 1)
          console.log(`🔄 ${step.title}: ${step.description}`)
          
          // If this is the last step, add a completion delay
          if (index === steps.length - 1) {
            setTimeout(() => {
              console.log('✅ All steps completed - waiting for API response...')
              setIsComplete(true)
            }, 1000)
          }
        }, (index + 1) * stepDuration)
      })
    } else {
      // Add a small delay before hiding to show completion
      setTimeout(() => {
        setFadeIn(false)
        setTimeout(() => {
          setCurrentStep(0)
          setIsComplete(false)
        }, 500)
      }, 500)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-[#0D0F1A]/90 backdrop-blur-sm z-50 transition-opacity duration-500 ${
      fadeIn ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-900/90 border border-blue-500/30 rounded-2xl p-8 max-w-md w-full mx-4 backdrop-blur-sm">
          {/* Logo/Icon */}
          <div className="text-center mb-6">
            <div className={`inline-block ${isComplete ? 'animate-bounce' : 'animate-pulse'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                isComplete 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 scale-110' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}>
                {isComplete ? (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 transition-colors duration-500">
              {isComplete ? 'Notes Ready!' : 'Processing Video'}
            </h2>
            <p className="text-gray-400 transition-colors duration-500">
              {isComplete ? 'Preparing your study notes...' : 'This may take a few minutes...'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index < currentStep ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-2'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Step Indicator */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-emerald-500 text-white' 
                      : index === currentStep 
                        ? 'bg-blue-500 text-white animate-pulse' 
                        : 'bg-gray-600 text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      index <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      index <= currentStep ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Loading Animation for Current Step */}
                  {index === currentStep && (
                    <div className="flex-shrink-0">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${Math.min((currentStep / steps.length) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {currentStep >= steps.length ? 'Complete! Preparing results...' : `${Math.round((currentStep / steps.length) * 100)}% Complete`}
            </p>
          </div>

          {/* Tips */}
          <div className="mt-6 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-300">
              💡 Tip: Longer videos take more time to process. You can safely close this tab and return later.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 