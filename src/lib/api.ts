/**
 * Data layer — fetch from Terranova API with fallback to sample-data.json
 */
import type {
  Lab, Course, Event, Project, Product, Article,
  Worksite, ImpactStats, MapProject, PotentialZone,
  DesignProfile, PressItem, Resource
} from './types'
import sampleData from '../data/sample-data.json'

const API_BASE = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api/v1'
const USE_API = import.meta.env.PUBLIC_USE_API === 'true'

async function fetchAPI<T>(path: string): Promise<T | null> {
  if (!USE_API) return null
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) return null
    return await res.json() as T
  } catch {
    return null
  }
}

function fallback<T>(key: keyof typeof sampleData): T {
  return (sampleData as Record<string, unknown>)[key] as T
}

// Labs
export async function getLabs(): Promise<Lab[]> {
  return (await fetchAPI<Lab[]>('/website/labs')) ?? fallback<Lab[]>('labs')
}

export async function getLabBySlug(slug: string): Promise<Lab | undefined> {
  const labs = await getLabs()
  return labs.find(l => l.slug === slug)
}

export async function getLabSlugs(): Promise<string[]> {
  const labs = await getLabs()
  return labs.map(l => l.slug)
}

// Courses
export async function getCourses(labId?: string): Promise<Course[]> {
  const all = (await fetchAPI<Course[]>('/website/courses')) ?? fallback<Course[]>('courses')
  return labId ? all.filter(c => c.labId === labId) : all
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const all = await getCourses()
  return all.find(c => c.slug === slug)
}

// Events
export async function getEvents(labId?: string): Promise<Event[]> {
  const all = (await fetchAPI<Event[]>('/website/events')) ?? fallback<Event[]>('events')
  return labId ? all.filter(e => e.labId === labId) : all
}

// Projects
export async function getProjects(labId?: string): Promise<Project[]> {
  const all = (await fetchAPI<Project[]>('/website/projects')) ?? fallback<Project[]>('projects')
  return labId ? all.filter(p => p.labId === labId) : all
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects()
  return all.find(p => p.slug === slug)
}

// Articles
export async function getArticles(labId?: string): Promise<Article[]> {
  const all = (await fetchAPI<Article[]>('/website/articles')) ?? fallback<Article[]>('articles')
  return labId ? all.filter(a => a.labId === labId) : all
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getArticles()
  return all.find(a => a.slug === slug)
}

// Products
export async function getProducts(country?: string): Promise<Product[]> {
  const all = (await fetchAPI<Product[]>('/website/products')) ?? fallback<Product[]>('products')
  return country ? all.filter(p => p.countries.includes(country)) : all
}

// Worksites
export async function getWorksites(labId?: string): Promise<Worksite[]> {
  const all = (await fetchAPI<Worksite[]>('/website/worksites')) ?? fallback<Worksite[]>('worksites')
  return labId ? all.filter(w => w.labId === labId) : all
}

// Impact Stats
export async function getImpactStats(): Promise<ImpactStats> {
  return (await fetchAPI<ImpactStats>('/website/impact')) ?? fallback<ImpactStats>('impactStats')
}

// Map
export async function getMapProjects(): Promise<MapProject[]> {
  return (await fetchAPI<MapProject[]>('/website/map/projects')) ?? fallback<MapProject[]>('mapProjects')
}

export async function getPotentialZones(): Promise<PotentialZone[]> {
  return (await fetchAPI<PotentialZone[]>('/website/map/zones')) ?? fallback<PotentialZone[]>('potentialZones')
}

// Design Profiles
export async function getDesignProfiles(): Promise<DesignProfile[]> {
  return (await fetchAPI<DesignProfile[]>('/website/design-profiles')) ?? fallback<DesignProfile[]>('designProfiles')
}

// Press
export async function getPressItems(): Promise<PressItem[]> {
  return (await fetchAPI<PressItem[]>('/website/press')) ?? fallback<PressItem[]>('pressItems')
}

// Resources
export async function getResources(): Promise<Resource[]> {
  return (await fetchAPI<Resource[]>('/website/resources')) ?? fallback<Resource[]>('resources')
}
