import { useState, useEffect, useRef } from 'react'
import type { Resource, ResourceCategory, ResourceFormat } from '../lib/types'

// =============================================================================
// RESOURCES PAGE — Pedagogical hero, category+language filters, format previews,
// download buttons with counters
// =============================================================================

interface Props {
  resources: Resource[]
  onDownload?: (resourceId: string) => void
  onFilter?: (filters: { category?: ResourceCategory; language?: string }) => void
}

const CATEGORIES: { value: ResourceCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'Toutes', icon: '📚' },
  { value: 'bases', label: 'Les bases', icon: '🌱' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'technique', label: 'Technique', icon: '🔧' },
  { value: 'pratique', label: 'Pratique', icon: '📋' },
]

const FORMAT_CONFIG: Record<ResourceFormat, { icon: string; color: string; bg: string; label: string }> = {
  pdf: { icon: '📄', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30', label: 'PDF' },
  video: { icon: '🎥', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', label: 'Vidéo' },
  infographie: { icon: '📊', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', label: 'Infographie' },
}

const LANGUAGES: Record<string, string> = {
  fr: '🇫🇷 Français', en: '🇬🇧 English', de: '🇩🇪 Deutsch', es: '🇪🇸 Español', ca: '🏴 Català'
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

export default function ResourcesPage({ resources, onDownload, onFilter }: Props) {
  const [category, setCategory] = useState<ResourceCategory | 'all'>('all')
  const [language, setLanguage] = useState<string>('all')
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({})
  const heroReveal = useReveal()
  const gridReveal = useReveal()

  const allLanguages = [...new Set(resources.flatMap(r => r.languages))]

  const filtered = resources.filter(r => {
    if (category !== 'all' && r.category !== category) return false
    if (language !== 'all' && !r.languages.includes(language)) return false
    return true
  })

  const handleCategoryChange = (cat: ResourceCategory | 'all') => {
    setCategory(cat)
    onFilter?.(cat === 'all' ? { language: language === 'all' ? undefined : language } : { category: cat, language: language === 'all' ? undefined : language })
  }

  const handleDownload = (resourceId: string) => {
    setDownloadCounts(prev => ({ ...prev, [resourceId]: (prev[resourceId] || 0) + 1 }))
    onDownload?.(resourceId)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D5016] via-[#3a6b1e] to-stone-50 dark:to-stone-950" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10c-10 15-30 25-30 45 0 12 13 18 30 18s30-6 30-18c0-20-20-30-30-45z' fill='white' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
        <div ref={heroReveal.ref} className={`relative max-w-4xl mx-auto text-center transition-all duration-1000 ${heroReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-[#AFBD00]/20 text-[#AFBD00] backdrop-blur-sm border border-[#AFBD00]/30">
            📚 Ressources pédagogiques
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95]" style={{ fontFamily: 'var(--font-heading)' }}>
            Guides &<br />
            <span className="relative inline-block">
              ressources
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#AFBD00]" viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M0 8 Q75 0 150 8 Q225 16 300 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Fiches pratiques, guides vidéo et infographies pour créer et entretenir votre jardin-forêt. Tout est gratuit et libre d'accès.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#AFBD00]">{resources.length}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Ressources</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#AFBD00]">{allLanguages.length}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Langues</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[#AFBD00]">100%</div>
              <div className="text-xs text-white/50 uppercase tracking-wider">Gratuit</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80Z" className="fill-stone-50 dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="px-6 -mt-4 relative z-10 mb-10">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  category === cat.value
                    ? 'bg-[#5B5781] text-white shadow-lg shadow-[#5B5781]/25'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 shadow-sm'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Language filter */}
          {allLanguages.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setLanguage('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  language === 'all' ? 'bg-[#AFBD00] text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'
                }`}
              >
                🌍 Toutes les langues
              </button>
              {allLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    language === lang ? 'bg-[#AFBD00] text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {LANGUAGES[lang] || lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== RESOURCES GRID ===== */}
      <section className="px-6 pb-20">
        <div ref={gridReveal.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${gridReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Aucune ressource trouvée
              </h3>
              <p className="text-stone-500">Essayez un autre filtre ou revenez bientôt pour de nouveaux contenus.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource, i) => {
                const fmt = FORMAT_CONFIG[resource.format]
                return (
                  <article
                    key={resource.id}
                    className="group flex flex-col bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-stone-100 dark:border-stone-800 transition-all duration-300"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {/* Format preview */}
                    <div className={`relative h-44 overflow-hidden ${fmt.bg} flex items-center justify-center`}>
                      {resource.image ? (
                        <img src={resource.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-center">
                          <div className="text-5xl mb-2">{fmt.icon}</div>
                          <span className={`text-sm font-bold ${fmt.color}`}>{fmt.label}</span>
                        </div>
                      )}
                      {/* Format badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${fmt.bg} ${fmt.color} backdrop-blur-sm border ${resource.format === 'pdf' ? 'border-red-200' : resource.format === 'video' ? 'border-blue-200' : 'border-emerald-200'}`}>
                        {fmt.icon} {fmt.label}
                      </div>
                      {/* File size */}
                      {resource.fileSize && (
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-stone-900/90 text-stone-600 backdrop-blur-sm">
                          {resource.fileSize}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-5 flex flex-col">
                      {/* Category + languages */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          {CATEGORIES.find(c => c.value === resource.category)?.icon} {resource.category}
                        </span>
                        <div className="flex gap-1 ml-auto">
                          {resource.languages.map(lang => (
                            <span key={lang} className="text-xs" title={LANGUAGES[lang] || lang}>
                              {lang === 'fr' ? '🇫🇷' : lang === 'en' ? '🇬🇧' : lang === 'de' ? '🇩🇪' : lang === 'es' ? '🇪🇸' : '🏴'}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2 group-hover:text-[#5B5781] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {resource.title}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">{resource.description}</p>

                      {/* Download button */}
                      <button
                        onClick={() => handleDownload(resource.id)}
                        className="mt-auto w-full py-3 rounded-xl bg-[#5B5781]/5 hover:bg-[#5B5781] text-[#5B5781] hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Télécharger
                        {downloadCounts[resource.id] && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#AFBD00] text-stone-900 text-xs font-bold">
                            {downloadCounts[resource.id]}
                          </span>
                        )}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#5B5781] to-[#4a4670] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Vous avez créé une ressource ?
            </h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Partagez votre savoir avec la communauté. Nous publions les meilleurs contenus de notre réseau.
            </p>
            <a href="/contact/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#5B5781] font-bold hover:bg-[#AFBD00] hover:text-stone-900 transition-all hover:scale-105">
              Proposer une ressource
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
