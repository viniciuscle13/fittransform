"use client"

import { Play, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'
import { useState, useRef } from 'react'

interface PremiumVideoProps {
  title: string
  description: string
}

export default function PremiumVideo({ title, description }: PremiumVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const fullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="relative bg-black rounded-xl overflow-hidden">
        {/* Vídeo simulado - substitua por vídeo real */}
        <div className="aspect-video bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%239333ea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23grad)'/%3E%3Ctext x='400' y='200' font-family='Arial, sans-serif' font-size='32' font-weight='bold' text-anchor='middle' fill='white'%3EFitTransform%3C/text%3E%3Ctext x='400' y='240' font-family='Arial, sans-serif' font-size='18' text-anchor='middle' fill='white' opacity='0.8'%3EVídeo Demonstrativo%3C/text%3E%3Ctext x='400' y='280' font-family='Arial, sans-serif' font-size='14' text-anchor='middle' fill='white' opacity='0.6'%3EComo usar o app para maximizar resultados%3C/text%3E%3C/svg%3E"
          >
            {/* Substitua por seu vídeo real */}
            <source src="/demo-video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>

          {/* Overlay de play quando pausado */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-full p-6"
              >
                <Play className="w-12 h-12 text-white ml-1" />
              </button>
            </div>
          )}

          {/* Controles de vídeo */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Barra de progresso */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  <Play className={`w-6 h-6 ${isPlaying ? 'hidden' : 'block'}`} />
                  <div className={`w-6 h-6 ${isPlaying ? 'block' : 'hidden'}`}>
                    <div className="flex gap-1">
                      <div className="w-2 h-6 bg-white rounded"></div>
                      <div className="w-2 h-6 bg-white rounded"></div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={restart}
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={fullscreen}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do vídeo */}
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold text-purple-800 mb-2">📹 Conteúdo do Vídeo:</h4>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>• Como configurar seu perfil e objetivos</li>
          <li>• Navegação completa pelo app</li>
          <li>• Dicas para maximizar resultados</li>
          <li>• Como acompanhar seu progresso</li>
          <li>• Truques e funcionalidades avançadas</li>
        </ul>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}