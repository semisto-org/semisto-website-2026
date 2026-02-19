import type { DesignStudioProfileProps } from '../lib/types'

const ICON_MAP: Record<string, string> = {
  home: '🏡',
  building: '🏢',
  users: '👥',
  landmark: '🏛',
}

export function DesignStudioProfile({ lab, profile, exampleProjects, onContactRequest, onProjectView, onBack }: DesignStudioProfileProps) {
  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, #3d4a2d 0%, #2d3a1d 50%, #1d2a0d 100%)' }} />
        <div className="absolute top-20 right-[20%] w-80 h-80 rounded-full bg-[#AFBD00]/15 blur-3xl" />
        <div className="absolute bottom-0 left-[10%] w-96 h-96 rounded-full bg-[#AFBD00]/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Design Studio
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#AFBD00] flex items-center justify-center text-3xl shadow-lg">
              {ICON_MAP[profile.icon] || '🌳'}
            </div>
            <div>
              <p className="text-[#AFBD00] font-bold text-sm uppercase tracking-wider">Design Studio · {lab.name}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
                {profile.title}
              </h1>
            </div>
          </div>

          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">{profile.description}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z" className="fill-[#f5f3ef] dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Vos avantages
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#AFBD00]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#AFBD00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-stone-700 dark:text-stone-300 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Nos services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {profile.services.map((service, i) => (
              <div key={i} className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[#AFBD00]/10 flex items-center justify-center mb-4 text-[#AFBD00] font-bold text-lg group-hover:bg-[#AFBD00] group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">{service.name}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">{service.description}</p>
                <p className="text-lg font-bold text-[#AFBD00]">{service.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Projects */}
        {exampleProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
              Exemples de réalisations
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleProjects.map(p => (
                <button key={p.id} onClick={() => onProjectView?.(p.id)} className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-xl transition-all hover:-translate-y-1 text-left">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.images[0] || '/images/placeholder.jpg'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-stone-900 dark:text-white group-hover:text-[#AFBD00] transition-colors">{p.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">{p.location} · {p.surface} m²</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12" style={{ background: 'linear-gradient(135deg, #3d4a2d 0%, #2d3a1d 100%)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#AFBD00]/10 blur-3xl" />
          <div className="relative text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
              Prêt à transformer votre espace ?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Contactez notre équipe pour discuter de votre projet et recevoir un devis personnalisé.
            </p>
            <button
              onClick={onContactRequest}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#AFBD00] text-stone-900 font-bold text-lg hover:bg-[#9eac00] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#AFBD00]/20"
            >
              {profile.ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
