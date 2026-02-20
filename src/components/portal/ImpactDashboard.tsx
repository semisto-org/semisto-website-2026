import { useState, useEffect } from 'react'
import type { ImpactMetrics } from './types'

interface ImpactDashboardProps {
  metrics: ImpactMetrics
  partnerName: string
  onExportPdf?: () => void
}

function AnimatedNumber({ value, format = 'number', duration = 1800 }: { value: number; format?: 'number' | 'decimal'; duration?: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const steps = 50
    const stepVal = value / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      setDisplay(Math.min(step * stepVal, value))
      if (step >= steps) { clearInterval(interval); setDisplay(value) }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [value, duration])
  if (format === 'decimal') return <>{display.toLocaleString('fr-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
  return <>{Math.round(display).toLocaleString('fr-BE')}</>
}

// Previous year comparison (mock: ~70% of current values)
function compareLabel(current: number, factor = 0.7): string {
  const prev = Math.round(current * factor)
  const diff = current - prev
  const pct = prev > 0 ? Math.round((diff / prev) * 100) : 100
  return `+${pct}% vs année précédente`
}

export function ImpactDashboard({ metrics, partnerName, onExportPdf }: ImpactDashboardProps) {
  const [showCertificates, setShowCertificates] = useState(false)

  const maxInvested = Math.max(...metrics.history.map(h => h.invested), 1)
  const maxTrees = Math.max(...metrics.history.map(h => h.trees), 1)

  const handleExport = () => {
    onExportPdf?.()
    window.print()
  }

  const metricCards = [
    { value: metrics.hectaresContributed, label: 'Hectares contribués', unit: 'ha', format: 'decimal' as const, color: '#22c55e', bgColor: '#f0fdf4', compare: compareLabel(metrics.hectaresContributed) },
    { value: metrics.treesPlanted, label: 'Arbres plantés', unit: '', format: 'number' as const, color: '#AFBD00', bgColor: '#f7f8e8', compare: compareLabel(metrics.treesPlanted) },
    { value: metrics.participantsMobilized, label: 'Participants mobilisés', unit: '', format: 'number' as const, color: '#f59e0b', bgColor: '#fffbeb', compare: compareLabel(metrics.participantsMobilized) },
    { value: metrics.co2OffsetTons, label: 'CO₂ compensé', unit: 't', format: 'decimal' as const, color: '#5B5781', bgColor: '#eee8f5', compare: compareLabel(metrics.co2OffsetTons) },
  ]

  const certificates = [
    { id: 'cert-1', title: 'Certificat RSE 2025', description: 'Attestation de contribution à la reforestation comestible', date: '2025-12-31', status: 'available' },
    { id: 'cert-2', title: 'Bilan Carbone Partenaire', description: 'Calcul détaillé de votre compensation carbone', date: '2025-12-31', status: 'available' },
    { id: 'cert-3', title: 'Certificat RSE 2026', description: 'En cours de génération — disponible en décembre', date: '2026-12-31', status: 'pending' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">Dashboard d'impact</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Vue d'ensemble de l'impact de {partnerName}</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all active:scale-[0.97] print:hidden" style={{ background: '#5B5781' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Exporter PDF
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map(card => (
          <div key={card.label} className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:shadow-lg transition-shadow group">
            <div className="absolute top-0 left-0 right-0 h-0.5 opacity-60" style={{ background: card.color }} />
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-stone-900 dark:text-white tabular-nums">
                <AnimatedNumber value={card.value} format={card.format} />
              </span>
              {card.unit && <span className="text-sm font-medium text-stone-400">{card.unit}</span>}
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">{card.label}</p>
            <p className="text-xs mt-2 font-medium" style={{ color: card.color }}>{card.compare}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment chart */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">Investissement mensuel</h2>
          <div className="flex items-end gap-2 h-48">
            {metrics.history.map((h, i) => {
              const height = (h.invested / maxInvested) * 100
              const month = new Date(h.month + '-01').toLocaleDateString('fr-BE', { month: 'short' })
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-stone-400 tabular-nums">{h.invested > 0 ? `${(h.invested / 1000).toFixed(0)}k` : ''}</span>
                  <div className="w-full relative" style={{ height: '160px' }}>
                    <div className="absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-700 hover:opacity-80" style={{ height: `${height}%`, background: 'linear-gradient(180deg, #5B5781, #7b77a1)' }} />
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">{month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Trees chart */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">Arbres plantés par mois</h2>
          <div className="flex items-end gap-2 h-48">
            {metrics.history.map((h, i) => {
              const height = maxTrees > 0 ? (h.trees / maxTrees) * 100 : 0
              const month = new Date(h.month + '-01').toLocaleDateString('fr-BE', { month: 'short' })
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-stone-400 tabular-nums">{h.trees > 0 ? h.trees : ''}</span>
                  <div className="w-full relative" style={{ height: '160px' }}>
                    <div className="absolute bottom-0 left-0 right-0 rounded-t-md transition-all duration-700 hover:opacity-80" style={{ height: `${height}%`, background: 'linear-gradient(180deg, #22c55e, #4ade80)' }} />
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">{month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Year comparison */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">Comparaison annuelle</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Investissement', current: metrics.totalInvested, prev: Math.round(metrics.totalInvested * 0.7), unit: '€' },
            { label: 'Arbres', current: metrics.treesPlanted, prev: Math.round(metrics.treesPlanted * 0.7), unit: '' },
            { label: 'Hectares', current: metrics.hectaresContributed, prev: Math.round(metrics.hectaresContributed * 0.7 * 100) / 100, unit: 'ha' },
            { label: 'CO₂', current: metrics.co2OffsetTons, prev: Math.round(metrics.co2OffsetTons * 0.7 * 10) / 10, unit: 't' },
          ].map(item => {
            const growth = item.prev > 0 ? Math.round(((item.current - item.prev) / item.prev) * 100) : 100
            return (
              <div key={item.label} className="text-center">
                <p className="text-xs text-stone-400 mb-2">{item.label}</p>
                <div className="flex items-center justify-center gap-3">
                  <div>
                    <p className="text-xs text-stone-400">2025</p>
                    <p className="text-sm font-medium text-stone-500">{typeof item.prev === 'number' ? item.prev.toLocaleString('fr-BE') : item.prev} {item.unit}</p>
                  </div>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div>
                    <p className="text-xs text-stone-400">2026</p>
                    <p className="text-sm font-bold text-stone-900 dark:text-white">{typeof item.current === 'number' ? item.current.toLocaleString('fr-BE') : item.current} {item.unit}</p>
                  </div>
                </div>
                <p className="text-xs font-semibold text-emerald-500 mt-1">+{growth}%</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden print:hidden">
        <button onClick={() => setShowCertificates(!showCertificates)} className="w-full flex items-center justify-between px-6 py-5 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-stone-900 dark:text-white">Certificats RSE</h2>
              <p className="text-xs text-stone-400">{certificates.filter(c => c.status === 'available').length} certificats disponibles</p>
            </div>
          </div>
          <svg className={`w-5 h-5 text-stone-400 transition-transform ${showCertificates ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>

        {showCertificates && (
          <div className="px-6 pb-5 border-t border-stone-100 dark:border-stone-800 pt-4 space-y-3">
            {certificates.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                <div>
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{cert.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{cert.description}</p>
                </div>
                {cert.status === 'available' ? (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white hover:opacity-90 transition-all" style={{ background: '#5B5781' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" /></svg>
                    Télécharger
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400">En attente</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {[
          { label: 'Projets soutenus', value: metrics.projectsSupported },
          { label: 'Labs atteints', value: metrics.labsReached },
          { label: 'Événements sponsorisés', value: metrics.eventsSponsored },
          { label: 'Arbres prévus', value: metrics.treesPlanned },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
            <div className="text-2xl font-bold text-stone-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-stone-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
