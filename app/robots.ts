import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: 'https://acelabador.vercel.app/sitemap.xml',
    host: 'https://acelabador.vercel.app',
  }
}
