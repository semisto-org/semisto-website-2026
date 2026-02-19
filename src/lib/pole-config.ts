import type { PoleId } from './types'

export const POLE_CONFIG: Record<PoleId, {
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
  gradient: string
}> = {
  'design-studio': {
    name: 'Design Studio',
    description: 'Conception de jardins-forêts sur mesure',
    icon: '✏️',
    color: '#AFBD00',
    bgColor: '#e1e6d8',
    gradient: 'from-lime-500/20 to-lime-600/5'
  },
  'academy': {
    name: 'Academy',
    description: 'Formations et transmission des savoirs',
    icon: '📚',
    color: '#B01A19',
    bgColor: '#eac7b8',
    gradient: 'from-red-500/20 to-red-600/5'
  },
  'nursery': {
    name: 'Pépinière',
    description: 'Plants et arbres pour votre projet',
    icon: '🌱',
    color: '#EF9B0D',
    bgColor: '#fbe6c3',
    gradient: 'from-amber-500/20 to-amber-600/5'
  },
  'roots': {
    name: 'Semisto Roots',
    description: 'Bénévolat et chantiers participatifs',
    icon: '🤝',
    color: '#234766',
    bgColor: '#c9d1d9',
    gradient: 'from-slate-500/20 to-slate-600/5'
  }
}
