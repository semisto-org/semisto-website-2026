import { useState, useEffect } from 'react'

// =============================================================================
// 404 NOT FOUND — Fun, on-brand forest illustration, helpful links
// =============================================================================

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D5016] via-[#3a6b1e] to-[#1a3009] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10c-15 22-45 37-45 65 0 18 20 27 45 27s45-9 45-27c0-28-30-43-45-65z' fill='white' fill-opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }} />

      {/* Floating leaves with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { emoji: '🍃', size: 'text-3xl', left: '10%', top: '20%', delay: 0 },
          { emoji: '🌿', size: 'text-2xl', left: '80%', top: '15%', delay: 1.5 },
          { emoji: '🍂', size: 'text-4xl', left: '25%', top: '70%', delay: 3 },
          { emoji: '🌱', size: 'text-2xl', left: '70%', top: '75%', delay: 0.8 },
          { emoji: '🍃', size: 'text-xl', left: '50%', top: '10%', delay: 2.2 },
          { emoji: '🌿', size: 'text-3xl', left: '90%', top: '50%', delay: 4 },
        ].map((leaf, i) => (
          <div
            key={i}
            className={`absolute ${leaf.size} opacity-20`}
            style={{
              left: leaf.left,
              top: leaf.top,
              animation: `float-leaf ${6 + i}s ease-in-out ${leaf.delay}s infinite`,
              transform: `translate(${(mousePos.x - 0.5) * (10 + i * 5)}px, ${(mousePos.y - 0.5) * (10 + i * 5)}px)`
            }}
          >
            {leaf.emoji}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={`relative text-center max-w-lg transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Forest illustration */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
            {/* Ground with grass */}
            <ellipse cx="150" cy="260" rx="120" ry="15" fill="#1a3009" opacity="0.5" />

            {/* Back trees */}
            <g opacity="0.3">
              <path d="M60 260 L60 180 L40 200 L60 160 L45 175 L60 140 L75 175 L60 160 L80 200Z" fill="#4a7a2a" />
              <path d="M230 260 L230 190 L210 210 L230 170 L215 185 L230 150 L245 185 L230 170 L250 210Z" fill="#4a7a2a" />
            </g>

            {/* Main tree - lost */}
            <g>
              {/* Trunk */}
              <rect x="135" y="200" width="30" height="60" rx="5" fill="#5c4a3a" />
              <rect x="128" y="195" width="44" height="12" rx="6" fill="#4a3a2a" />

              {/* Tree rings on stump */}
              <ellipse cx="150" cy="198" rx="16" ry="3" fill="none" stroke="#6b5a4a" strokeWidth="1" />
              <ellipse cx="150" cy="198" rx="10" ry="2" fill="none" stroke="#6b5a4a" strokeWidth="1" />
              <circle cx="150" cy="198" r="3" fill="#6b5a4a" />

              {/* Small sprout growing from stump */}
              <path d="M155 195 Q158 175 170 165" stroke="#AFBD00" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <ellipse cx="174" cy="161" rx="10" ry="7" fill="#AFBD00" opacity="0.9" transform="rotate(-30 174 161)" />
              <path d="M155 195 Q148 180 138 175" stroke="#AFBD00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="134" cy="172" rx="7" ry="5" fill="#AFBD00" opacity="0.7" transform="rotate(20 134 172)" />
            </g>

            {/* Question marks floating */}
            <text x="85" y="130" fontSize="36" fill="#AFBD00" opacity="0.7" fontWeight="bold">
              <animate attributeName="y" values="130;120;130" dur="3s" repeatCount="indefinite" />
              ?
            </text>
            <text x="190" y="110" fontSize="28" fill="#5B5781" opacity="0.6" fontWeight="bold">
              <animate attributeName="y" values="110;100;110" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
              ?
            </text>
            <text x="140" y="85" fontSize="42" fill="#EF9B0D" opacity="0.8" fontWeight="bold">
              <animate attributeName="y" values="85;72;85" dur="3.5s" begin="1s" repeatCount="indefinite" />
              ?
            </text>

            {/* Small mushrooms */}
            <g transform="translate(90, 250)">
              <rect x="0" y="0" width="4" height="8" rx="2" fill="#c8a882" />
              <ellipse cx="2" cy="0" rx="6" ry="4" fill="#b01a19" opacity="0.7" />
              <circle cx="-1" cy="-1" r="1" fill="white" opacity="0.8" />
              <circle cx="4" cy="1" r="0.7" fill="white" opacity="0.8" />
            </g>
            <g transform="translate(200, 252)">
              <rect x="0" y="0" width="3" height="6" rx="1.5" fill="#c8a882" />
              <ellipse cx="1.5" cy="0" rx="5" ry="3" fill="#EF9B0D" opacity="0.7" />
            </g>

            {/* Fireflies */}
            <circle cx="100" cy="160" r="2" fill="#AFBD00">
              <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="140" r="1.5" fill="#AFBD00">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-black text-white/90 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          4
          <span className="inline-block animate-pulse text-[#AFBD00]">0</span>
          4
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Cette page n'a pas encore germé
        </h2>

        <p className="text-white/60 mb-10 leading-relaxed max-w-md mx-auto">
          Comme une graine en attente, cette page n'existe pas encore. Mais ne vous inquiétez pas — il y a plein de belles choses à découvrir dans notre forêt !
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="/" className="px-8 py-3.5 rounded-xl bg-[#AFBD00] text-stone-900 font-bold hover:bg-[#c4d300] transition-all hover:scale-105 shadow-lg shadow-[#AFBD00]/25">
            🏠 Retour à l'accueil
          </a>
          <a href="/resources/" className="px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
            📖 Explorer le blog
          </a>
        </div>

        {/* Helpful links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/shop/', icon: '🌿', label: 'Boutique' },
            { href: '/resources/', icon: '🎓', label: 'Ressources' },
            { href: '/map/', icon: '🗺️', label: 'Carte' },
            { href: '/contact/', icon: '📬', label: 'Contact' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-all hover:scale-105 flex flex-col items-center gap-1"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-leaf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(8px) rotate(-3deg); }
        }
      `}</style>
    </div>
  )
}
