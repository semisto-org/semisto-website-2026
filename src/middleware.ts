import { defineMiddleware } from 'astro:middleware'
import { validateToken } from './lib/auth'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  // Only protect /portal/* routes (except /portal/login and /api/portal/*)
  if (pathname.startsWith('/portal') && !pathname.startsWith('/portal/login') && !pathname.startsWith('/api/portal')) {
    const token = context.cookies.get('portal-token')?.value
    if (!validateToken(token)) {
      return context.redirect('/portal/login')
    }
  }

  return next()
})
