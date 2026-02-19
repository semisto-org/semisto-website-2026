import { useState, useEffect, useRef } from 'react'
import type { Article, ArticleCategory } from '../lib/types'
import { ArticleCard } from './ArticleCard'

// =============================================================================
// ARTICLE LIST — Magazine-style editorial blog page
// Hero, featured articles, category filters, paginated grid
// =============================================================================

interface Props {
  articles: Article[]
  labId?: string
  onArticleView?: (articleId: string) => void
  onFilter?: (filters: { category?: ArticleCategory }) => void
}

const CATEGORIES: { value: ArticleCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'Tous les articles', icon: '📰' },
  { value: 'technique', label: 'Technique', icon: '🔧' },
  { value: 'retour-experience', label: 'Retour d\'expérience', icon: '🌱' },
  { value: 'témoignage', label: 'Témoignage', icon: '💬' },
  { value: 'actualité', label: 'Actualité', icon: '📢' },
]

const ITEMS_PER_PAGE = 9

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export default function ArticleList({ articles, labId, onArticleView, onFilter }: Props) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const heroReveal = useScrollReveal()
  const gridReveal = useScrollReveal()

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featured = filtered.filter(a => a.isFeatured).slice(0, 2)
  const regular = filtered.filter(a => !featured.includes(a))
  const totalPages = Math.ceil(regular.length / ITEMS_PER_PAGE)
  const paginated = regular.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleCategoryChange = (cat: ArticleCategory | 'all') => {
    setActiveCategory(cat)
    setCurrentPage(1)
    onFilter?.(cat === 'all' ? {} : { category: cat })
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D5016] via-[#3a6b1e] to-stone-50 dark:to-stone-950" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10c-10 15-30 25-30 45 0 12 13 18 30 18s30-6 30-18c0-20-20-30-30-45z' fill='white' fill-opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />

        <div
          ref={heroReveal.ref}
          className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-[#AFBD00]/20 text-[#AFBD00] backdrop-blur-sm border border-[#AFBD00]/30">
            ✍️ Blog & Édito
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95]" style={{ fontFamily: 'var(--font-heading)' }}>
            Histoires de<br />
            <span className="relative inline-block">
              jardins-forêts
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#AFBD00]" viewBox="0 0 300 12" preserveAspectRatio="none">
                <path d="M0 8 Q75 0 150 8 Q225 16 300 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Techniques, témoignages et retours d'expérience de notre réseau de pionniers.
            Chaque article est une graine de savoir.
          </p>
        </div>

        {/* Organic wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80Z" className="fill-stone-50 dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* ===== CATEGORY FILTERS ===== */}
      <section className="px-6 -mt-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  activeCategory === cat.value
                    ? 'bg-[#5B5781] text-white shadow-lg shadow-[#5B5781]/25'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 shadow-sm'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ARTICLES ===== */}
      {featured.length > 0 && (
        <section className="px-6 pt-12 pb-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {featured.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="featured"
                onView={() => onArticleView?.(article.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ===== ARTICLES GRID ===== */}
      <section className="px-6 py-12">
        <div
          ref={gridReveal.ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${gridReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-stone-700 dark:text-stone-300 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Aucun article dans cette catégorie
              </h3>
              <p className="text-stone-500">De nouveaux contenus germent régulièrement. Revenez bientôt !</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((article, i) => (
                  <div
                    key={article.id}
                    className="transition-all duration-500"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <ArticleCard
                      article={article}
                      variant="default"
                      onView={() => onArticleView?.(article.id)}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-30 transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        page === currentPage
                          ? 'bg-[#5B5781] text-white shadow-lg'
                          : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 shadow-sm'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-30 transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}

              {/* Article count */}
              <p className="text-center text-sm text-stone-400 mt-4">
                {filtered.length} article{filtered.length > 1 ? 's' : ''} au total
              </p>
            </>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#2D5016] to-[#3a6b1e] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-8 12-25 20-25 35 0 10 11 15 25 15s25-5 25-15c0-15-17-23-25-35z' fill='white' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Ne manquez aucun article
            </h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Recevez nos meilleurs contenus directement dans votre boîte mail, deux fois par mois.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#AFBD00] transition-colors backdrop-blur-sm"
              />
              <button className="px-6 py-3 rounded-xl bg-[#AFBD00] text-stone-900 font-bold hover:bg-[#c4d300] transition-all hover:scale-105 whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
