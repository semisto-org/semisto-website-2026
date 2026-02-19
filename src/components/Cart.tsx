import { useState } from 'react'
import type { Product } from '../lib/types'

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
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemove, onCheckout }: Props) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-stone-900 z-[61] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>Panier</h2>
            <p className="text-sm text-stone-500">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <p className="text-stone-500 dark:text-stone-400 font-medium">Votre panier est vide</p>
              <p className="text-sm text-stone-400 mt-1">Ajoutez des plantes et outils pour commencer.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                  <div className="w-20 h-20 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <span className="text-2xl">
                      {item.product.type === 'plant' ? '🌱' : item.product.type === 'book' ? '📚' : item.product.type === 'tool' ? '🔧' : '🎓'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 dark:text-white text-sm line-clamp-2">{item.product.name}</h4>
                    <p className="text-[#5B5781] font-bold mt-1">{item.product.price}€</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg">
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors rounded-l-lg text-stone-600">−</button>
                        <span className="w-8 text-center text-sm font-medium text-stone-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors rounded-r-lg text-stone-600">+</button>
                      </div>
                      <button onClick={() => onRemove(item.product.id)} className="text-red-500 hover:text-red-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 dark:border-stone-800 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-600 dark:text-stone-400 font-medium">Total</span>
              <span className="text-2xl font-bold text-stone-900 dark:text-white">{total.toFixed(2)}€</span>
            </div>
            <p className="text-xs text-stone-400">Retrait en pépinière locale. Frais de livraison calculés à la commande.</p>
            <button onClick={onCheckout} className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all hover:scale-[1.01] active:scale-[0.99]">
              Commander · {total.toFixed(2)}€
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
      `}</style>
    </>
  )
}
