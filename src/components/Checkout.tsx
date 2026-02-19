import { useState } from 'react'
import type { CheckoutProps } from '../lib/types'

type Step = 'cart' | 'info' | 'pickup' | 'confirm'

export function Checkout({ items, total, currency, pickupLocations, onSubmitOrder, onBack }: CheckoutProps) {
  const [step, setStep] = useState<Step>('cart')
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' })
  const [selectedPickup, setSelectedPickup] = useState('')
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const steps: { key: Step; label: string }[] = [
    { key: 'cart', label: 'Récapitulatif' },
    { key: 'info', label: 'Vos infos' },
    { key: 'pickup', label: 'Retrait' },
    { key: 'confirm', label: 'Confirmation' },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === step)

  const handleSubmit = () => {
    onSubmitOrder?.({
      pickupLocationId: selectedPickup,
      customerInfo,
    })
    setOrderSubmitted(true)
    setStep('confirm')
  }

  const canProceedInfo = customerInfo.name && customerInfo.email && customerInfo.phone
  const canProceedPickup = selectedPickup !== ''

  if (orderSubmitted && step === 'confirm') {
    return (
      <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-[#AFBD00]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-[#AFBD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Commande confirmée ! 🌱
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mb-8">
            Merci {customerInfo.name} ! Vous recevrez un email de confirmation à {customerInfo.email} avec les détails de retrait.
          </p>
          <a href="/shop/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#AFBD00] text-stone-900 font-bold hover:bg-[#9eac00] transition-all">
            Retour à la boutique
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <button onClick={onBack} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-700 mb-8 transition-colors group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Retour
        </button>

        <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
          Commande
        </h1>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i <= currentStepIndex ? 'bg-[#AFBD00] text-stone-900' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
              }`}>
                {i < currentStepIndex ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i <= currentStepIndex ? 'text-stone-900 dark:text-white' : 'text-stone-400'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < currentStepIndex ? 'bg-[#AFBD00]' : 'bg-stone-200 dark:bg-stone-800'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step: Cart recap */}
            {step === 'cart' && (
              <div className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800">
                    <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-stone-900 dark:text-white">{product.name}</h3>
                      <p className="text-sm text-stone-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900 dark:text-white">{product.price * quantity}€</p>
                      <p className="text-sm text-stone-500">×{quantity}</p>
                    </div>
                  </div>
                ))}
                <button onClick={() => setStep('info')} className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#9eac00] transition-all mt-6">
                  Continuer
                </button>
              </div>
            )}

            {/* Step: Customer info */}
            {step === 'info' && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-5">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">Vos informations</h2>
                {(['name', 'email', 'phone'] as const).map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                      {field === 'name' ? 'Nom complet' : field === 'email' ? 'Email' : 'Téléphone'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      value={customerInfo[field]}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, [field]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-[#AFBD00]/30 focus:border-[#AFBD00] outline-none transition-all"
                      placeholder={field === 'name' ? 'Jean Dupont' : field === 'email' ? 'jean@example.com' : '+32 470 123 456'}
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep('cart')} className="px-6 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                    Retour
                  </button>
                  <button onClick={() => setStep('pickup')} disabled={!canProceedInfo} className="flex-1 py-3 rounded-xl bg-[#AFBD00] text-stone-900 font-bold hover:bg-[#9eac00] transition-all disabled:opacity-50">
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* Step: Pickup */}
            {step === 'pickup' && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-5">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">Point de retrait</h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm">Sélectionnez la pépinière où vous souhaitez récupérer votre commande.</p>
                <div className="space-y-3">
                  {pickupLocations.map(loc => (
                    <button
                      key={loc.labId}
                      onClick={() => setSelectedPickup(loc.labId)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedPickup === loc.labId
                          ? 'border-[#AFBD00] bg-[#AFBD00]/5'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPickup === loc.labId ? 'border-[#AFBD00]' : 'border-stone-300'
                        }`}>
                          {selectedPickup === loc.labId && <div className="w-3 h-3 rounded-full bg-[#AFBD00]" />}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 dark:text-white">{loc.name}</p>
                          <p className="text-sm text-stone-500">{loc.address}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep('info')} className="px-6 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                    Retour
                  </button>
                  <button onClick={handleSubmit} disabled={!canProceedPickup} className="flex-1 py-3 rounded-xl bg-[#AFBD00] text-stone-900 font-bold hover:bg-[#9eac00] transition-all disabled:opacity-50">
                    Confirmer la commande
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="sticky top-24 bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-white mb-4">Résumé</h3>
              <div className="space-y-3 mb-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-stone-600 dark:text-stone-400 truncate mr-2">{product.name} ×{quantity}</span>
                    <span className="font-medium text-stone-900 dark:text-white whitespace-nowrap">{product.price * quantity}€</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-200 dark:border-stone-800 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-stone-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-stone-900 dark:text-white">{total}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
