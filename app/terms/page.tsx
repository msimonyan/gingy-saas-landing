import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { termsOfService } from '@/lib/legal-content'

export const metadata: Metadata = {
  title: 'Правила использования — Gingy',
  description:
    'Публичная оферта и правила использования SaaS-платформы Gingy.',
}

export default function TermsPage() {
  return <LegalPage document={termsOfService} />
}
