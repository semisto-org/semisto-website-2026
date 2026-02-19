import { useState } from 'react'
import type { ProjectDetailProps } from '../lib/types'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: 'Terminé', color: '#22c55e', bg: '#dcfce7' },
  'in-progress': { label: 'En cours', color: '#3b82f6', bg: '#dbeafe' },
  funding: { label: 'Financement', color: '#AFBD00', bg: '#f0f3d8' },
}

const CLIENT_TYPE_LABELS: Record<string, string> = {
  privé: '🏡 Particulier',
  entreprise: '🏢 Entreprise',
  collectif: '👥 Collectif',
  public: '🏛 Collectivité',
}

export function ProjectDetail({ project, lab, relatedProjects, onDonate, onBack }: ProjectDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [donationAmount, setDonationAmount] = useState(50)
  const status = STATUS_MAP[project.status] || STATUS_MAP.completed
  const fundingPercent = project.fundingGoal ? Math.min(100, ((project.fundingRaised || 0) / project.fundingGoal) * 100) : 0

  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950">
      {/* Hero Image Gallery */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src={project.images[activeImage] || '/images/placeholder.jpg'}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Back */}
          <div className="absolute top-6 left-6">
            <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/50 transition-all group">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour
            </button>
          </div>

          {/* Image thumbnails */}
          {project.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title card */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-xl border border-stone-200 dark:border-stone-800">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: status.bg, color: status.color }}>{status.label}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">{CLIENT_TYPE_LABELS[project.clientType] || project.clientType}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {project.title}
              </h1>
              <p className="text-stone-500 dark:text-stone-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                {project.location} · {lab.name}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 text-center">
                <p className="text-4xl font-bold text-stone-900 dark:text-white">{project.surface.toLocaleString()}</p>
                <p className="text-sm text-stone-500 uppercase tracking-wider mt-1">m² transformés</p>
              </div>
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 text-center">
                <p className="text-4xl font-bold text-[#AFBD00]">{project.treesPlanted.toLocaleString()}</p>
                <p className="text-sm text-stone-500 uppercase tracking-wider mt-1">arbres plantés</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-800">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>À propos du projet</h2>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{project.description}</p>
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 relative overflow-hidden">
                <div className="absolute top-4 right-6 text-8xl text-[#AFBD00]/10 font-serif leading-none">"</div>
                <div className="relative">
                  <p className="text-lg italic text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                    "{project.testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#AFBD00]/10 flex items-center justify-center text-[#AFBD00] font-bold">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">{project.testimonial.author}</p>
                      <p className="text-sm text-stone-500">{project.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding */}
            {project.fundingStatus === 'active' && project.fundingGoal && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-lg">
                <h3 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">💚</span> Soutenir ce projet
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-stone-900 dark:text-white">{(project.fundingRaised || 0).toLocaleString()}€</span>
                    <span className="text-stone-500">objectif {project.fundingGoal.toLocaleString()}€</span>
                  </div>
                  <div className="h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#AFBD00] transition-all duration-1000" style={{ width: `${fundingPercent}%` }} />
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{Math.round(fundingPercent)}% atteint</p>
                </div>

                <div className="flex gap-2 mb-4">
                  {[25, 50, 100, 250].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                        donationAmount === amount ? 'bg-[#AFBD00] text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                      }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>

                <button
                  onClick={onDonate}
                  className="w-full py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#9eac00] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#AFBD00]/20"
                >
                  Faire un don de {donationAmount}€
                </button>
              </div>
            )}

            {/* Location */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-white mb-3">Localisation</h3>
              <div className="aspect-video rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-3 overflow-hidden">
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${project.coordinates.lng},${project.coordinates.lat},12,0/400x250@2x?access_token=pk.placeholder`}
                  alt="Carte"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute flex flex-col items-center text-stone-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  <p className="text-xs mt-1">Carte</p>
                </div>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400">{project.location}</p>
            </div>

            {/* Lab */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-stone-900 dark:text-white mb-2">Porté par</h3>
              <a href={`/${lab.slug}/`} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-[#AFBD00]/10 flex items-center justify-center text-[#AFBD00] font-bold text-lg">🌳</div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-white group-hover:text-[#AFBD00] transition-colors">{lab.name}</p>
                  <p className="text-xs text-stone-500">{lab.region}, {lab.country}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16 pb-16">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              Projets similaires
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.slice(0, 3).map(p => (
                <a key={p.id} href={`/${lab.slug}/projects/${p.slug}/`} className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.images[0] || '/images/placeholder.jpg'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-900 dark:text-white group-hover:text-[#AFBD00] transition-colors">{p.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{p.location} · {p.surface} m²</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
