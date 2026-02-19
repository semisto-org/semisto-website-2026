import type { PressItem } from '../lib/types'

interface Props {
  items: PressItem[]
}

export default function PressPage({ items }: Props) {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-[#c8bfd2] text-[#5B5781]">Presse</span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Semisto dans les médias
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Découvrez les articles et reportages consacrés au mouvement Semisto et aux jardins-forêts.
          </p>
        </div>

        {/* Press Kit CTA */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#5B5781] to-[#4a4670] text-white text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Kit Presse</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Logos, photos haute résolution, biographies et informations clés sur Semisto.</p>
          <button className="px-8 py-3.5 rounded-xl bg-white text-[#5B5781] font-semibold hover:bg-[#AFBD00] hover:text-stone-900 transition-all hover:scale-105">
            Télécharger le kit presse
          </button>
        </div>

        {/* Press Items */}
        <div className="space-y-6">
          {items.map(item => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:shadow-lg hover:border-stone-300 transition-all">
              {item.image && (
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-700">
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-[#5B5781]">{item.source}</span>
                  <span className="text-xs text-stone-400">
                    {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#5B5781] transition-colors mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm line-clamp-2">{item.excerpt}</p>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-stone-400 group-hover:text-[#5B5781] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Press */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 dark:text-stone-400 mb-4">Vous êtes journaliste ?</p>
          <a href="mailto:press@semisto.org" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
            📧 press@semisto.org
          </a>
        </div>
      </div>
    </div>
  )
}
