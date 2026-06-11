import Link from 'next/link'
import Image from 'next/image'
import { SectionLink } from '@/components/landing/section-link'

const navigation = {
  product: [
    { name: 'Возможности', section: 'features' },
    { name: 'Как это работает', section: 'how-it-works' },
    { name: 'Интеграции', section: 'integrations' },
    { name: 'Тарифы', section: 'pricing' },
    { name: 'FAQ', section: 'faq' },
  ],
  legal: [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Правила использования', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Logo and company */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icon.svg"
                alt="Gingy"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-xl font-bold text-white">Gingy</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Система для управления задачами, складами, поставками, товарами и
              командой в одном рабочем контуре.
            </p>
            <p className="mt-4 text-sm text-gray-500">Aparg LLC</p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Навигация</h3>
            <ul className="mt-4 space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <SectionLink
                    section={item.section}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Документы</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Gingy by Aparg LLC
          </p>
        </div>
      </div>
    </footer>
  )
}
