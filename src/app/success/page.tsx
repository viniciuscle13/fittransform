"use client"

import { useEffect, useState } from 'react'
import { CheckCircle, Home, Play } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Parabéns! Sua assinatura premium foi ativada com sucesso. Agora você tem acesso completo a todos os recursos do FitTransform.
        </p>
        
        <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">🎉 Agora você pode:</h3>
          <ul className="text-green-700 text-sm space-y-1 text-left">
            <li>• Acessar todos os treinos personalizados</li>
            <li>• Seguir planos de dieta completos</li>
            <li>• Participar do desafio de 21 dias</li>
            <li>• Assistir vídeos demonstrativos exclusivos</li>
            <li>• Receber suporte prioritário 24/7</li>
          </ul>
        </div>
        
        <div className="text-sm text-gray-500 mb-6">
          Redirecionando automaticamente em {countdown} segundos...
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/"
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ir para o App
          </Link>
          <Link 
            href="/challenge"
            className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Começar Desafio
          </Link>
        </div>
        
        <div className="mt-6 text-xs text-gray-400">
          Você receberá um email de confirmação em breve
        </div>
      </div>
    </div>
  )
}