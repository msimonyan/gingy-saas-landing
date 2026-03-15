import { X, Check, ArrowRight } from 'lucide-react'

const problems = [
  'Unclear worker assignments',
  'Manual coordination of packing tasks',
  'Inventory mistakes',
  'Disconnected tools',
  'Poor visibility into operations',
]

const solutions = [
  'Automated task assignment',
  'Centralized task management',
  'Real-time inventory tracking',
  'Unified platform',
  'Complete operational visibility',
]

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Stop Fighting Your Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Warehouse chaos costs you time, money, and sanity. Gingy brings order to your operations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Problems */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Without Gingy</h3>
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
              <h3 className="text-xl font-semibold text-foreground">With Gingy</h3>
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
            See how Gingy solves these problems
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
