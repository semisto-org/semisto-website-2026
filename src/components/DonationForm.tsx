import { useState } from 'react'

interface Props {
  projectTitle?: string
  projectId?: string
}

const AMOUNTS = [10, 25, 50, 100, 250]

export default function DonationForm({ projectTitle, projectId }: Props) {
  const [amount, setAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [step, setStep] = useState<'amount' | 'info' | 'thanks'>('amount')
  const [info, setInfo] = useState({ name: '', email: '', message: '' })

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : amount || 0

  const impactExamples = [
    { threshold: 10, text: '1 arbuste à petits fruits planté' },
    { threshold: 25, text: '5 arbres fruitiers en pépinière' },
    { threshold: 50, text: '10m² de jardin-forêt créé' },
    { threshold: 100, text: '1 journée de formation offerte' },
    { threshold: 250, text: '50m² de forêt comestible plantée' },
  ]
  const impact = impactExamples.filter(i => i.threshold <= finalAmount).pop()

  if (step === 'thanks') {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <h3 className="text-3xl font-bold text-stone-900 dark:text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Merci !</h3>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-2">Votre don de <strong>{finalAmount}€</strong> va directement contribuer à la création de jardins-forêts.</p>
        {impact && <p className="text-[#AFBD00] font-semibold">🌳 {impact.text}</p>}
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {projectTitle && (
        <div className="mb-8 p-4 rounded-2xl bg-[#e1e6d8] dark:bg-stone-800">
          <p className="text-sm text-stone-600 dark:text-stone-400">Don pour</p>
          <p className="text-lg font-bold text-stone-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>{projectTitle}</p>
        </div>
      )}

      {step === 'amount' && (
        <div className="space-y-8">
          {/* Frequency */}
          <div className="flex gap-2 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            {(['once', 'monthly'] as const).map(f => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${frequency === f ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow' : 'text-stone-500'}`}>
                {f === 'once' ? 'Don unique' : 'Don mensuel'}
              </button>
            ))}
          </div>

          {/* Amount Grid */}
          <div className="grid grid-cols-3 gap-3">
            {AMOUNTS.map(a => (
              <button key={a} onClick={() => { setAmount(a); setIsCustom(false) }}
                className={`py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 ${
                  !isCustom && amount === a ? 'bg-[#5B5781] text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}>
                {a}€
              </button>
            ))}
            <button onClick={() => setIsCustom(true)}
              className={`py-4 rounded-xl text-lg font-bold transition-all ${isCustom ? 'bg-[#5B5781] text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
              Autre
            </button>
          </div>

          {isCustom && (
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">€</span>
              <input type="number" min="1" value={customAmount} onChange={e => setCustomAmount(e.target.value)} autoFocus
                className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-[#5B5781] bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-xl font-bold focus:outline-none" placeholder="Montant libre" />
            </div>
          )}

          {/* Impact */}
          {impact && finalAmount > 0 && (
            <div className="p-4 rounded-2xl bg-[#e1e6d8] dark:bg-stone-800 text-center">
              <p className="text-sm text-stone-600 dark:text-stone-400">Votre impact</p>
              <p className="text-lg font-bold text-[#2D5016] dark:text-[#AFBD00]">🌳 {impact.text}</p>
            </div>
          )}

          <button onClick={() => setStep('info')} disabled={finalAmount <= 0}
            className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            Donner {finalAmount > 0 ? `${finalAmount}€` : ''} {frequency === 'monthly' ? '/ mois' : ''}
          </button>
        </div>
      )}

      {step === 'info' && (
        <form onSubmit={(e) => { e.preventDefault(); setStep('thanks') }} className="space-y-6">
          <button onClick={() => setStep('amount')} className="flex items-center gap-2 text-stone-500 text-sm hover:text-stone-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Modifier le montant
          </button>

          <div className="p-4 rounded-xl bg-[#5B5781]/10 text-center">
            <span className="text-3xl font-bold text-[#5B5781]">{finalAmount}€</span>
            {frequency === 'monthly' && <span className="text-stone-500 ml-1">/ mois</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Nom</label>
            <input type="text" required value={info.name} onChange={e => setInfo({...info, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Email</label>
            <input type="email" required value={info.email} onChange={e => setInfo({...info, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Message (optionnel)</label>
            <textarea rows={3} value={info.message} onChange={e => setInfo({...info, message: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30 resize-none" placeholder="Un mot d'encouragement..." />
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all">
            Confirmer le don
          </button>
          <p className="text-xs text-center text-stone-400">🔒 Paiement sécurisé. Reçu fiscal envoyé par email.</p>
        </form>
      )}
    </div>
  )
}
