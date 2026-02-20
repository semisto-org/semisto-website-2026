import { useState } from 'react'
import type { FundingProposal, Funding } from './types'

interface FundingDetailProps {
  proposal: FundingProposal
  existingFundings?: Funding[]
  onFund?: (proposalId: string, amount: number) => void
  onBack?: () => void
}

const contributionHistory = [
  { partner: 'Colruyt Group', amount: 5000, date: '2025-12-05' },
  { partner: 'Belfius Insurance', amount: 3500, date: '2025-11-20' },
  { partner: 'Commune de Saint-Gilles', amount: 3000, date: '2025-11-10' },
]

export function FundingDetail({ proposal, existingFundings = [], onFund, onBack }: FundingDetailProps) {
  const [step, setStep] = useState<'info' | 'amount' | 'confirm' | 'success'>('info')
  const [amount, setAmount] = useState('')
  const [toast, setToast] = useState('')
  const [localRaised, setLocalRaised] = useState(proposal.raisedAmount)

  const remaining = proposal.targetAmount - localRaised
  const localPercent = Math.min(100, Math.round((localRaised / proposal.targetAmount) * 100))
  const isFunded = proposal.status === 'funded' || localPercent >= 100
  const presetAmounts = [1000, 2500, 5000, 10000]

  const handleConfirm = () => {
    const numAmount = parseInt(amount)
    if (!numAmount || numAmount <= 0) return
    setLocalRaised(prev => Math.min(prev + numAmount, proposal.targetAmount))
    onFund?.(proposal.id, numAmount)
    setStep('success')
    setToast(`Allocation de ${numAmount.toLocaleString('fr-BE')} € confirmée !`)
    setTimeout(() => setToast(''), 4000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/30">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm font-medium">{toast}</p>
          </div>
        </div>
      )}

      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Retour aux projets
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden mb-8 border border-stone-200/60 dark:border-stone-800" style={{ background: 'linear-gradient(135deg, #5B5781 0%, #3d3a57 100%)' }}>
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white">{proposal.labName}</span>
            {proposal.status === 'new' && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#AFBD00] text-white">Nouveau</span>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{proposal.title}</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-2xl">{proposal.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Surface', value: `${proposal.hectares} ha` },
              { label: 'Arbres prévus', value: proposal.treesPlanned.toString() },
              { label: 'Mécènes', value: proposal.contributorsCount.toString() },
              { label: 'Échéance', value: new Date(proposal.deadline).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' }) },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Location mini-map */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center relative">
              <div className="text-center">
                <svg className="w-10 h-10 text-emerald-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{proposal.location}</p>
              </div>
              {/* Decorative map grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="px-5 py-3 border-t border-stone-100 dark:border-stone-800">
              <div className="flex flex-wrap gap-2">
                {proposal.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">Objectifs du projet</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{proposal.treesPlanned}</div>
                <div className="text-sm text-emerald-700/70 dark:text-emerald-400/70 mt-1">Arbres à planter</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">{proposal.hectares} ha</div>
                <div className="text-sm text-teal-700/70 dark:text-teal-400/70 mt-1">Surface du projet</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-stone-50 dark:bg-stone-800">
                <div className="text-3xl font-bold text-stone-700 dark:text-stone-300">{Math.round(proposal.treesPlanned * 0.03 * 10) / 10}</div>
                <div className="text-sm text-stone-500 mt-1">Tonnes CO₂/an estimées</div>
              </div>
            </div>
          </div>

          {/* Contribution history */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 dark:border-stone-800">
              <h2 className="text-lg font-semibold text-stone-900 dark:text-white">Contributions</h2>
            </div>
            {contributionHistory.length === 0 ? (
              <div className="p-8 text-center text-sm text-stone-400">Soyez le premier contributeur !</div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {contributionHistory.map((c, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-500">{c.partner.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{c.partner}</p>
                        <p className="text-xs text-stone-400">{new Date(c.date).toLocaleDateString('fr-BE')}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-stone-900 dark:text-white">{c.amount.toLocaleString('fr-BE')} €</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar — Funding flow */}
        <div>
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sticky top-24">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold text-stone-900 dark:text-white">{localRaised.toLocaleString('fr-BE')} €</span>
                <span className="text-sm text-stone-400">sur {proposal.targetAmount.toLocaleString('fr-BE')} €</span>
              </div>
              <div className="h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${localPercent}%`, background: isFunded ? '#22c55e' : 'linear-gradient(90deg, #5B5781, #7b77a1)' }} />
              </div>
              <p className="text-xs text-stone-400 mt-2">{localPercent}% financé · {remaining > 0 ? `${remaining.toLocaleString('fr-BE')} € restants` : 'Objectif atteint !'}</p>
            </div>

            {/* Step: Info */}
            {step === 'info' && !isFunded && (
              <button onClick={() => setStep('amount')} className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all active:scale-[0.97]" style={{ background: '#5B5781' }}>
                Financer ce projet
              </button>
            )}

            {isFunded && step === 'info' && (
              <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-sm font-medium justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Objectif de financement atteint
              </div>
            )}

            {/* Step: Amount */}
            {step === 'amount' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Étape 1 — Montant</h3>
                <div className="grid grid-cols-2 gap-2">
                  {presetAmounts.map(a => (
                    <button key={a} onClick={() => setAmount(a.toString())} className={`py-2.5 rounded-xl text-sm font-medium transition-all ${amount === a.toString() ? 'bg-[#5B5781] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>
                      {a.toLocaleString('fr-BE')} €
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-stone-400 mb-1 block">Ou montant libre :</label>
                  <div className="relative">
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Montant" className="w-full px-4 py-3 pr-8 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5781]/50" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep('info')} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Annuler</button>
                  <button onClick={() => parseInt(amount) > 0 && setStep('confirm')} disabled={!amount || parseInt(amount) <= 0} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50" style={{ background: '#5B5781' }}>Suivant</button>
                </div>
              </div>
            )}

            {/* Step: Confirm */}
            {step === 'confirm' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Étape 2 — Confirmation</h3>
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-stone-500">Projet</span>
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{proposal.title}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-stone-500">Lab</span>
                    <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{proposal.labName}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                    <span className="text-sm font-semibold text-stone-900 dark:text-white">Montant</span>
                    <span className="text-lg font-bold text-[#5B5781]">{parseInt(amount).toLocaleString('fr-BE')} €</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep('amount')} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Retour</button>
                  <button onClick={handleConfirm} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all active:scale-[0.97]" style={{ background: '#22c55e' }}>Confirmer l'allocation</button>
                </div>
              </div>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Merci !</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Votre allocation de <strong>{parseInt(amount).toLocaleString('fr-BE')} €</strong> a été enregistrée. L'équipe {proposal.labName} vous enverra un accusé de réception.
                </p>
                <button onClick={() => { setStep('info'); setAmount('') }} className="text-sm font-medium text-[#5B5781] hover:underline">Retour au projet</button>
              </div>
            )}

            {/* Steps indicator */}
            {step !== 'info' && step !== 'success' && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {['amount', 'confirm'].map((s, i) => (
                  <div key={s} className={`w-2 h-2 rounded-full transition-colors ${step === s ? 'bg-[#5B5781]' : 'bg-stone-200 dark:bg-stone-700'}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
