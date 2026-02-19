import { useState, useMemo } from 'react'
import type { EventCatalogProps, EventType } from '../lib/types'

const EVENT_TYPES: { value: EventType | 'all'; label: string; emoji: string; color: string }[] = [
  { value: 'all', label: 'Tous', emoji: '✨', color: '#5B5781' },
  { value: 'conférence', label: 'Conférences', emoji: '🎤', color: '#5B5781' },
  { value: 'visite', label: 'Visites', emoji: '🌳', color: '#AFBD00' },
  { value: 'atelier', label: 'Ateliers', emoji: '🔧', color: '#EF9B0D' },
]

const TYPE_STYLES: Record<string, { bg: string; text: string }> = {
  'conférence': { bg: '#c8bfd2', text: '#5B5781' },
  'visite': { bg: '#e1e6d8', text: '#6b7a3a' },
  'atelier': { bg: '#fbe6c3', text: '#b87a08' },
}

export function EventCatalog({ events, labId, onEventView, onEventRegister, onFilter }: EventCatalogProps) {
  const [activeType, setActiveType] = useState<EventType | 'all'>('all')

  const filteredEvents = useMemo(() => {
    let filtered = labId ? events.filter(e => e.labId === labId) : events
    if (activeType !== 'all') filtered = filtered.filter(e => e.type === activeType)
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [events, labId, activeType])

  const handleTypeFilter = (type: EventType | 'all') => {
    setActiveType(type)
    onFilter?.({ type: type === 'all' ? undefined : type })
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] dark:bg-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, #4a3d5a 0%, #3a2d4a 40%, #2a1d3a 100%)' }} />
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-[#5B5781]/20 blur-3xl" />
        <div className="absolute bottom-10 left-[20%] w-96 h-96 rounded-full bg-[#EF9B0D]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#5B5781] flex items-center justify-center text-2xl shadow-lg">📅</div>
            <p className="text-white/60 font-medium">Événements Semisto</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: '"Sole Serif Small", Georgia, serif' }}>
            Nos <span className="text-[#EF9B0D]">événements</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Conférences, visites de jardins-forêts et ateliers pratiques — rejoignez le mouvement !
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z" className="fill-[#f5f3ef] dark:fill-stone-950" />
          </svg>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-0 z-40 bg-[#f5f3ef]/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/50 dark:border-stone-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          {EVENT_TYPES.map(type => (
            <button
              key={type.value}
              onClick={() => handleTypeFilter(type.value)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeType === type.value
                  ? 'text-white shadow-lg'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700'
              }`}
              style={activeType === type.value ? { backgroundColor: type.color } : undefined}
            >
              <span>{type.emoji}</span>
              {type.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-stone-500 whitespace-nowrap">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Events list */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event, i) => {
                const date = new Date(event.date)
                const style = TYPE_STYLES[event.type] || TYPE_STYLES.atelier
                const isPast = date < new Date()
                return (
                  <div
                    key={event.id}
                    className={`group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 ${isPast ? 'opacity-60' : ''}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Date block */}
                      <div className="md:w-32 p-6 flex md:flex-col items-center justify-center gap-3 md:gap-1 bg-stone-50 dark:bg-stone-800/50 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800">
                        <p className="text-sm font-bold text-stone-500 uppercase">{date.toLocaleDateString('fr-FR', { month: 'short' })}</p>
                        <p className="text-4xl font-black text-stone-900 dark:text-white">{date.getDate()}</p>
                        <p className="text-xs text-stone-400">{date.getFullYear()}</p>
                      </div>

                      {/* Image */}
                      <div className="md:w-48 lg:w-64 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover min-h-[160px] group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: style.bg, color: style.text }}>{event.type}</span>
                          {event.price === 0 && <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Gratuit</span>}
                          {event.spotsAvailable <= 5 && event.spotsAvailable > 0 && <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Plus que {event.spotsAvailable} places</span>}
                        </div>

                        <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-[#5B5781] transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-stone-500 dark:text-stone-400 text-sm line-clamp-2 mb-4">{event.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {event.time} · {event.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                            {event.location}
                          </span>
                          {event.speakers.length > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                              {event.speakers.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 md:w-44">
                        {event.price > 0 && <p className="text-2xl font-bold text-stone-900 dark:text-white">{event.price}€</p>}
                        <button
                          onClick={() => onEventView?.(event.id)}
                          className="px-6 py-3 rounded-xl bg-[#5B5781] text-white font-semibold hover:bg-[#4a4670] transition-all text-sm whitespace-nowrap"
                        >
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-6 text-4xl">📅</div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Aucun événement trouvé</h3>
              <p className="text-stone-500">Essayez un autre filtre ou revenez bientôt.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}
