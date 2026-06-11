'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { SectionLink } from '@/components/landing/section-link'

const navigation = [
  { name: 'Возможности', section: 'features' },
  { name: 'Как это работает', section: 'how-it-works' },
  { name: 'Интеграции', section: 'integrations' },
  { name: 'Тарифы', section: 'pricing' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-card/95 backdrop-blur-lg shadow-sm border-b border-border'
          : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-1 group">
            <Image
              src="/images/gingy-logo.png"
              alt="Gingy Logo"
              width={140}
              height={48}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Открыть меню</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <SectionLink
              key={item.name}
              section={item.section}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </SectionLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            asChild
            className="font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <SectionLink section="pricing">Выбрать тариф</SectionLink>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-card/95 backdrop-blur-lg border-b border-border">
          <div className="space-y-1 px-6 py-4">
            {navigation.map((item) => (
              <SectionLink
                key={item.name}
                section={item.section}
                className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </SectionLink>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button asChild className="w-full justify-center shadow-lg shadow-primary/25">
                <SectionLink section="pricing" onClick={() => setMobileMenuOpen(false)}>
                  Выбрать тариф
                </SectionLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
