import { useState } from 'react'
import type { ProductDetailProps } from '../lib/types'

const TYPE_LABELS: Record<string, { label: string; emoji: string }> = {
  plant: { label: 'Plante', emoji: '🌱' },
  book: { label: 'Livre', emoji: '📚' },
  tool: { label: 'Outil', emoji: '🔧' },
  educational: { label: 'Pédagogie', emoji: '🎓' },
}

export function ProductDetail({ product, relatedProducts, onAddToCart, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const typeInfo = TYPE_LABELS[product.type] || { label: product.type, emoji: '📦' }

  const handleAddToCart = () => {
    onAddToCart?.(quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, #3d5a3d 0%, #2d4a2d 40%, #1d3a1d 100%)' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-[#AFBD00]/10 blur-3xl" />
        <div className="absolute bottom-0 left-[20%] w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Back */}
          <button onClick={onBack} className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour à la boutique
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10 shadow-2xl">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-[#AFBD00] text-stone-900 font-bold text-sm shadow-lg">
                {typeInfo.emoji} {typeInfo.label}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/80">{product.category}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/80">{product.subcategory}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
                {product.name}
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8">{product.description}</p>

              {/* Specs */}
              {Object.keys(product.specs).length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{key}</p>
                      <p className="text-white font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Price & Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
                <div>
                  <p className="text-sm text-white/50 mb-1">Prix</p>
                  <p className="text-5xl font-bold text-white">{product.price}<span className="text-2xl text-white/60">€</span></p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl bg-white/10 border border-white/10 overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">−</button>
                    <span className="px-4 py-3 text-white font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-lg font-bold">+</button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                      added ? 'bg-green-500 text-white' : 'bg-[#AFBD00] text-stone-900 hover:bg-[#9eac00] shadow-[#AFBD00]/20'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {product.stock === 0 ? 'Rupture de stock' : added ? '✓ Ajouté !' : 'Ajouter au panier'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-white/40">
                {product.stock > 0
                  ? <><span className="text-[#AFBD00]">✓</span> {product.stock} en stock — Retrait en pépinière</>
                  : 'Actuellement indisponible'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z" className="fill-[#f5f3ef] dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
              Produits similaires
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(p => (
                <a key={p.id} href={`/shop/${p.id}/`} className="group bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{p.category}</p>
                    <h3 className="font-bold text-stone-900 dark:text-white group-hover:text-[#AFBD00] transition-colors line-clamp-2">{p.name}</h3>
                    <p className="text-lg font-bold text-stone-900 dark:text-white mt-2">{p.price}€</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}
