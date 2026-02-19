import { useState, useEffect } from 'react'
import type { Product } from '../lib/types'

// =============================================================================
// CART — Slide-in drawer with animations, breakdown, suggestions, empty state
// =============================================================================

interface CartItem {
  product: Product
  quantity: number
}

interface Props {
  items: CartItem[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onCheckout: () => void
  suggestedProducts?: Product[]
  onAddSuggested?: (productId: string) => void
}

const PRODUCT_EMOJIS: Record<string, string> = {
  plant: '🌱', book: '📚', tool: '🔧', educational: '🎓'
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemove, onCheckout, suggestedProducts = [], onAddSuggested }: Props) {
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const freeShippingThreshold = 80
  const progressToFreeShipping = Math.min(subtotal / freeShippingThreshold, 1)

  useEffect(() => {
    if (justAdded) {
      const t = setTimeout(() => setJustAdded(null), 600)
      return () => clearTimeout(t)
    }
  }, [justAdded])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => { setIsClosing(false); onClose() }, 250)
  }

  const handleRemove = (productId: string) => {
    setRemovingId(productId)
    setTimeout(() => { onRemove(productId); setRemovingId(null) }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-stone-900 z-[61] shadow-2xl flex flex-col ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#AFBD00]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#AFBD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>Panier</h2>
              <p className="text-sm text-stone-500">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={handleClose} className="w-10 h-10 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors group">
            <svg className="w-5 h-5 text-stone-400 group-hover:text-stone-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && subtotal < freeShippingThreshold && (
          <div className="px-6 py-3 bg-[#AFBD00]/5 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-stone-500">🚚 Retrait gratuit en pépinière</span>
              <span className="font-semibold text-[#2D5016] dark:text-[#AFBD00]">
                Plus que {(freeShippingThreshold - subtotal).toFixed(0)}€ pour la livraison offerte
              </span>
            </div>
            <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#AFBD00] to-[#2D5016] rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-100 to-stone-50 dark:from-stone-800 dark:to-stone-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-14 h-14 text-stone-200 dark:text-stone-700" viewBox="0 0 100 100" fill="none">
                    <path d="M50 15c-10 15-30 25-30 45 0 12 13 18 30 18s30-6 30-18c0-20-20-30-30-45z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M50 60v-25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M50 35c5-3 12-2 15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M50 42c-4-4-11-4-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Votre panier est vide
              </h3>
              <p className="text-sm text-stone-400 mb-6 max-w-xs mx-auto">
                Explorez notre pépinière et trouvez les plantes parfaites pour votre jardin-forêt.
              </p>
              <button onClick={handleClose} className="px-6 py-2.5 rounded-xl bg-[#5B5781] text-white font-semibold text-sm hover:bg-[#4a4670] transition-all hover:scale-105">
                Explorer la boutique
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.product.id}
                  className={`flex gap-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 transition-all duration-300 ${
                    removingId === item.product.id ? 'opacity-0 -translate-x-8 scale-95' : ''
                  } ${justAdded === item.product.id ? 'ring-2 ring-[#AFBD00] scale-[1.02]' : ''}`}
                >
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-stone-200 to-stone-100 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.product.image ? (
                      <img src={item.product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-2xl">{PRODUCT_EMOJIS[item.product.type] || '🌿'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 dark:text-white text-sm line-clamp-2">{item.product.name}</h4>
                    <p className="text-[#5B5781] dark:text-[#AFBD00] font-bold mt-1">{(item.product.price * item.quantity).toFixed(2)}€</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => item.quantity > 1 ? onUpdateQuantity(item.product.id, item.quantity - 1) : handleRemove(item.product.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-stone-600 active:scale-90"
                        >−</button>
                        <span className="w-8 text-center text-sm font-medium text-stone-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => { onUpdateQuantity(item.product.id, item.quantity + 1); setJustAdded(item.product.id) }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-stone-600 active:scale-90"
                        >+</button>
                      </div>
                      <button onClick={() => handleRemove(item.product.id)} className="text-stone-400 hover:text-red-500 transition-colors active:scale-90">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggested products */}
          {items.length > 0 && suggestedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Complétez votre panier</h4>
              <div className="space-y-2">
                {suggestedProducts.slice(0, 3).map(product => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-lg flex-shrink-0">
                      {PRODUCT_EMOJIS[product.type] || '🌿'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate">{product.name}</p>
                      <p className="text-xs text-stone-500">{product.price}€</p>
                    </div>
                    <button
                      onClick={() => onAddSuggested?.(product.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#AFBD00]/10 text-[#2D5016] dark:text-[#AFBD00] text-xs font-semibold hover:bg-[#AFBD00]/20 transition-colors"
                    >
                      + Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with breakdown */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 dark:border-stone-800 px-6 py-5 space-y-3 bg-white dark:bg-stone-900">
            {/* Breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Sous-total ({itemCount} article{itemCount > 1 ? 's' : ''})</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Retrait en pépinière</span>
                <span className="text-[#2D5016] dark:text-[#AFBD00] font-medium">Gratuit</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="text-stone-700 dark:text-stone-300 font-semibold">Total</span>
              <span className="text-2xl font-bold text-stone-900 dark:text-white">{subtotal.toFixed(2)}€</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#AFBD00]/25 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Commander · {subtotal.toFixed(2)}€
            </button>

            <p className="text-xs text-center text-stone-400">
              🔒 Paiement sécurisé · Retrait en pépinière locale
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slide-out-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-out-right { animation: slide-out-right 0.25s ease-in forwards; }
      `}</style>
    </>
  )
}
