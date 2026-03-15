import { Building2, Package, Users, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Building2,
    title: 'Create Products & Warehouses',
    description: 'Set up your products, assembly instructions, and warehouse locations.',
  },
  {
    step: 2,
    icon: Package,
    title: 'Receive Supplies & Shipments',
    description: 'Log incoming supplies and shipments for accurate inventory tracking.',
  },
  {
    step: 3,
    icon: Users,
    title: 'Assign Tasks to Workers',
    description: 'Distribute assembly and packing tasks to your team via the mobile app.',
  },
  {
    step: 4,
    icon: TrendingUp,
    title: 'Track Progress & Productivity',
    description: 'Monitor real-time progress and analyze performance metrics.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
            How It Works
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Get Started in Four Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Gingy is designed for quick setup and immediate productivity gains.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-border hidden lg:block" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 h-full">
                  {/* Step number */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-6 mx-auto lg:mx-0">
                    {step.step}
                  </div>
                  
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center z-20">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
