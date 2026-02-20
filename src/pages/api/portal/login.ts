import type { APIRoute } from 'astro'
import { validateCredentials, MOCK_TOKEN } from '../../../lib/auth'

export const prerender = false

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (validateCredentials(email, password)) {
    cookies.set('portal-token', MOCK_TOKEN, {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return redirect('/portal/', 302)
  }

  return redirect('/portal/login?error=invalid', 302)
}
