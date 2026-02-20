import type { Partner, Package, Engagement, FundingProposal, Funding, ImpactMetrics } from './portal-types'
import data from '../data/partner-portal-data.json'

export function getPartner(): Partner {
  return data.partner as Partner
}

export function getPackages(): Package[] {
  return data.packages as Package[]
}

export function getPackageById(id: string): Package | undefined {
  return (data.packages as Package[]).find(p => p.id === id)
}

export function getEngagements(): Engagement[] {
  return data.engagements as Engagement[]
}

export function getEngagementById(id: string): Engagement | undefined {
  return (data.engagements as Engagement[]).find(e => e.id === id)
}

export function getFundingProposals(): FundingProposal[] {
  return data.fundingProposals as FundingProposal[]
}

export function getFundingProposalById(id: string): FundingProposal | undefined {
  return (data.fundingProposals as FundingProposal[]).find(p => p.id === id)
}

export function getFundings(): Funding[] {
  return data.fundings as Funding[]
}

export function getImpactMetrics(): ImpactMetrics {
  return data.impactMetrics as ImpactMetrics
}
