import { useState } from 'react'
import type { Engagement, EngagementMedia } from './types'

interface EngagementDetailProps {
  engagement: Engagement
  onDocumentDownload?: (documentId: string) => void
  onBack?: () => void
}

const typeLabels: Record<string, string> = {
  'citizen-project': 'Projet Citoyen',
  'team-building': 'Team Building',
  'sponsorship': 'Parrainage',
  'recurring-patronage': 'Mécénat',
  'training': 'Formation',
  'ambassador': 'Ambassadeur',
}

const eventTypeColors: Record<string, { dot: string; label: string }> = {
  milestone: { dot: '#5B5781', label: 'Jalon' },
  workshop: { dot: '#AFBD00', label: 'Atelier' },
  planting: { dot: '#22c55e', label: 'Plantation' },
  'team-building': { dot: '#f59e0b', label: 'Team Building' },
  reporting: { dot: '#6366f1', label: 'Reporting' },
}

export function EngagementDetail({ engagement, onDocumentDownload, onBack }: EngagementDetailProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'media' | 'events'>('timeline')
  const [selectedMedia, setSelectedMedia] = useState<EngagementMedia | null>(null)
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'video'>('all')

  const isCompleted = engagement.status === 'completed'
  const completedEvents = engagement.events.filter(e => e.status === 'completed').length
  const upcomingEvents = engagement.events.filter(e => e.status === 'upcoming')
  const filteredMedia = mediaFilter === 'all' ? engagement.media : engagement.media.filter(m => m.type === mediaFilter)

  const tabs = [
    { id: 'timeline' as const, label: 'Timeline', count: engagement.events.length },
    { id: 'documents' as const, label: 'Documents', count: engagement.documents.length },
    { id: 'media' as const, label: 'Médias', count: engagement.media.length },
    { id: 'events' as const, label: 'Événements', count: upcomingEvents.length },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Retour aux engagements
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden mb-8 border border-stone-200/60 dark:border-stone-800" style={{ background: isCompleted ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'linear-gradient(135deg, #5B5781, #3d3a57)' }}>
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-white/20 text-white'}`}>
              {isCompleted ? 'Terminé' : engagement.status === 'active' ? 'En cours' : 'En attente'}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isCompleted ? 'text-emerald-600' : 'text-white/60'}`}>
              {typeLabels[engagement.packageType]}
            </span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 ${isCompleted ? 'text-stone-900' : 'text-white'}`}>{engagement.title}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Lab', value: engagement.labName },
              { label: 'Lieu', value: engagement.location || '—' },
              { label: 'Budget', value: `${engagement.totalBudget.toLocaleString('fr-BE')} €` },
              { label: 'Période', value: `${new Date(engagement.startDate).toLocaleDateString('fr-BE', { month: 'short', year: 'numeric' })} — ${new Date(engagement.endDate).toLocaleDateString('fr-BE', { month: 'short', year: 'numeric' })}` },
            ].map(item => (
              <div key={item.label}>
                <dt className={`text-xs ${isCompleted ? 'text-emerald-600/70' : 'text-white/50'}`}>{item.label}</dt>
                <dd className={`text-sm font-semibold mt-0.5 ${isCompleted ? 'text-stone-900' : 'text-white'}`}>{item.value}</dd>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className={isCompleted ? 'text-emerald-700' : 'text-white/60'}>{completedEvents}/{engagement.events.length} étapes</span>
              <span className={`font-semibold ${isCompleted ? 'text-emerald-700' : 'text-white'}`}>{engagement.progress}%</span>
            </div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-200' : 'bg-white/20'}`}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${engagement.progress}%`, background: isCompleted ? '#22c55e' : '#AFBD00' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto border-b border-stone-200 dark:border-stone-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id ? 'border-[#5B5781] text-[#5B5781] dark:text-[#c8bfd2]' : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700'}`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-[#5B5781]/10 text-[#5B5781]' : 'bg-stone-100 dark:bg-stone-800 text-stone-400'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab: Timeline */}
      {activeTab === 'timeline' && (
        <div className="relative">
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-700" />
          <div className="space-y-6">
            {engagement.events.map(event => {
              const colors = eventTypeColors[event.type] || eventTypeColors.milestone
              const isUpcoming = event.status === 'upcoming'
              return (
                <div key={event.id} className="relative flex gap-4">
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center border-4 border-white dark:border-stone-950 ${isUpcoming ? 'bg-stone-100 dark:bg-stone-800' : ''}`} style={!isUpcoming ? { background: colors.dot } : {}}>
                      {!isUpcoming ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                      )}
                    </div>
                  </div>
                  <div className={`flex-1 rounded-xl p-4 border transition-colors ${isUpcoming ? 'bg-white dark:bg-stone-900 border-dashed border-stone-300 dark:border-stone-700' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.dot }}>{colors.label}</span>
                      <span className="text-[10px] text-stone-400">{new Date(event.date).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">{event.title}</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab: Documents */}
      {activeTab === 'documents' && (
        <div>
          {engagement.documents.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-sm text-stone-400">Aucun document disponible</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {engagement.documents.map(doc => {
                  const typeIcon = doc.type === 'certificate' ? '🏆' : doc.type === 'design' ? '📐' : '📄'
                  return (
                    <button key={doc.id} onClick={() => onDocumentDownload?.(doc.id)} className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-lg flex-shrink-0">{typeIcon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate group-hover:text-[#5B5781] transition-colors">{doc.title}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{doc.fileSize} · {new Date(doc.date).toLocaleDateString('fr-BE')} · {doc.type === 'certificate' ? 'Certificat' : doc.type === 'design' ? 'Design' : 'Rapport'}</p>
                      </div>
                      <svg className="w-5 h-5 text-stone-300 dark:text-stone-600 group-hover:text-[#5B5781] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Media */}
      {activeTab === 'media' && (
        <div>
          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {(['all', 'photo', 'video'] as const).map(filter => (
              <button key={filter} onClick={() => setMediaFilter(filter)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${mediaFilter === filter ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700'}`}>
                {filter === 'all' ? 'Tout' : filter === 'photo' ? 'Photos' : 'Vidéos'}
              </button>
            ))}
          </div>

          {filteredMedia.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm text-stone-400">Aucun média disponible</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredMedia.map(media => (
                <button key={media.id} onClick={() => setSelectedMedia(media)} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                    <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-xs text-white font-medium truncate">{media.title}</p>
                      <p className="text-[10px] text-white/60">{new Date(media.date).toLocaleDateString('fr-BE')}</p>
                    </div>
                  </div>
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-stone-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      {media.duration && <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">{media.duration}</span>}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Events (calendar-style) */}
      {activeTab === 'events' && (
        <div>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm text-stone-400">Aucun événement à venir</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map(event => {
                const colors = eventTypeColors[event.type] || eventTypeColors.milestone
                const date = new Date(event.date)
                return (
                  <div key={event.id} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-stone-50 dark:bg-stone-800 flex-shrink-0">
                      <span className="text-[10px] font-semibold uppercase text-stone-400 leading-none">{date.toLocaleDateString('fr-BE', { month: 'short' })}</span>
                      <span className="text-xl font-bold text-stone-900 dark:text-white leading-none mt-0.5">{date.getDate()}</span>
                      <span className="text-[9px] text-stone-400 leading-none mt-0.5">{date.getFullYear()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: colors.dot }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.dot }}>{colors.label}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">{event.title}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{event.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Next event highlight */}
          {engagement.nextEvent && (
            <div className="mt-6 p-5 rounded-2xl border-2 border-dashed border-[#5B5781]/30 bg-[#5B5781]/5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#5B5781]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="text-sm font-semibold text-[#5B5781]">Prochain événement</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 dark:text-white">{engagement.nextEvent.title}</h3>
              <p className="text-sm text-stone-500 mt-1">{new Date(engagement.nextEvent.date).toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {engagement.nextEvent.location}</p>
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center" onClick={() => setSelectedMedia(null)}>
          <button onClick={() => setSelectedMedia(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="max-w-4xl max-h-[80vh] mx-auto px-16" onClick={e => e.stopPropagation()}>
            <div className={`relative ${selectedMedia.type === 'video' ? 'aspect-video' : 'aspect-[4/3]'} rounded-xl overflow-hidden bg-stone-800 flex items-center justify-center`}>
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center">
                {selectedMedia.type === 'video' ? (
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                ) : (
                  <svg className="w-16 h-16 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                )}
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-medium">{selectedMedia.title}</p>
              <p className="text-white/50 text-sm mt-1">{new Date(selectedMedia.date).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
