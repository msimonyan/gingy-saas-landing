'use client'

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { inertiaScrollTo } from '@/lib/inertia-scroll'

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Target section id on the home page (without the leading #). */
  section: string
}

/** Matches `scroll-margin-top: 6rem` so the section clears the fixed header. */
const SCROLL_OFFSET = 96

/**
 * Scroll to a section with the inertia-proof JS animation (see lib/inertia-scroll).
 * Returns false if the section isn't on the current page, so the caller can fall
 * back to native `<a href="/#section">` navigation.
 */
function smoothScrollToSection(section: string): boolean {
  const el = document.getElementById(section)
  if (!el) return false
  const targetY = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
  inertiaScrollTo(targetY, { animate: true })
  return true
}

/**
 * Link to a home-page section. Renders an `/#section` anchor.
 *
 * - On the home page it hijacks the click and runs an inertia-proof JS scroll.
 * - On any other page (e.g. /privacy) it falls back to the plain anchor, which
 *   navigates home and lets the browser scroll to the section on load.
 */
export const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(
  function SectionLink({ section, onClick, ...props }, ref) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event)
      if (event.defaultPrevented) return
      // Let the browser handle modified clicks (new tab, etc.) and cross-page
      // navigation natively.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
      if (window.location.pathname !== '/') return

      if (smoothScrollToSection(section)) {
        event.preventDefault()
        history.pushState(null, '', `/#${section}`)
      }
    }

    return <a ref={ref} href={`/#${section}`} onClick={handleClick} {...props} />
  },
)
