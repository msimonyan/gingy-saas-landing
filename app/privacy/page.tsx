import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { privacyPolicy } from '@/lib/legal-content'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Gingy',
  description:
    'Политика конфиденциальности Gingy: какие данные мы собираем, как храним и защищаем их.',
}

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />
}
