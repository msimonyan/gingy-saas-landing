'use client'

import {
  ClipboardList,
  FileText,
  Package,
  Warehouse,
  Smartphone,
  BarChart3,
  MessageSquare,
  Trophy,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardList,
    title: 'Управление задачами',
    description: 'Ставьте задачи команде, отслеживайте статусы и контролируйте выполнение в реальном времени.',
    color: 'primary',
  },
  {
    icon: FileText,
    title: 'Инструкции и состав',
    description: 'Храните инструкции, составы и рабочие данные по каждому продукту в одном месте.',
    color: 'accent',
  },
  {
    icon: Package,
    title: 'Товары и комплектующие',
    description: 'Контролируйте остатки, размещение и движение товаров и комплектующих по складам.',
    color: 'primary',
  },
  {
    icon: Warehouse,
    title: 'Поставки и склады',
    description: 'Ведите поставки, коробки и складские процессы без ручного хаоса.',
    color: 'accent',
  },
  {
    icon: Smartphone,
    title: 'Мобильное приложение',
    description: 'Сотрудники получают задачи, инструкции и прогресс прямо в мобильном приложении.',
    color: 'accent',
  },
  {
    icon: BarChart3,
    title: 'Аналитика и показатели',
    description: 'Следите за производительностью, выполнением задач и ключевыми операционными метриками.',
    color: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'Коммуникация',
    description: 'Чат и служебные уведомления помогают команде не терять контекст по задачам.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Мотивация команды',
    description: 'Монеты, награды, достижения и внутренний магазин помогают поддерживать вовлеченность.',
    color: 'primary',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-36 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6">
            Возможности
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Все ключевые процессы в одной системе
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
            Gingy закрывает основные задачи складской и производственной операционки:
            от постановки задач до учета остатков и аналитики.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-background rounded-2xl border border-border p-6 lg:p-8 hover:border-primary/30 transition-all duration-500 premium-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${feature.color === 'primary'
                    ? 'bg-primary/10 group-hover:bg-primary/20'
                    : 'bg-accent/10 group-hover:bg-accent/20'
                  }`}>
                  <feature.icon className={`w-7 h-7 ${feature.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
