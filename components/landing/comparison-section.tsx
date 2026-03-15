import { Monitor, Smartphone, Check } from 'lucide-react'

const managerFeatures = [
  'Operations dashboard',
  'Analytics & reporting',
  'Inventory visibility',
  'Subscription management',
  'Team management',
  'Custom integrations',
]

const workerFeatures = [
  'Mobile task lists',
  'Assembly instructions',
  'Barcode scanning',
  'Rewards & achievements',
  'Team communication',
  'Progress tracking',
]

export function ComparisonSection() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Built for Both Managers and Workers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Different tools for different roles, all working together seamlessly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Managers */}
          <div className="bg-background rounded-2xl border border-border overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center gap-3">
              <Monitor className="w-6 h-6 text-primary-foreground" />
              <h3 className="text-xl font-semibold text-primary-foreground">For Managers</h3>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-6">
                Full control over operations with powerful analytics and management tools.
              </p>
              <ul className="space-y-3">
                {managerFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Mini dashboard preview */}
              <div className="mt-6 bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Today&apos;s Overview</span>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-card rounded p-2 text-center">
                    <div className="text-lg font-bold text-primary">89%</div>
                    <div className="text-[10px] text-muted-foreground">Efficiency</div>
                  </div>
                  <div className="bg-card rounded p-2 text-center">
                    <div className="text-lg font-bold text-accent">152</div>
                    <div className="text-[10px] text-muted-foreground">Tasks Done</div>
                  </div>
                  <div className="bg-card rounded p-2 text-center">
                    <div className="text-lg font-bold text-foreground">12</div>
                    <div className="text-[10px] text-muted-foreground">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Workers */}
          <div className="bg-background rounded-2xl border border-border overflow-hidden">
            <div className="bg-accent px-6 py-4 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-accent-foreground" />
              <h3 className="text-xl font-semibold text-accent-foreground">For Workers</h3>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-6">
                Simple mobile experience focused on completing tasks and earning rewards.
              </p>
              <ul className="space-y-3">
                {workerFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Mini mobile preview */}
              <div className="mt-6 bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">My Tasks</span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">3 new</span>
                </div>
                <div className="space-y-2">
                  {['Pack Order #4521', 'Assemble Kit B', 'Scan Inventory'].map((task, i) => (
                    <div key={task} className="bg-card rounded p-2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-accent' : 'bg-muted-foreground'}`} />
                      <span className="text-xs text-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
