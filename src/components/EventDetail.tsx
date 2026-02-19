import type { Event } from '../lib/types'
import { Breadcrumbs } from './Breadcrumbs'

interface Props {
  event: Event
}

export default function EventDetail({ event }: Props) {
  const date = new Date(event.date)
  const typeColors: Record<string, { bg: string; text: string }> = {
    'conférence': { bg: '#c8bfd2', text: '#5B5781' },
    'visite': { bg: '#e1e6d8', text: '#AFBD00' },
    'atelier': { bg: '#fbe6c3', text: '#EF9B0D' }
  }
  const colors = typeColors[event.type] || typeColors['atelier']

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8"><Breadcrumbs items={[{ label: 'Événements', href: '/events' }, { label: event.title }]} /></div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: colors.bg, color: colors.text }}>{event.type}</span>
              {event.price === 0 && <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Gratuit</span>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{event.title}</h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">{event.description}</p>

            {event.speakers.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Intervenant{event.speakers.length > 1 ? 's' : ''}</h3>
                <div className="flex flex-wrap gap-3">
                  {event.speakers.map(s => (
                    <div key={s} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800">
                      <div className="w-8 h-8 rounded-full bg-[#5B5781]/10 flex items-center justify-center text-[#5B5781] font-bold text-sm">{s.charAt(0)}</div>
                      <span className="font-medium text-stone-700 dark:text-stone-300 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 space-y-4">
              {/* Date card */}
              <div className="text-center p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                <p className="text-sm font-bold text-stone-500 uppercase">{date.toLocaleDateString('fr-FR', { month: 'long' })}</p>
                <p className="text-5xl font-black text-stone-900 dark:text-white">{date.getDate()}</p>
                <p className="text-sm text-stone-500 capitalize">{date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric' })}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {event.time} · {event.duration}
                </div>
                <div className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <svg className="w-5 h-5 text-stone-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-stone-500 text-xs">{event.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
                  {event.spotsAvailable} places restantes sur {event.spotsTotal}
                </div>
              </div>

              <div className="pt-4 text-center">
                <span className="text-3xl font-bold text-stone-900 dark:text-white">{event.price === 0 ? 'Gratuit' : `${event.price}€`}</span>
              </div>

              <button disabled={event.spotsAvailable === 0}
                className="w-full py-4 rounded-xl bg-[#EF9B0D] text-stone-900 font-bold text-lg hover:bg-[#d98c0b] transition-all disabled:opacity-50">
                {event.spotsAvailable === 0 ? 'Complet' : "S'inscrire"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
