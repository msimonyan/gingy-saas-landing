import Link from 'next/link'

const navigation = {
  product: [
    { name: 'Возможности', href: '#features' },
    { name: 'Как это работает', href: '#how-it-works' },
    { name: 'Интеграции', href: '#integrations' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          {/* Logo and company */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <GingyLogo className="h-8 w-8" />
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

function GingyLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="8" fill="#2E7D6B" />
      <path
        d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"
        fill="#F29B38"
      />
      <circle cx="15" cy="17" r="2" fill="white" />
      <circle cx="25" cy="17" r="2" fill="white" />
      <path
        d="M15 24c0 0 2 3 5 3s5-3 5-3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
