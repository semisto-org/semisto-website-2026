import { useState, useEffect, useRef } from 'react'
import type { PressItem, PressType } from '../lib/types'

// =============================================================================
// PRESS PAGE — Hero, media type filters, rich cards, logos, press kit CTA
// =============================================================================

interface Props {
  pressItems: PressItem[]
  onItemView?: (itemId: string) => void
}

const PRESS_TYPES: { value: PressType | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'Tout', icon: '📰' },
  { value: 'tv', label: 'Télévision', icon: '📺' },
  { value: 'article', label: 'Articles', icon: '📝' },
  { value: 'podcast', label: 'Podcasts', icon: '🎙️' },
  { value: 'radio', label: 'Radio', icon: '📻' },
]

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

const TYPE_COLORS: Record<PressType, { bg: string; text: string; border: string }> = {
  tv: { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
  article: { bg: 'bg-[#c8bfd2]/30', text: 'text-[#5B5781]', border: 'border-[#c8bfd2]' },
  podcast: { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
  radio: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
}

export default function PressPage({ pressItems, onItemView }: Props) {
  const [filter, setFilter] = useState<PressType | 'all'>('all')
  const heroReveal = useReveal()
  const gridReveal = useReveal()

  const filtered = filter === 'all' ? pressItems : pressItems.filter(i => i.type === filter)
  const featured = filtered.slice(0, 1)
  const rest = filtered.slice(1)

  // Unique media outlets for logo strip
  const outlets = [...new Set(pressItems.map(i => i.outlet))].slice(0, 8)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B5781] via-[#4a4670] to-stone-50 dark:to-stone-950" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='20' y='10' width='60' height='80' rx='4' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cline x1='30' y1='30' x2='70' y2='30' stroke='white' stroke-width='1'/%3E%3Cline x1='30' y1='40' x2='70' y2='40' stroke='white' stroke-width='1'/%3E%3Cline x1='30' y1='50' x2='55' y2='50' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
        <div ref={heroReveal.ref} className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${heroReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-white/10 text-white/90 backdrop-blur-sm border border-white/20">
            📰 Presse & Médias
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95]" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Semisto dans<br />
            <span className="text-[#AFBD00]">les médias</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Découvrez les reportages, articles et interviews consacrés au mouvement Semisto et à la révolution des jardins-forêts.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80Z" className="fill-stone-50 dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* ===== MEDIA LOGOS ===== */}
      {outlets.length > 0 && (
        <section className="px-6 -mt-6 relative z-10 mb-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs text-stone-400 uppercase tracking-widest mb-4">Ils parlent de nous</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {outlets.map(outlet => (
                <div key={outlet} className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 shadow-sm border border-stone-100 dark:border-stone-800">
                  <span className="text-sm font-bold text-stone-400 dark:text-stone-500">{outlet}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== PRESS KIT CTA ===== */}
      <section className="px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#5B5781] to-[#4a4670] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl flex-shrink-0">
                📁
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>Kit Presse</h2>
                <p className="text-white/70 max-w-xl">Logos, photos haute résolution, biographies et informations clés sur Semisto — tout ce dont vous avez besoin.</p>
              </div>
              <button className="px-8 py-3.5 rounded-xl bg-white text-[#5B5781] font-bold hover:bg-[#AFBD00] hover:text-stone-900 transition-all hover:scale-105 whitespace-nowrap shadow-lg">
                Télécharger le kit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="px-6 mb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {PRESS_TYPES.map(type => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                filter === type.value
                  ? 'bg-[#5B5781] text-white shadow-lg shadow-[#5B5781]/25'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 shadow-sm'
              }`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </section>

      {/* ===== FEATURED ITEM ===== */}
      {featured.length > 0 && (
        <section className="px-6 mb-8">
          <div className="max-w-5xl mx-auto">
            {featured.map(item => {
              const typeStyle = TYPE_COLORS[item.type]
              return (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => onItemView?.(item.id)}
                  className="group flex flex-col md:flex-row bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800">
                  {item.image && (
                    <div className="md:w-2/5 h-56 md:h-auto overflow-hidden bg-stone-100 dark:bg-stone-700 relative">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-stone-800/20" />
                    </div>
                  )}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeStyle.bg} ${typeStyle.text}`}>
                        {PRESS_TYPES.find(t => t.value === item.type)?.icon} {item.type.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-stone-500">{item.outlet}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-3 group-hover:text-[#5B5781] transition-colors" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-400">
                        {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-[#5B5781] group-hover:translate-x-1 transition-transform">
                        Voir
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== PRESS ITEMS GRID ===== */}
      <section className="px-6 pb-20">
        <div ref={gridReveal.ref} className={`max-w-5xl mx-auto transition-all duration-700 ${gridReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {rest.length === 0 && featured.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📰</div>
              <p className="text-stone-500">Aucune couverture presse dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((item, i) => {
                const typeStyle = TYPE_COLORS[item.type]
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onItemView?.(item.id)}
                    className="group flex flex-col bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 dark:border-stone-800"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {item.image && (
                      <div className="h-40 overflow-hidden bg-stone-100 dark:bg-stone-700 relative">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {/* Type overlay badge */}
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${typeStyle.bg} ${typeStyle.text} backdrop-blur-sm`}>
                          {PRESS_TYPES.find(t => t.value === item.type)?.icon} {item.type}
                        </div>
                      </div>
                    )}
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-[#5B5781]">{item.outlet}</span>
                        <span className="text-xs text-stone-400">
                          {new Date(item.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#5B5781] transition-colors mb-2 line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">{item.description}</p>
                      <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#5B5781] group-hover:translate-x-1 transition-transform">
                        Lire
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}

          {/* Contact Press */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-white dark:bg-stone-900 shadow-sm border border-stone-100 dark:border-stone-800">
              <div className="w-12 h-12 rounded-full bg-[#5B5781]/10 flex items-center justify-center">
                <span className="text-xl">🎤</span>
              </div>
              <div>
                <p className="font-semibold text-stone-700 dark:text-stone-300 mb-1">Vous êtes journaliste ?</p>
                <p className="text-sm text-stone-500 mb-4">Nous sommes disponibles pour des interviews et reportages.</p>
              </div>
              <a href="mailto:press@semisto.org" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5B5781] text-white font-semibold hover:bg-[#4a4670] transition-all hover:scale-105">
                📧 press@semisto.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
