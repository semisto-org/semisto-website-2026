// Mock auth for partner portal

export const MOCK_CREDENTIALS = {
  email: 'demo@partner.com',
  password: 'partner2026',
}

export const MOCK_TOKEN = 'mock-partner-token-2026'

export interface AuthUser {
  email: string
  name: string
  partnerId: string
}

export const MOCK_USER: AuthUser = {
  email: 'demo@partner.com',
  name: 'Sophie Vandenberghe',
  partnerId: 'partner-001',
}

export function validateCredentials(email: string, password: string): boolean {
  return email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password
}

export function validateToken(token: string | undefined): boolean {
  return token === MOCK_TOKEN
}

export function getAuthUser(token: string | undefined): AuthUser | null {
  if (validateToken(token)) return MOCK_USER
  return null
}
