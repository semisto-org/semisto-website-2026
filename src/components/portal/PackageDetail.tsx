import { useState } from 'react'
import type { Package } from './types'

interface PackageDetailProps {
  pkg: Package
  allPackages: Package[]
  onInterest?: (packageId: string) => void
  onBack?: () => void
  onViewPackage?: (packageId: string) => void
}

const typeLabels: Record<Package['type'], string> = {
  'citizen-project': 'Projet Citoyen',
  'team-building': 'Team Building',
  'sponsorship': 'Parrainage',
  'recurring-patronage': 'Mécénat Périodique',
  'training': 'Formation',
  'ambassador': 'Programme Ambassadeur',
}

const testimonials = [
  { name: 'Marie Dupont', role: 'Directrice RSE, BNP Paribas Fortis', text: 'Le projet citoyen a mobilisé nos équipes comme jamais. Un impact concret et mesurable sur le terrain.' },
  { name: 'Jean-Marc Nollet', role: 'Échevin, Commune de Namur', text: 'Le partenariat avec Semisto a transformé notre politique de verdissement. Les habitants sont enchantés.' },
  { name: 'Isabelle Clément', role: 'DRH, Proximus', text: 'Le team building plantation est devenu notre événement annuel le plus attendu. Fédérateur et porteur de sens.' },
]

export function PackageDetail({ pkg, allPackages, onInterest, onBack, onViewPackage }: PackageDetailProps) {
  const [showModal, setShowModal] = useState(false)
  const [interestSent, setInterestSent] = useState(false)
  const [toast, setToast] = useState('')

  const similarPackages = allPackages.filter(p => p.id !== pkg.id).slice(0, 3)

  const handleInterest = () => {
    setShowModal(false)
    setInterestSent(true)
    onInterest?.(pkg.id)
    setToast('Votre intérêt a été enregistré ! L\'équipe Semisto vous contactera sous 48h.')
    setTimeout(() => setToast(''), 4000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/30">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{toast}</p>
          </div>
        </div>
      )}

      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Retour aux packages
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden mb-8" style={{ background: pkg.highlighted ? 'linear-gradient(135deg, #5B5781 0%, #3d3a57 100%)' : 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)' }}>
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pkg.highlighted ? 'bg-white/20 text-white' : 'bg-stone-300/50 text-stone-600 dark:text-stone-300'}`}>
              {typeLabels[pkg.type]}
            </span>
            {pkg.highlighted && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#AFBD00] text-white">Recommandé</span>}
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${pkg.highlighted ? 'text-white' : 'text-stone-900 dark:text-white'}`}>
            {pkg.title}
          </h1>
          <p className={`text-base leading-relaxed max-w-2xl ${pkg.highlighted ? 'text-white/70' : 'text-stone-500 dark:text-stone-400'}`}>
            {pkg.description}
          </p>
          <div className={`flex items-center gap-6 mt-6 text-sm ${pkg.highlighted ? 'text-white/60' : 'text-stone-400'}`}>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {pkg.duration}
            </span>
            <span className={`font-semibold ${pkg.highlighted ? 'text-white' : 'text-stone-700 dark:text-stone-200'}`}>{pkg.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Includes */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-5">Ce package inclut</h2>
            <ul className="space-y-3">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-stone-600 dark:text-stone-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-5">Ce qu'en disent nos partenaires</h2>
            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5">
                  <p className="text-sm text-stone-600 dark:text-stone-300 italic mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-500 dark:text-stone-400">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{t.name}</p>
                      <p className="text-xs text-stone-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CTA Card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sticky top-24">
            <div className="text-center mb-5">
              <p className="text-sm text-stone-400 dark:text-stone-500 mb-1">À partir de</p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">{pkg.priceRange}</p>
              <p className="text-xs text-stone-400 mt-1">{pkg.duration}</p>
            </div>
            <button
              onClick={() => interestSent ? null : setShowModal(true)}
              disabled={interestSent}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97] ${interestSent ? 'bg-emerald-500 cursor-default' : 'hover:opacity-90'}`}
              style={interestSent ? {} : { background: '#5B5781' }}
            >
              {interestSent ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Intérêt enregistré
                </span>
              ) : 'Marquer mon intérêt'}
            </button>
            <p className="text-xs text-stone-400 dark:text-stone-500 text-center mt-3">
              Sans engagement. Notre équipe vous contactera pour discuter de vos besoins.
            </p>
          </div>

          {/* Similar packages */}
          {similarPackages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-3">Autres packages</h3>
              <div className="space-y-2">
                {similarPackages.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onViewPackage?.(p.id)}
                    className="w-full text-left p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:shadow-md transition-all group"
                  >
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-[#5B5781] transition-colors">{p.shortTitle}</p>
                    <p className="text-xs text-stone-400 mt-1">{p.priceRange} · {p.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">Confirmer votre intérêt</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              Vous souhaitez marquer votre intérêt pour <strong>{pkg.shortTitle}</strong> ? Notre équipe vous contactera sous 48h pour discuter de la mise en place.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                Annuler
              </button>
              <button onClick={handleInterest} className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all active:scale-[0.97]" style={{ background: '#5B5781' }}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
