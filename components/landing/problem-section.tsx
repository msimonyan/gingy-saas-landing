import { X, Check, ArrowRight } from 'lucide-react'

const problems = [
  'Непонятно, кто и что делает прямо сейчас',
  'Поставки, задачи и остатки ведутся в разных местах',
  'Ошибки в товарах, комплектующих и перемещениях',
  'Инструкции и статусы теряются в чатах',
  'У руководителя нет целостной картины по складу и команде',
]

const solutions = [
  'Единая панель для задач, складов, поставок и аналитики',
  'Понятные статусы задач и загрузки команды',
  'Учет товаров, комплектующих и остатков по складам',
  'Мобильное приложение с задачами и инструкциями',
  'Прозрачность процессов для руководителей и сотрудников',
]

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Наведите порядок в операционке
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Когда задачи, поставки и остатки не связаны между собой, команда теряет
            время, а ошибки становятся нормой. Gingy собирает процессы в одной системе.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Problems */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Без Gingy</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">С Gingy</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#features"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Посмотреть возможности Gingy
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
