import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SectionLink } from '@/components/landing/section-link'

export function CtaSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative bg-primary rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              Соберите процессы в одной системе
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Gingy помогает управлять задачами, складами, поставками, сотрудниками и
              аналитикой без разрозненных таблиц и ручной координации.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="gap-2 bg-white text-primary hover:bg-white/90"
              >
                <SectionLink section="pricing">
                  Выбрать тариф
                  <ArrowRight className="w-4 h-4" />
                </SectionLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 bg-transparent border-primary-foreground/40 text-white hover:bg-primary-foreground/10 hover:text-white"
              >
                <SectionLink section="pricing">Посмотреть тарифы</SectionLink>
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              Подключение через панель Gingy.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  )
}
