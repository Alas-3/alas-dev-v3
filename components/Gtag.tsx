"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Gtag() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const path = pathname ?? '/'
    const search = searchParams?.toString()
    const pagePath = search ? `${path}?${search}` : path

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    })
  }, [pathname, searchParams])

  return null
}
