import { useState } from 'react'

interface PortalContactFormProps {
  partnerName?: string
  onSubmit?: (data: { subject: string; message: string }) => void
  onBack?: () => void
}

const subjects = [
  { id: 'new-project', label: 'Nouveau projet', icon: '🌱', description: 'Proposer un projet de forêt comestible' },
  { id: 'question', label: 'Question', icon: '❓', description: 'Poser une question sur nos services' },
  { id: 'custom', label: 'Partenariat sur mesure', icon: '🤝', description: 'Discuter d\'un engagement personnalisé' },
  { id: 'support', label: 'Support technique', icon: '🔧', description: 'Aide avec le portail partenaire' },
]

export function PortalContactForm({ partnerName, onSubmit, onBack }: PortalContactFormProps) {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSubject || !message.trim()) return

    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    onSubmit?.({ subject: selectedSubject, message })
    setStatus('success')
  }

  const handleReset = () => {
    setSelectedSubject('')
    setMessage('')
    setStatus('idle')
  }

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6 animate-bounce-once">
          <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3">Message envoyé !</h2>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          L'équipe Semisto reviendra vers vous sous 48h ouvrables. Merci pour votre intérêt !
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={handleReset} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
            Nouveau message
          </button>
          {onBack && (
            <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: '#5B5781' }}>
              Retour au dashboard
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {onBack && (
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Retour
        </button>
      )}

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">Contacter Semisto</h1>
        <p className="text-stone-500 dark:text-stone-400">
          {partnerName ? `${partnerName}, comment` : 'Comment'} pouvons-nous vous aider ?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject selection */}
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">Sujet</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subjects.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSubject(s.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${selectedSubject === s.id ? 'border-[#5B5781] bg-[#5B5781]/5' : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-900'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{s.label}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{s.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">Votre message</label>
          <textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={6}
            placeholder="Décrivez votre demande en détail…"
            disabled={status === 'sending'}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B5781]/50 focus:border-[#5B5781] transition-all disabled:opacity-50 resize-none"
          />
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-red-700 dark:text-red-400">Une erreur est survenue. Veuillez réessayer.</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!selectedSubject || !message.trim() || status === 'sending'}
          className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ background: '#5B5781' }}
        >
          {status === 'sending' ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              Envoi en cours…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Envoyer le message
            </>
          )}
        </button>
      </form>
    </div>
  )
}
