import { MercadoPagoConfig, Preference } from 'mercadopago'

// Configuração das credenciais do Mercado Pago
export const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN || 'APP_USR-a900757f-4788-4228-b011-2e761226f127'
export const MERCADO_PAGO_PUBLIC_KEY = process.env.MERCADO_PAGO_PUBLIC_KEY || 'APP_USR-1475675308251633-081303-f90e58e0fa85cc44f2ec74d77bc79afc-277446807'

// Inicializar cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MERCADO_PAGO_ACCESS_TOKEN,
})

const preference = new Preference(client)

// Criar preferência de pagamento para Premium
export const createPremiumPayment = async (userEmail: string, userId: string) => {
  try {
    const body = {
      items: [
        {
          title: 'FitTransform Premium - Assinatura Mensal',
          description: 'Acesso completo a treinos, dietas e acompanhamento personalizado',
          quantity: 1,
          unit_price: 19.90,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: userEmail,
      },
      external_reference: userId,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/?payment=success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/?payment=failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/?payment=pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
    }

    const response = await preference.create({ body })
    return {
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    }
  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
    return {
      success: false,
      error: 'Erro ao processar pagamento',
    }
  }
}

// Função para verificar se o pagamento foi processado
export const checkPaymentStatus = async (paymentId: string) => {
  try {
    // Em produção, você consultaria a API do Mercado Pago
    // Por enquanto, retorna false para demonstração
    return false
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error)
    return false
  }
}

// Simular ativação premium para demonstração
export const activatePremiumDemo = async (userId: string) => {
  try {
    const { updatePremiumStatus } = await import('./auth')
    const expirationDate = new Date()
    expirationDate.setMonth(expirationDate.getMonth() + 1)
    
    await updatePremiumStatus(userId, true, expirationDate.toISOString())
    return true
  } catch (error) {
    console.error('Erro ao ativar premium:', error)
    return false
  }
}