'use client'

import Script from 'next/script'

export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ace Labador',
    alternateName: 'Christopher Ace Labador',
    description:
      'Certified Software Engineer & Full-Stack Developer based in Meycauayan, Bulacan, Philippines with 4+ years of experience in web development.',
    url: 'https://acelabador.vercel.app',
    image: 'https://acelabador.vercel.app/images/herologo.png',
    email: 'mailto:christopherace.labador@gmail.com',
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Meycauayan',
      addressRegion: 'Bulacan',
      addressCountry: 'Philippines',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'STI College',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express.js',
      'PHP',
      'Python',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'Supabase',
      'Tailwind CSS',
      'Redux',
      'Git',
      'GitHub',
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'UI/UX Design',
      'DevOps',
      'Cloud Computing',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IBM Certifications',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'IBM',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google Certifications',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Meta Certifications',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Meta',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Amazon Web Services Certifications',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Amazon',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'GitHub Certifications',
        credentialCategory: 'Professional Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'GitHub',
        },
      },
    ],
    sameAs: [
      'https://linkedin.com/in/christopherace-labador',
      'https://github.com/Alas-3',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ace Labador Portfolio',
    description:
      'Portfolio website of Ace Labador - Software Developer based in Bulacan, Philippines',
    url: 'https://acelabador.vercel.app',
    author: {
      '@type': 'Person',
      name: 'Ace Labador',
    },
    inLanguage: 'en-PH',
  }

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ace Labador - Freelance Web Developer',
    description:
      'Professional web development services including React, Next.js, Node.js, and full-stack development. Based in Meycauayan, Bulacan, Philippines. Available for freelance projects and full-time opportunities.',
    url: 'https://acelabador.vercel.app',
    telephone: '+63',
    email: 'christopherace.labador@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Meycauayan',
      addressRegion: 'Bulacan',
      addressCountry: 'PH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 14.7569,
      longitude: 120.9603,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Philippines',
      },
      {
        '@type': 'Place',
        name: 'Worldwide (Remote)',
      },
    ],
    serviceType: [
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'React Development',
      'Next.js Development',
      'UI/UX Design',
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  }

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  )
}
