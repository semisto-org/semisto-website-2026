import { useState } from 'react'
import type { Resource } from '../lib/types'

interface Props {
  resources: Resource[]
}

const TYPE_ICONS: Record<string, string> = {
  pdf: '📄',
  video: '🎥',
  guide: '📘',
  infographic: '📊',
  template: '📋',
}

export default function ResourcesPage({ resources }: Props) {
  const [filter, setFilter] = useState<string>('all')
  const types = [...new Set(resources.map(r => r.type))]

  const filtered = filter === 'all' ? resources : resources.filter(r => r.type === filter)

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-[#e1e6d8] text-[#AFBD00]">Ressources</span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Guides & ressources
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Fiches pratiques, guides et outils pour créer et entretenir votre jardin-forêt.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${filter === 'all' ? 'bg-[#5B5781] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'}`}>
            Tout
          </button>
          {types.map(type => (
            <button key={type} onClick={() => setFilter(type)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${filter === type ? 'bg-[#5B5781] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'}`}>
              {TYPE_ICONS[type] || '📁'} {type}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(resource => (
            <article key={resource.id} className="group flex flex-col bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all">
              {resource.thumbnail && (
                <div className="aspect-video overflow-hidden bg-stone-100 dark:bg-stone-700">
                  <img src={resource.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{TYPE_ICONS[resource.type] || '📁'}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{resource.type}</span>
                  {resource.isFree && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Gratuit</span>}
                </div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2 group-hover:text-[#5B5781] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {resource.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B5781] hover:text-[#4a4670] transition-colors group-hover:translate-x-1">
                  Télécharger
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
