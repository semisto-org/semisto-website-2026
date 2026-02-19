/**
 * SEO utilities — JSON-LD structured data generators
 */
import type { Lab, Course, Event, Article, Product, Project } from './types'

const SITE_URL = 'https://semisto.org'
const ORG_NAME = 'Semisto'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: 'Réseau européen de Labs transformant les zones anthropisées en forêts comestibles.',
    sameAs: [
      'https://facebook.com/semisto',
      'https://instagram.com/semisto',
      'https://youtube.com/@semisto',
    ],
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function courseJsonLd(course: Course, lab: Lab) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: lab.name,
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency,
      availability: course.spotsAvailable > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
    },
    courseMode: course.format === 'en ligne' ? 'online' : 'onsite',
    educationalLevel: course.level,
  }
}

export function eventJsonLd(event: Event, lab: Lab) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: event.address,
    },
    organizer: {
      '@type': 'Organization',
      name: lab.name,
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: event.currency,
    },
  }
}

export function articleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    image: article.image,
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
    },
  }
}

export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }
}

export interface MetaTags {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
}

export function buildMetaTags(meta: MetaTags) {
  const tags = {
    title: `${meta.title} | Semisto`,
    description: meta.description,
    ogTitle: meta.title,
    ogDescription: meta.description,
    ogImage: meta.image || `${SITE_URL}/images/og-default.jpg`,
    ogUrl: meta.url || SITE_URL,
    ogType: meta.type || 'website',
    twitterCard: 'summary_large_image' as const,
  }
  return tags
}
