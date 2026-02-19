import { useState } from 'react'
import type { Course } from '../lib/types'
import { Breadcrumbs } from './Breadcrumbs'

interface Props {
  course: Course
  labSlug?: string
  relatedCourses?: Course[]
}

export default function CourseDetail({ course, labSlug, relatedCourses = [] }: Props) {
  const [showRegistration, setShowRegistration] = useState(false)
  const spotsPercent = (course.spotsAvailable / course.spotsTotal) * 100
  const isAlmostFull = spotsPercent < 25

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Formations', href: labSlug ? \`/\${labSlug}/academy/\` : '/' }, { label: course.title }]} />
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B01A19] text-white">{course.format}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">{course.level}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">{course.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{course.title}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{course.shortDescription}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>À propos de cette formation</h2>
              <div className="prose prose-stone dark:prose-invert max-w-none">
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Instructors */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Formateur{course.instructors.length > 1 ? 's' : ''}</h2>
              <div className="flex flex-wrap gap-4">
                {course.instructors.map(name => (
                  <div key={name} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800">
                    <div className="w-12 h-12 rounded-full bg-[#B01A19]/10 flex items-center justify-center text-[#B01A19] font-bold text-lg">
                      {name.charAt(0)}
                    </div>
                    <span className="font-medium text-stone-900 dark:text-white">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-stone-900 dark:text-white">{course.price}€</span>
                  <p className="text-sm text-stone-500 mt-1">{course.duration}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-stone-700 dark:text-stone-300">
                      Prochaine session : <strong>{new Date(course.nextSession).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                    </span>
                  </div>
                  {course.location && (
                    <div className="flex items-center gap-3 text-sm">
                      <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      <span className="text-stone-700 dark:text-stone-300">{course.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className={`text-stone-700 dark:text-stone-300 ${isAlmostFull ? 'text-red-600 font-semibold' : ''}`}>
                      {course.spotsAvailable} places disponibles sur {course.spotsTotal}
                    </span>
                  </div>
                </div>

                {/* Spots bar */}
                <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mb-6">
                  <div className="h-full rounded-full transition-all" style={{ width: `${100 - spotsPercent}%`, backgroundColor: isAlmostFull ? '#ef4444' : '#B01A19' }} />
                </div>

                <button onClick={() => setShowRegistration(true)} disabled={course.spotsAvailable === 0}
                  className="w-full py-4 rounded-xl bg-[#B01A19] text-white font-bold text-lg hover:bg-[#8e1514] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50">
                  {course.spotsAvailable === 0 ? 'Complet' : "S'inscrire"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Formations similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.slice(0, 3).map(c => (
                <a key={c.id} href={`/academy/${c.slug}`} className="group block rounded-2xl overflow-hidden bg-stone-50 dark:bg-stone-800 hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden"><img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-4">
                    <h4 className="font-bold text-stone-900 dark:text-white group-hover:text-[#B01A19] transition-colors">{c.title}</h4>
                    <p className="text-sm text-stone-500 mt-1">{c.duration} · {c.price}€</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
