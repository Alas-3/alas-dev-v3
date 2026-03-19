"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Gtag() {
  const pathname = usePathname()

  useEffect(() => {
    const path = pathname ?? '/'
    const search = typeof window !== 'undefined' ? window.location.search : ''
    const pagePath = search ? `${path}?${search}` : path

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    })
  }, [pathname])

  return null
}
