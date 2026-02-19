export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            {/* Ground */}
            <ellipse cx="100" cy="170" rx="80" ry="10" fill="#d6d3d1" opacity="0.3" />
            {/* Lost tree stump */}
            <rect x="85" y="130" width="30" height="40" rx="4" fill="#78716c" />
            <rect x="80" y="125" width="40" height="10" rx="5" fill="#57534e" />
            {/* Question marks floating */}
            <text x="60" y="100" fontSize="28" fill="#AFBD00" opacity="0.6" className="animate-bounce" style={{animationDelay:'0s'}}>?</text>
            <text x="120" y="80" fontSize="22" fill="#5B5781" opacity="0.5" className="animate-bounce" style={{animationDelay:'0.3s'}}>?</text>
            <text x="90" y="60" fontSize="34" fill="#EF9B0D" opacity="0.7" className="animate-bounce" style={{animationDelay:'0.6s'}}>?</text>
            {/* Small sprout */}
            <path d="M100 130 Q100 115 110 105" stroke="#AFBD00" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="114" cy="102" rx="8" ry="6" fill="#AFBD00" opacity="0.8" transform="rotate(-30 114 102)" />
          </svg>
        </div>

        <h1 className="text-7xl font-black text-stone-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          404
        </h1>
        <h2 className="text-2xl font-bold text-stone-700 dark:text-stone-300 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Cette page n'a pas encore germé
        </h2>
        <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
          La page que vous cherchez semble ne pas exister. Comme un arbre déraciné, elle a peut-être été déplacée ou supprimée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" className="px-8 py-3.5 rounded-xl bg-[#5B5781] text-white font-semibold hover:bg-[#4a4670] transition-all hover:scale-105">
            Retour à l'accueil
          </a>
          <a href="/blog" className="px-8 py-3.5 rounded-xl border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all">
            Explorer le blog
          </a>
        </div>
      </div>
    </div>
  )
}
