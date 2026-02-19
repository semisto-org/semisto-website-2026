import { useState, useEffect, useRef } from 'react'
import type { Lab } from '../lib/types'

// =============================================================================
// WEBSITE HEADER — Fluid nav, mega-menu for Labs, transparent→solid scroll,
// elegant language selector, animated cart indicator
// =============================================================================

interface Props {
  labs: Lab[]
  currentLabId: string | null
  currentLanguage: string
  availableLanguages: string[]
  cartItemCount?: number
  onCartOpen?: () => void
}

const LANG_LABELS: Record<string, { label: string; flag: string }> = {
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English', flag: '🇬🇧' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  es: { label: 'Español', flag: '🇪🇸' },
  ca: { label: 'Català', flag: '🏴' },
}

const COUNTRY_FLAGS: Record<string, string> = {
  BE: '🇧🇪', FR: '🇫🇷', ES: '🇪🇸', DE: '🇩🇪'
}

export default function WebsiteHeader({ labs, currentLabId, currentLanguage, availableLanguages, cartItemCount = 0, onCartOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [labMega, setLabMega] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)
  const prevCartCount = useRef(cartItemCount)
  const labMegaRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Animate cart badge on count change
  useEffect(() => {
    if (cartItemCount > prevCartCount.current) {
      setCartBounce(true)
      const t = setTimeout(() => setCartBounce(false), 500)
      prevCartCount.current = cartItemCount
      return () => clearTimeout(t)
    }
    prevCartCount.current = cartItemCount
  }, [cartItemCount])

  // Click outside to close dropdowns
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (labMegaRef.current && !labMegaRef.current.contains(e.target as Node)) setLabMega(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangDropdown(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentLab = labs.find(l => l.id === currentLabId)

  const defaultLab = labs[0]?.slug || 'wallonie'
  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Labs', href: '/', hasMega: true },
    { label: 'Academy', href: `/${defaultLab}/academy/` },
    { label: 'Projets', href: `/${defaultLab}/projects/` },
    { label: 'Boutique', href: '/shop/' },
    { label: 'Blog', href: `/${defaultLab}/articles/` },
    { label: 'Roots', href: `/${defaultLab}/roots/` },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-stone-200/50 dark:border-stone-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                S
              </div>
              <div className="hidden sm:block">
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-stone-900 dark:text-white' : 'text-white'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Semisto
                </span>
                {currentLab && (
                  <span className={`block text-xs -mt-0.5 transition-colors duration-300 ${isScrolled ? 'text-stone-400' : 'text-white/60'}`}>
                    {currentLab.name}
                  </span>
                )}
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(link => (
                <div key={link.href} className="relative" ref={link.hasMega ? labMegaRef : undefined}>
                  {link.hasMega ? (
                    <button
                      onClick={() => { setLabMega(!labMega); setLangDropdown(false) }}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                        isScrolled
                          ? 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-3 h-3 transition-transform duration-200 ${labMega ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isScrolled
                          ? 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </a>
                  )}

                  {/* Labs Mega Menu */}
                  {link.hasMega && labMega && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50 animate-dropdown">
                      <div className="p-4 border-b border-stone-100 dark:border-stone-700">
                        <a href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center text-white text-lg">🌍</div>
                          <div>
                            <span className="font-bold text-stone-900 dark:text-white group-hover:text-[#5B5781] transition-colors">Semisto Global</span>
                            <p className="text-xs text-stone-400">Vue d'ensemble du réseau</p>
                          </div>
                        </a>
                      </div>
                      <div className="p-4 grid grid-cols-2 gap-2">
                        {labs.map(lab => (
                          <a
                            key={lab.id}
                            href={`/${lab.slug}/`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-all group"
                            onClick={() => setLabMega(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-600 flex items-center justify-center text-sm">
                              {COUNTRY_FLAGS[lab.country] || '🌿'}
                            </div>
                            <div className="min-w-0">
                              <span className="block text-sm font-semibold text-stone-700 dark:text-stone-300 group-hover:text-[#5B5781] transition-colors truncate">{lab.name}</span>
                              <span className="block text-xs text-stone-400 truncate">{lab.region}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="p-3 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700">
                        <div className="flex flex-wrap gap-1.5">
                          {['🎨 Design', '🎓 Academy', '🌿 Pépinière', '🤝 Roots'].map(pole => (
                            <span key={pole} className="px-2 py-1 rounded-full text-xs font-medium bg-white dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700">{pole}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative hidden md:block" ref={langRef}>
                <button
                  onClick={() => { setLangDropdown(!langDropdown); setLabMega(false) }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                      : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                  }`}
                >
                  <span>{LANG_LABELS[currentLanguage]?.flag || '🌐'}</span>
                  <span className="uppercase">{currentLanguage}</span>
                  <svg className={`w-3 h-3 transition-transform duration-200 ${langDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {langDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50 animate-dropdown">
                    {availableLanguages.map(lang => (
                      <a key={lang} href={`/${lang === 'fr' ? '' : lang + '/'}`}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors ${
                          lang === currentLanguage ? 'font-bold text-[#5B5781] bg-[#5B5781]/5' : 'text-stone-700 dark:text-stone-300'
                        }`}>
                        <span>{LANG_LABELS[lang]?.flag || '🌐'}</span>
                        {LANG_LABELS[lang]?.label || lang}
                        {lang === currentLanguage && <svg className="w-4 h-4 ml-auto text-[#5B5781]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart button */}
              <button
                onClick={onCartOpen}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isScrolled
                    ? 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {cartItemCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#AFBD00] text-stone-900 text-[10px] font-black flex items-center justify-center shadow-sm transition-transform ${cartBounce ? 'scale-125' : 'scale-100'}`}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isScrolled ? 'hover:bg-stone-100 dark:hover:bg-stone-800' : 'hover:bg-white/10'
                }`}
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`block h-0.5 rounded-full transition-all duration-300 ${isScrolled ? 'bg-stone-900 dark:bg-white' : 'bg-white'} ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-xl">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="block px-4 py-3 rounded-xl text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <p className="px-4 text-xs text-stone-400 uppercase tracking-wider mb-2">Labs</p>
                {labs.map(lab => (
                  <a key={lab.id} href={`/${lab.slug}/`} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                    <span>{COUNTRY_FLAGS[lab.country] || '🌿'}</span>
                    {lab.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <p className="px-4 text-xs text-stone-400 uppercase tracking-wider mb-2">Langue</p>
                <div className="flex gap-2 px-4">
                  {availableLanguages.map(lang => (
                    <a key={lang} href={`/${lang === 'fr' ? '' : lang + '/'}`}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${lang === currentLanguage ? 'bg-[#5B5781] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600'}`}>
                      {LANG_LABELS[lang]?.flag} {lang.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

    </>
  )
}
