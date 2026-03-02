import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'

export default defineConfig({
  site: 'https://semisto.org',
  output: 'static', // Static by default, opt-in SSR with prerender=false
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'es', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
})
