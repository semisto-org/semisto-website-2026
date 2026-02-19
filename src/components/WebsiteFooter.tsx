import { useState } from 'react'
import type { Lab } from '../lib/types'

interface Props {
  labs: Lab[]
  currentLab?: Lab
}

export default function WebsiteFooter({ labs, currentLab }: Props) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  const footerLinks = [
    { title: 'Découvrir', links: [
      { label: 'À propos', href: '/about' },
      { label: 'Nos Labs', href: '/labs' },
      { label: 'Projets', href: '/projects' },
      { label: 'Impact', href: '/impact' },
      { label: 'Presse', href: '/press' },
    ]},
    { title: 'Participer', links: [
      { label: 'Formations', href: '/academy' },
      { label: 'Événements', href: '/events' },
      { label: 'Bénévolat', href: '/roots' },
      { label: 'Faire un don', href: '/donate' },
      { label: 'Boutique', href: '/shop' },
    ]},
    { title: 'Ressources', links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Fiches pratiques', href: '/resources' },
      { label: 'Design Studio', href: '/design-studio' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ]},
  ]

  return (
    <footer className="bg-stone-900 dark:bg-black text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Restez connecté à la nature
              </h3>
              <p className="text-stone-400">
                Conseils, événements et nouvelles du mouvement Semisto, deux fois par mois.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3 text-[#AFBD00] font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Bienvenue dans la communauté !
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-5 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-[#AFBD00] transition-colors"
                />
                <button type="submit" className="px-6 py-3 rounded-xl bg-[#AFBD00] text-stone-900 font-semibold hover:bg-[#c4d300] transition-colors whitespace-nowrap">
                  S'abonner
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#AFBD00] to-[#2D5016] flex items-center justify-center text-white font-bold text-lg">S</div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Semisto</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-sm">
              Réseau européen de jardins-forêts. Nous concevons, plantons et transmettons les savoirs pour régénérer nos territoires.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {['facebook', 'instagram', 'youtube'].map(social => (
                <a key={social} href={`https://${social}.com/semisto`} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#5B5781] flex items-center justify-center text-stone-400 hover:text-white transition-all hover:scale-110">
                  {social === 'facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                  {social === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>}
                  {social === 'youtube' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="text-stone-400 hover:text-white text-sm transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">© {new Date().getFullYear()} Semisto ASBL. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-xs text-stone-500">
            <a href="/legal" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="/privacy" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
