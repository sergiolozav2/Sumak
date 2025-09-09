import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { TRPCRouter } from '@/integrations/trpc/router'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

interface MyRouterContext {
  queryClient: QueryClient

  trpc: TRPCOptionsProxy<TRPCRouter>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Sumak - Revolucionando la Educación en América Latina con IA',
      },
      // Meta descripción
      {
        name: 'description',
        content:
          'Plataforma educativa con inteligencia artificial que personaliza el aprendizaje para cada estudiante en América Latina. Reduce la deserción escolar y transforma vidas a través de experiencias inmersivas.',
      },
      {
        name: 'keywords',
        content:
          'educación, inteligencia artificial, EdTech, América Latina, Bolivia, aprendizaje personalizado, deserción escolar, plataforma educativa, IA educativa',
      },
      {
        name: 'author',
        content: 'Sumak',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        name: 'language',
        content: 'Spanish',
      },

      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:logo',
        content: '/logo.jpeg',
      },
      {
        property: 'og:title',
        content: 'Sumak - Revolucionando la Educación con IA',
      },
      {
        property: 'og:description',
        content:
          'Transformamos la educación en América Latina con IA personalizada. Reduce la deserción escolar del 40% y mejora la comprensión lectora del 60%. ¡Prueba gratuita por 30 días!',
      },
      {
        property: 'og:image',
        content: '/logo.jpeg',
      },
      {
        property: 'og:url',
        content: 'https://eduverso-inteligente.com',
      },
      {
        property: 'og:site_name',
        content: 'Sumak',
      },
      {
        property: 'og:locale',
        content: 'es_ES',
      },

      // Twitter Card
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Sumak - Educación con IA para América Latina',
      },
      {
        name: 'twitter:description',
        content:
          'Plataforma educativa que usa IA para personalizar el aprendizaje. Reduce deserción escolar y mejora resultados académicos. 30 días gratis.',
      },
      {
        name: 'twitter:image',
        content: '/logo.jpeg',
      },
      {
        name: 'twitter:creator',
        content: '@eduverso',
      },

      // Theme colors
      {
        name: 'theme-color',
        content: '#4f46e5',
      },
      {
        name: 'msapplication-TileColor',
        content: '#4f46e5',
      },

      // Mobile specific
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Eduverso',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      // Favicon
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/logo.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/logo.png',
      },
      // Apple Touch Icons
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/logo.png',
      },
      // Manifest
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      // Preconnect for performance
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      // Canonical URL
      {
        rel: 'canonical',
        href: 'https://sumak.netlify.app',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sumak',
    description:
      'Plataforma educativa con inteligencia artificial que personaliza el aprendizaje para cada estudiante en América Latina',
    url: 'https://sumak.netlify.app',
    logo: 'https://sumak.netlify.app/logo.jpeg',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '2.00',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
    },
    creator: {
      '@type': 'Organization',
      name: 'Sumak',
      url: 'https://sumak.netlify.app',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '200',
    },
    featureList: [
      'Inteligencia Artificial Personalizada',
      'Experiencias Inmersivas',
      'Pedagogías Integradas',
      'Accesibilidad Total',
      'Analytics Avanzados',
      'Integración Escolar',
    ],
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sumak',
    url: 'https://sumak.netlify.app',
    logo: 'https://sumak.netlify.app/logo.jpeg',
    description:
      'Revolucionando la educación en América Latina a través de la inteligencia artificial y experiencias de aprendizaje personalizadas',
    foundingDate: '2025',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Bolivia',
      },
      {
        '@type': 'Place',
        name: 'América Latina',
      },
    ],
    sameAs: [
      'https://www.instagram.com/sumakedu',
      'https://www.linkedin.com/company/sumak-education',
    ],
  }

  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData),
          }}
        />
      </head>
      <body data-theme="cmyk">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
