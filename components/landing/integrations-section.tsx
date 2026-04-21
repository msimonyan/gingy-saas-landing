import { ArrowRight } from 'lucide-react'

const integrations = [
  {
    name: 'Wildberries',
    description: 'Данные по товарам и рабочим сценариям',
    logo: WildberriesLogo,
  },
  {
    name: 'Moi Sklad',
    description: 'Синхронизация складского учета',
    logo: MoiSkladLogo,
  },
  {
    name: 'YooKassa',
    description: 'Оплата подписки и биллинг',
    logo: YooKassaLogo,
  },
]

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Интеграции
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Подключайте нужные внешние сервисы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            В текущем продукте уже есть интеграции для складского учета, товарных
            сценариев и SaaS-биллинга.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="group bg-card rounded-2xl border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <integration.logo className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{integration.name}</h3>
              <p className="text-muted-foreground">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Посмотреть тарифы и подключение
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function WildberriesLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#CB11AB" />
      <path
        d="M12 16L16 32H20L24 22L28 32H32L36 16H32L30 26L26 16H22L18 26L16 16H12Z"
        fill="white"
      />
    </svg>
  )
}

function MoiSkladLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#FF9900" />
      <rect x="12" y="20" width="10" height="16" rx="2" fill="white" />
      <rect x="26" y="12" width="10" height="24" rx="2" fill="white" />
    </svg>
  )
}

function YooKassaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="8" fill="#0055FF" />
      <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="3" fill="none" />
      <path
        d="M20 24L23 27L28 21"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
