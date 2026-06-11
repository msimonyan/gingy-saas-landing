'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { inertiaScrollTo } from '@/lib/inertia-scroll'
import type { LegalDocument, LegalLang } from '@/lib/legal-content'

const LANG_OPTIONS: { value: LegalLang; label: string }[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
]

const BACK_LABEL: Record<LegalLang, string> = {
  ru: 'На главную',
  en: 'Back to home',
}

export function LegalPage({ document }: { document: LegalDocument }) {
  // Russian is the default language; English is secondary.
  const [lang, setLang] = useState<LegalLang>('ru')
  const content = document[lang]

  // Open at the top and hold there against leftover trackpad momentum. Without
  // this, flinging to the footer and clicking a legal link carries the momentum
  // into this freshly navigated page and scrolls it down to the end of the doc.
  useEffect(() => {
    const cancel = inertiaScrollTo(0, { animate: false })
    return cancel
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {BACK_LABEL[lang]}
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{content.updatedLabel}</p>
          </div>

          {/* Language switch — Russian (default) / English (secondary) */}
          <div className="inline-flex rounded-xl border border-border bg-card p-1" role="group" aria-label="Language">
            {LANG_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLang(option.value)}
                aria-pressed={lang === option.value}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  lang === option.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <article
          className="mt-10 text-[15px] leading-relaxed text-foreground/90
            [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground
            [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground
            [&_p]:my-3
            [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1
            [&_a]:text-primary [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </section>

      <Footer />
    </main>
  )
}
