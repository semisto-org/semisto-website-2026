import { PartnerPortal } from './PartnerPortal'
import type { Partner, Package, Engagement, FundingProposal, Funding, ImpactMetrics } from '../../lib/portal-types'

interface PortalAppProps {
  partner: Partner
  packages: Package[]
  engagements: Engagement[]
  fundingProposals: FundingProposal[]
  fundings: Funding[]
  impactMetrics: ImpactMetrics
}

export function PortalApp(props: PortalAppProps) {
  return (
    <PartnerPortal
      {...props}
      onExportPdf={() => window.print()}
      onContactSemisto={() => { window.location.href = '/portal/contact/' }}
      onPackageInterest={(id) => alert(`Intérêt marqué pour le package ${id} ! Semisto vous contactera bientôt.`)}
      onPackageView={(id) => { window.location.href = `/portal/packages/${id}/` }}
      onFundProposal={(id, amount) => alert(`Financement de ${amount}€ alloué au projet ${id} !`)}
      onProposalView={(id) => { window.location.href = `/portal/funding/${id}/` }}
      onEngagementView={(id) => { window.location.href = `/portal/engagements/${id}/` }}
      onDocumentDownload={(id) => alert(`Téléchargement du document ${id} (mockup)`)}
    />
  )
}
