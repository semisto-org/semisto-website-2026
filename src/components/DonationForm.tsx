import { useState, useEffect, useRef } from 'react'
import type { Project } from '../lib/types'

// =============================================================================
// DONATION FORM — Impact amounts, recurring option, project progress bar,
// elegant multi-step flow
// =============================================================================

interface Props {
  projectTitle?: string
  projectId?: string
  project?: Project
  onDonate?: (amount: number, isRecurring: boolean) => void
}

const AMOUNTS = [
  { value: 10, impact: '1 arbuste à petits fruits planté', icon: '🫐' },
  { value: 25, impact: '5 arbres fruitiers en pépinière', icon: '🌳' },
  { value: 50, impact: '10m² de jardin-forêt créé', icon: '🌿' },
  { value: 100, impact: '1 journée de formation offerte', icon: '🎓' },
  { value: 250, impact: '50m² de forêt comestible plantée', icon: '🌲' },
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

function AnimatedCounter({ end }: { end: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let start = 0
    const dur = 1500
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / dur, 1)
      setCount(Math.round(end * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function DonationForm({ projectTitle, projectId, project, onDonate }: Props) {
  const [amount, setAmount] = useState<number | null>(50)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [step, setStep] = useState<'amount' | 'info' | 'thanks'>('amount')
  const [info, setInfo] = useState({ name: '', email: '', message: '' })
  const [hoveredAmount, setHoveredAmount] = useState<number | null>(null)
  const formReveal = useReveal()

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : amount || 0
  const displayImpact = AMOUNTS.filter(a => a.value <= (hoveredAmount || finalAmount)).pop()

  const fundingProgress = project?.fundingGoal && project?.fundingRaised
    ? Math.min(project.fundingRaised / project.fundingGoal, 1)
    : null

  if (step === 'thanks') {
    return (
      <div className="text-center py-16 px-6 animate-fade-in">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#AFBD00] to-[#2D5016] animate-bounce-in" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          {/* Confetti particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['#AFBD00', '#5B5781', '#EF9B0D', '#B01A19'][i % 4],
                top: '50%', left: '50%',
                animation: `confetti-${i % 4} 1s ease-out ${i * 0.1}s forwards`
              }}
            />
          ))}
        </div>

        <h3 className="text-3xl font-bold text-stone-900 dark:text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Merci infiniment ! 🌳
        </h3>
        <p className="text-lg text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-2">
          Votre don de <strong className="text-[#2D5016] dark:text-[#AFBD00]">{finalAmount}€{frequency === 'monthly' ? '/mois' : ''}</strong> va directement contribuer à la création de jardins-forêts.
        </p>
        {displayImpact && (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e1e6d8] dark:bg-stone-800 text-[#2D5016] dark:text-[#AFBD00] font-semibold mt-4">
            {displayImpact.icon} {displayImpact.impact}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => { setStep('amount'); setInfo({ name: '', email: '', message: '' }) }}
            className="px-6 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-200 transition-all">
            Faire un autre don
          </button>
          <a href="/projects" className="px-6 py-3 rounded-xl bg-[#5B5781] text-white font-semibold hover:bg-[#4a4670] transition-all">
            Voir nos projets
          </a>
        </div>

        <style>{`
          @keyframes confetti-0 { to { transform: translate(-40px, -50px) scale(0); opacity: 0; } }
          @keyframes confetti-1 { to { transform: translate(45px, -40px) scale(0); opacity: 0; } }
          @keyframes confetti-2 { to { transform: translate(-30px, 45px) scale(0); opacity: 0; } }
          @keyframes confetti-3 { to { transform: translate(35px, 40px) scale(0); opacity: 0; } }
          .animate-fade-in { animation: fade-in 0.6s ease-out; }
          .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
          @keyframes fade-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce-in { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        `}</style>
      </div>
    )
  }

  return (
    <div ref={formReveal.ref} className={`max-w-lg mx-auto transition-all duration-700 ${formReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      {/* Project context */}
      {projectTitle && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-[#e1e6d8] to-[#d6dcc8] dark:from-stone-800 dark:to-stone-800/80 border border-[#AFBD00]/20">
          <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Don pour le projet</p>
          <p className="text-lg font-bold text-stone-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>{projectTitle}</p>

          {/* Project funding progress */}
          {fundingProgress !== null && project?.fundingGoal && project?.fundingRaised && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold text-[#2D5016] dark:text-[#AFBD00]">
                  <AnimatedCounter end={project.fundingRaised} />€ récoltés
                </span>
                <span className="text-stone-500">objectif {project.fundingGoal.toLocaleString()}€</span>
              </div>
              <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#AFBD00] to-[#2D5016] rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${fundingProgress * 100}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-xs text-stone-400 mt-1">{Math.round(fundingProgress * 100)}% de l'objectif atteint</p>
            </div>
          )}
        </div>
      )}

      {step === 'amount' && (
        <div className="space-y-6">
          {/* Frequency toggle */}
          <div className="flex gap-2 p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl">
            {(['once', 'monthly'] as const).map(f => (
              <button key={f} onClick={() => setFrequency(f)}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  frequency === f
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-md'
                    : 'text-stone-500 hover:text-stone-700'
                }`}>
                {f === 'once' ? '🎁 Don unique' : '💚 Don mensuel'}
              </button>
            ))}
          </div>

          {frequency === 'monthly' && (
            <div className="p-3 rounded-xl bg-[#5B5781]/5 border border-[#5B5781]/20 text-center">
              <p className="text-sm text-[#5B5781] font-medium">
                ✨ Un don mensuel multiplie votre impact dans le temps
              </p>
            </div>
          )}

          {/* Amount grid with impact */}
          <div className="grid grid-cols-2 gap-3">
            {AMOUNTS.map(a => (
              <button
                key={a.value}
                onClick={() => { setAmount(a.value); setIsCustom(false) }}
                onMouseEnter={() => setHoveredAmount(a.value)}
                onMouseLeave={() => setHoveredAmount(null)}
                className={`relative py-5 px-4 rounded-2xl text-left transition-all duration-300 hover:scale-[1.03] ${
                  !isCustom && amount === a.value
                    ? 'bg-[#5B5781] text-white shadow-xl shadow-[#5B5781]/25 ring-2 ring-[#5B5781]'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 shadow-sm border border-stone-200 dark:border-stone-700'
                }`}
              >
                <div className="text-2xl font-black">{a.value}€</div>
                <div className={`text-xs mt-1 leading-tight ${!isCustom && amount === a.value ? 'text-white/70' : 'text-stone-400'}`}>
                  {a.icon} {a.impact}
                </div>
              </button>
            ))}
            <button
              onClick={() => setIsCustom(true)}
              className={`py-5 px-4 rounded-2xl text-left transition-all duration-300 ${
                isCustom
                  ? 'bg-[#5B5781] text-white shadow-xl shadow-[#5B5781]/25 ring-2 ring-[#5B5781]'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 shadow-sm border border-stone-200 dark:border-stone-700'
              }`}
            >
              <div className="text-2xl font-black">✏️</div>
              <div className={`text-xs mt-1 ${isCustom ? 'text-white/70' : 'text-stone-400'}`}>Montant libre</div>
            </button>
          </div>

          {isCustom && (
            <div className="relative animate-slide-down">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 text-xl font-bold">€</span>
              <input
                type="number" min="1" value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-5 rounded-2xl border-2 border-[#5B5781] bg-white dark:bg-stone-800 text-stone-900 dark:text-white text-2xl font-black focus:outline-none focus:shadow-lg focus:shadow-[#5B5781]/10 transition-all"
                placeholder="Votre montant"
              />
            </div>
          )}

          {/* Impact display */}
          {displayImpact && finalAmount > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#e1e6d8] to-[#d6dcc8] dark:from-stone-800 dark:to-stone-800/80 text-center transition-all duration-300">
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Votre impact</p>
              <p className="text-lg font-bold text-[#2D5016] dark:text-[#AFBD00]">
                {displayImpact.icon} {displayImpact.impact}
              </p>
            </div>
          )}

          <button
            onClick={() => { setStep('info'); onDonate?.(finalAmount, frequency === 'monthly') }}
            disabled={finalAmount <= 0}
            className="w-full py-4 rounded-2xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#AFBD00]/25 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            Donner {finalAmount > 0 ? `${finalAmount}€` : ''} {frequency === 'monthly' ? '/ mois' : ''}
          </button>
        </div>
      )}

      {step === 'info' && (
        <form onSubmit={(e) => { e.preventDefault(); setStep('thanks') }} className="space-y-5 animate-slide-in">
          <button type="button" onClick={() => setStep('amount')} className="flex items-center gap-2 text-stone-500 text-sm hover:text-stone-700 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Modifier le montant
          </button>

          <div className="p-5 rounded-2xl bg-[#5B5781]/5 border border-[#5B5781]/20 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-400 uppercase tracking-wider">Votre don</p>
              <span className="text-3xl font-black text-[#5B5781]">{finalAmount}€</span>
              {frequency === 'monthly' && <span className="text-stone-400 ml-1 font-medium">/ mois</span>}
            </div>
            {displayImpact && (
              <div className="text-right">
                <span className="text-2xl">{displayImpact.icon}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Nom</label>
            <input type="text" required value={info.name} onChange={e => setInfo({...info, name: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#5B5781] focus:shadow-lg focus:shadow-[#5B5781]/10 transition-all" placeholder="Jean Dupont" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Email</label>
            <input type="email" required value={info.email} onChange={e => setInfo({...info, email: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#5B5781] focus:shadow-lg focus:shadow-[#5B5781]/10 transition-all" placeholder="jean@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Message (optionnel)</label>
            <textarea rows={3} value={info.message} onChange={e => setInfo({...info, message: e.target.value})}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-[#5B5781] focus:shadow-lg focus:shadow-[#5B5781]/10 transition-all resize-none" placeholder="Un mot d'encouragement... 🌱" />
          </div>

          <button type="submit" className="w-full py-4 rounded-2xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#c4d300] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#AFBD00]/25">
            Confirmer le don
          </button>
          <p className="text-xs text-center text-stone-400">🔒 Paiement sécurisé · Reçu fiscal envoyé par email</p>
        </form>
      )}

      <style>{`
        @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  )
}
