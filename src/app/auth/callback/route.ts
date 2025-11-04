import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // Se Supabase não está configurado, redirecionar para home
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
      }
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }
  }

  // Redirecionar para a página principal
  return NextResponse.redirect(new URL('/', request.url))
}