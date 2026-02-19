import { useState } from 'react'

interface Props {
  labName?: string
}

export default function ContactForm({ labName }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', lab: labName || '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
  }

  const subjects = [
    'Question générale',
    'Demande de devis Design Studio',
    'Inscription formation',
    'Partenariat / Presse',
    'Bénévolat / Roots',
    'Autre',
  ]

  if (status === 'sent') {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 rounded-full bg-[#e1e6d8] flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#AFBD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Message envoyé !
        </h3>
        <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Merci pour votre message. Notre équipe vous répondra dans les 48 heures.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Nom complet *</label>
          <input
            type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30 focus:border-[#5B5781] transition-all"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Email *</label>
          <input
            type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30 focus:border-[#5B5781] transition-all"
            placeholder="jean@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Sujet *</label>
        <select
          required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30 focus:border-[#5B5781] transition-all appearance-none"
        >
          <option value="">Choisir un sujet...</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Message *</label>
        <textarea
          required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B5781]/30 focus:border-[#5B5781] transition-all resize-none"
          placeholder="Votre message..."
        />
      </div>

      <button
        type="submit" disabled={status === 'sending'}
        className="w-full py-4 rounded-xl bg-[#5B5781] text-white font-semibold text-lg hover:bg-[#4a4670] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3"
      >
        {status === 'sending' ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer le message
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </>
        )}
      </button>
    </form>
  )
}
