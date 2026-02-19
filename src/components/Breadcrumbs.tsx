interface Crumb {
  label: string
  href?: string
}

interface Props {
  items: Crumb[]
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-stone-500 dark:text-stone-400">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <a href="/" className="hover:text-[#5B5781] transition-colors">Semisto</a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {item.href ? (
              <a href={item.href} className="hover:text-[#5B5781] transition-colors">{item.label}</a>
            ) : (
              <span className="text-stone-900 dark:text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
