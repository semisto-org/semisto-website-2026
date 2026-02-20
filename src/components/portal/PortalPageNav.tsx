/**
 * Standalone navigation for portal detail pages (Astro routes).
 * Uses PortalNavigation with window.location navigation.
 */
import { PortalNavigation } from './PortalNavigation'

interface PortalPageNavProps {
  activePage: string
  partnerName?: string
  partnerInitials?: string
}

const pageRoutes: Record<string, string> = {
  dashboard: '/portal/',
  packages: '/portal/packages/',
  funding: '/portal/funding/',
  engagements: '/portal/engagements/',
  impact: '/portal/impact/',
  contact: '/portal/contact/',
}

export function PortalPageNav({ activePage, partnerName, partnerInitials }: PortalPageNavProps) {
  const handleNavigate = (page: string) => {
    const route = pageRoutes[page] || '/portal/'
    window.location.href = route
  }

  return (
    <PortalNavigation
      activePage={activePage}
      onNavigate={handleNavigate}
      partnerName={partnerName}
      partnerInitials={partnerInitials}
    />
  )
}
