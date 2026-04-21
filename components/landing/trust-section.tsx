import { Activity, Smartphone, Eye, Building2 } from 'lucide-react'

const badges = [
  {
    icon: Activity,
    title: 'Операции в реальном времени',
    description: 'Актуальный статус задач и поставок',
  },
  {
    icon: Smartphone,
    title: 'Мобильное приложение',
    description: 'Задачи и инструкции для сотрудников',
  },
  {
    icon: Eye,
    title: 'Прозрачный учет остатков',
    description: 'Контроль товаров и комплектующих',
  },
  {
    icon: Building2,
    title: 'Поддержка нескольких складов',
    description: 'Работа по локациям и складам',
  },
]

export function TrustSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <badge.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{badge.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
