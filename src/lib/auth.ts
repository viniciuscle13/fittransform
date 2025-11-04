import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  is_premium: boolean
  premium_expires_at?: string
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Buscar dados do usuário na tabela profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return {
        id: user.id,
        email: user.email || '',
        is_premium: false
      }
    }

    return {
      id: user.id,
      email: user.email || '',
      is_premium: profile.is_premium || false,
      premium_expires_at: profile.premium_expires_at
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export const checkPremiumStatus = (user: User | null): boolean => {
  if (!user || !user.is_premium) {
    return false
  }

  // Se tem data de expiração, verificar se ainda é válida
  if (user.premium_expires_at) {
    const expirationDate = new Date(user.premium_expires_at)
    const now = new Date()
    return expirationDate > now
  }

  // Se não tem data de expiração, considerar premium permanente
  return true
}