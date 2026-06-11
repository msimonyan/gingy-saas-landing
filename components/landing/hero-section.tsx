'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SectionLink } from '@/components/landing/section-link'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32">
      {/* Premium background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/8 via-accent/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2E7D6B08_1px,transparent_1px),linear-gradient(to_bottom,#2E7D6B08_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary mb-8 hover:bg-primary/15 transition-colors cursor-default">
                <Sparkles className="h-4 w-4" />
                <span>Панель и мобильное приложение для сотрудников</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            </div>

            <h1
              className={`text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-[1.1] transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Управляйте складом, поставками и задачами{' '}
              <span className="gradient-text">без хаоса</span>
            </h1>

            <p
              className={`mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Gingy объединяет товары, комплектующие, склады, поставки, задачи и команду
              в одной системе. Руководители видят процессы в панели, а сотрудники
              получают задания и инструкции в мобильном приложении.
            </p>

            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <Button
                size="lg"
                asChild
                className="gap-2 h-14 px-8 text-base font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <SectionLink section="pricing">
                  Выбрать тариф
                  <ArrowRight className="h-5 w-5" />
                </SectionLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 h-14 px-8 text-base font-semibold border-2 hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <SectionLink section="how-it-works">
                  <Play className="h-5 w-5" />
                  Как это работает
                </SectionLink>
              </Button>
            </div>

            {/* Trust indicators */}
            <div
              className={`mt-12 pt-10 border-t border-border transition-all duration-700 ease-out delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-3 border-card flex items-center justify-center text-sm font-bold text-primary shadow-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Задачи, склад и аналитика в одной системе
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Для руководителей, кладовщиков и производственных команд
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div
            className={`relative transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />

      {/* Main dashboard card */}
      <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden premium-card">
        {/* Dashboard header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg">Панель Gingy</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/10">
              <div className="text-3xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground mt-1">Активных задач</div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/10">
              <div className="text-3xl font-bold text-accent">24</div>
              <div className="text-sm text-muted-foreground mt-1">Сотрудников онлайн</div>
            </div>
            <div className="bg-gradient-to-br from-muted to-muted/50 rounded-xl p-4 border border-border">
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Выполнение</div>
            </div>
          </div>

          {/* Task list preview */}
          <div className="space-y-3">
            {[
              { task: 'Собрать комплект продукции', status: 'В работе', urgent: true },
              { task: 'Принять поставку на склад', status: 'Ожидает', urgent: false },
              { task: 'Проверить остатки в ячейке B2', status: 'Ожидает', urgent: false },
            ].map((item, i) => (
              <div
                key={item.task}
                className="flex items-center gap-4 bg-muted/50 rounded-xl px-4 py-3.5 border border-border/50 hover:border-primary/30 hover:bg-muted transition-all cursor-pointer"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${item.urgent ? 'bg-accent animate-pulse' : 'bg-primary'}`} />
                <span className="text-sm font-medium text-foreground flex-1">{item.task}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${item.urgent
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'bg-muted text-muted-foreground'
                  }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile app floating card */}
      <div className="absolute -bottom-8 -left-8 w-52 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-float premium-card">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 flex items-center gap-2 border-b border-border">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground">Приложение сотрудника</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
              <span className="text-base font-bold text-accent">3</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Новые задачи</div>
              <div className="text-xs text-muted-foreground">Откройте, чтобы посмотреть</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Прогресс за день</span>
              <span className="font-semibold text-primary">75%</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg border border-border px-4 py-2.5 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold text-foreground">Синхронизация в реальном времени</span>
      </div>

      {/* Mascot with actual logo */}
      <div className="absolute top-16 -right-6 w-16 h-16 animate-float" style={{ animationDelay: '0.5s' }}>
        <Image
          src="/images/gingy-logo.png"
          alt="Логотип Gingy"
          width={64}
          height={64}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
    </div>
  )
}
