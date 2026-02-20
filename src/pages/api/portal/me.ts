import type { APIRoute } from 'astro'
import { getAuthUser } from '../../../lib/auth'
import { getPartner } from '../../../lib/portal-api'

export const prerender = false

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('portal-token')?.value
  const user = getAuthUser(token)

  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const partner = getPartner()
  return new Response(JSON.stringify({ user, partner }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
