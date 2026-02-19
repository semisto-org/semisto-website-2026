import { useState, useEffect, useRef } from 'react'
import type { Lab } from '../lib/types'

// =============================================================================
// CONTACT FORM — Lab selection, animated inputs, Lab map, elegant validation
// =============================================================================

interface Props {
  labs: Lab[]
  onSubmit?: (data: { labId?: string; name: string; email: string; subject: string; message: string }) => void
}

const SUBJECTS = [
  { value: 'general', label: 'Question générale', icon: '💬' },
  { value: 'design-studio', label: 'Demande de devis Design Studio', icon: '🎨' },
  { value: 'formation', label: 'Inscription formation', icon: '🎓' },
  { value: 'presse', label: 'Partenariat / Presse', icon: '📰' },
  { value: 'benevolat', label: 'Bénévolat / Roots', icon: '🌱' },
  { value: 'autre', label: 'Autre', icon: '📩' },
]

function FloatingInput({ label, type = 'text', required, value, onChange, error }: {
  label: string; type?: string; required?: boolean; value: string;
  onChange: (v: string) => void; error?: string
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 pt-6 pb-2 rounded-xl border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none transition-all duration-300 ${
          error ? 'border-red-400 focus:border-red-500' :
          focused ? 'border-[#5B5781] shadow-lg shadow-[#5B5781]/10' :
          'border-stone-200 dark:border-stone-700 hover:border-stone-300'
        }`}
      />
      <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
        isActive
          ? 'top-2 text-xs font-semibold ' + (error ? 'text-red-500' : focused ? 'text-[#5B5781]' : 'text-stone-400')
          : 'top-4 text-sm text-stone-400'
      }`}>
        {label} {required && '*'}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          {error}
        </p>
      )}
    </div>
  )
}

// Scroll reveal
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

export default function ContactForm({ labs, onSubmit }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', labId: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const heroReveal = useReveal()
  const formReveal = useReveal()

  const selectedLab = labs.find(l => l.id === form.labId)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Veuillez entrer votre nom'
    if (!form.email.trim()) e.email = 'Veuillez entrer votre email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.subject) e.subject = 'Veuillez choisir un sujet'
    if (!form.message.trim()) e.message = 'Veuillez entrer votre message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    onSubmit?.({ labId: form.labId || undefined, name: form.name, email: form.email, subject: form.subject, message: form.message })
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-stone-900 dark:text-white mb-3" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Message envoyé !
          </h3>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            Merci pour votre message{selectedLab ? ` au lab ${selectedLab.name}` : ''}.
          </p>
          <p className="text-stone-500 text-sm mb-8">
            Notre équipe vous répondra dans les 48 heures.
          </p>
          <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '', labId: '' }) }}
            className="px-8 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-all hover:scale-105">
            Envoyer un autre message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B5781] via-[#4a4670] to-stone-50 dark:to-stone-950" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='white' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
        <div ref={heroReveal.ref} className={`relative max-w-3xl mx-auto text-center transition-all duration-1000 ${heroReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-white/10 text-white/90 backdrop-blur-sm border border-white/20">
            📬 Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Parlons de votre projet
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Une question, un projet de jardin-forêt, une envie de collaboration ? Nous sommes à votre écoute.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80Z" className="fill-stone-50 dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* ===== FORM + LAB INFO ===== */}
      <section className="px-6 pb-20 -mt-4">
        <div ref={formReveal.ref} className={`max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 transition-all duration-700 ${formReveal.vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-xl border border-stone-100 dark:border-stone-800 space-y-6">
              {/* Lab selector */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">Choisissez un lab (optionnel)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button type="button" onClick={() => setForm({ ...form, labId: '' })}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      !form.labId ? 'bg-[#5B5781] text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}>
                    🌍 Global
                  </button>
                  {labs.map(lab => (
                    <button key={lab.id} type="button" onClick={() => setForm({ ...form, labId: lab.id })}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all truncate ${
                        form.labId === lab.id ? 'bg-[#5B5781] text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                      }`}>
                      {lab.country === 'BE' ? '🇧🇪' : lab.country === 'FR' ? '🇫🇷' : lab.country === 'ES' ? '🇪🇸' : '🇩🇪'} {lab.region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FloatingInput label="Nom complet" required value={form.name} onChange={v => { setForm({...form, name: v}); setErrors({...errors, name: ''}) }} error={errors.name} />
                <FloatingInput label="Email" type="email" required value={form.email} onChange={v => { setForm({...form, email: v}); setErrors({...errors, email: ''}) }} error={errors.email} />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">Sujet *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS.map(s => (
                    <button key={s.value} type="button" onClick={() => { setForm({...form, subject: s.value}); setErrors({...errors, subject: ''}) }}
                      className={`px-3 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                        form.subject === s.value
                          ? 'bg-[#5B5781] text-white shadow-lg'
                          : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 border border-stone-200 dark:border-stone-700'
                      }`}>
                      <span className="text-base">{s.icon}</span>
                      <span className="block mt-1 text-xs leading-tight">{s.label}</span>
                    </button>
                  ))}
                </div>
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  required rows={6} value={form.message}
                  onChange={e => { setForm({...form, message: e.target.value}); setErrors({...errors, message: ''}) }}
                  className={`w-full px-4 pt-6 pb-3 rounded-xl border-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-400' : 'border-stone-200 dark:border-stone-700 focus:border-[#5B5781] focus:shadow-lg focus:shadow-[#5B5781]/10'
                  }`}
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  form.message ? 'top-2 text-xs font-semibold text-[#5B5781]' : 'top-4 text-sm text-stone-400'
                }`}>
                  Votre message *
                </label>
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit" disabled={status === 'sending'}
                className="w-full py-4 rounded-xl bg-[#5B5781] text-white font-bold text-lg hover:bg-[#4a4670] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3 shadow-lg shadow-[#5B5781]/25"
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
          </div>

          {/* Lab Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected lab info */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-xl border border-stone-100 dark:border-stone-800">
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {selectedLab ? selectedLab.name : 'Semisto Global'}
              </h3>
              {selectedLab ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#5B5781]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#5B5781]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{selectedLab.address}</p>
                      <p className="text-xs text-stone-400">{selectedLab.region}, {selectedLab.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#5B5781]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#5B5781]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <a href={`mailto:${selectedLab.contactEmail}`} className="text-sm text-[#5B5781] hover:underline font-medium">
                      {selectedLab.contactEmail}
                    </a>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {selectedLab.activePoles.map(pole => (
                      <span key={pole} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#AFBD00]/10 text-[#2D5016] dark:text-[#AFBD00]">
                        {pole === 'design-studio' ? '🎨 Design' : pole === 'academy' ? '🎓 Academy' : pole === 'nursery' ? '🌿 Pépinière' : '🤝 Roots'}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone-500 leading-relaxed">
                  Votre message sera transmis à l'équipe Semisto. Sélectionnez un lab spécifique pour contacter une équipe locale.
                </p>
              )}
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-[#2D5016] to-[#3a6b1e] rounded-3xl p-6 text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='2' fill='white'/%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px'
              }} />
              <div className="relative">
                <h4 className="font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Nos labs en Europe</h4>
                <div className="space-y-2">
                  {labs.map(lab => (
                    <button key={lab.id} onClick={() => setForm({ ...form, labId: lab.id })}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                        form.labId === lab.id ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 text-white/80'
                      }`}>
                      <span className="w-2 h-2 rounded-full bg-[#AFBD00]" />
                      {lab.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick contact */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-xl border border-stone-100 dark:border-stone-800">
              <h4 className="font-bold text-stone-900 dark:text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Besoin d'aide rapide ?</h4>
              <div className="space-y-3">
                <a href="mailto:info@semisto.org" className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400 hover:text-[#5B5781] transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">📧</span>
                  info@semisto.org
                </a>
                <a href="/faq" className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400 hover:text-[#5B5781] transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">❓</span>
                  Consultez notre FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce-in { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  )
}
