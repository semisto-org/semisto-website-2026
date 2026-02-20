import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('portal-token', { path: '/' })
  return redirect('/portal/login', 302)
}

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('portal-token', { path: '/' })
  return redirect('/portal/login', 302)
}
