import { useState, useEffect } from 'react'
import type { Lab } from '../lib/types'

interface Props {
  labs: Lab[]
  currentLabId: string | null
  currentLanguage: string
  availableLanguages: string[]
}

const LANG_LABELS: Record<string, string> = {
  fr: 'Français', en: 'English', de: 'Deutsch', es: 'Español', ca: 'Català'
}

export default function WebsiteHeader({ labs, currentLabId, currentLanguage, availableLanguages }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [labDropdown, setLabDropdown] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const currentLab = labs.find(l => l.id === currentLabId)

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Labs', href: '/labs' },
    { label: 'Academy', href: '/academy' },
    { label: 'Projets', href: '/projects' },
    { label: 'Boutique', href: '/shop' },
    { label: 'Blog', href: '/blog' },
    { label: 'Roots', href: '/roots' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm border-b border-stone-200/50 dark:border-stone-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="hidden sm:block">
              <span className={`text-lg font-bold tracking-tight transition-colors ${isScrolled ? 'text-stone-900 dark:text-white' : 'text-white'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                Semisto
              </span>
              {currentLab && (
                <span className={`block text-xs -mt-0.5 transition-colors ${isScrolled ? 'text-stone-500' : 'text-white/70'}`}>
                  {currentLab.name}
                </span>
              )}
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
                  isScrolled ? 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Lab Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setLabDropdown(!labDropdown); setLangDropdown(false) }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isScrolled
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    : 'bg-white/15 text-white backdrop-blur-sm'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#AFBD00]" />
                {currentLab?.region || 'Global'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {labDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
                  <a href="/" className="block px-4 py-3 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 border-b border-stone-100 dark:border-stone-700 font-medium text-stone-900 dark:text-white">
                    🌍 Semisto Global
                  </a>
                  {labs.map(lab => (
                    <a key={lab.id} href={`/lab/${lab.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300">
                      <span className="w-2 h-2 rounded-full bg-[#AFBD00]" />
                      {lab.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setLangDropdown(!langDropdown); setLabDropdown(false) }}
                className={`px-2.5 py-1.5 rounded-full text-sm font-medium uppercase transition-all ${
                  isScrolled
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    : 'bg-white/15 text-white backdrop-blur-sm'
                }`}
              >
                {currentLanguage}
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50">
                  {availableLanguages.map(lang => (
                    <a key={lang} href={`/${lang === 'fr' ? '' : lang + '/'}`} className={`block px-4 py-2.5 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 ${lang === currentLanguage ? 'font-bold text-[#5B5781]' : 'text-stone-700 dark:text-stone-300'}`}>
                      {LANG_LABELS[lang] || lang}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isScrolled ? 'hover:bg-stone-100 dark:hover:bg-stone-800' : 'hover:bg-white/10'
              }`}
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="block px-4 py-3 rounded-xl text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <p className="px-4 text-xs text-stone-400 uppercase tracking-wider mb-2">Labs</p>
              {labs.map(lab => (
                <a key={lab.id} href={`/lab/${lab.slug}`} className="block px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white">
                  {lab.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
