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
    title: 'Task Management',
    description: 'Assign and track assembly or packing tasks with real-time status updates.',
    color: 'primary',
  },
  {
    icon: FileText,
    title: 'Product Instructions',
    description: 'Clear assembly instructions and component lists for every product.',
    color: 'accent',
  },
  {
    icon: Package,
    title: 'Inventory & Components',
    description: 'Track component stock and locations across all warehouses.',
    color: 'primary',
  },
  {
    icon: Warehouse,
    title: 'Supplies & Warehouses',
    description: 'Manage shipments, boxes, and warehouse operations efficiently.',
    color: 'accent',
  },
  {
    icon: Smartphone,
    title: 'Worker Mobile App',
    description: 'Barcode scanning and task instructions right on mobile devices.',
    color: 'accent',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Performance',
    description: 'Track productivity, packing speed, and operational metrics.',
    color: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    description: 'Real-time chat and notifications keep everyone connected.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Coins, rewards, achievements, and an internal shop for workers.',
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
            Features
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Everything You Need to Run Your Operations
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground">
            From task assignment to gamification, Gingy provides all the tools your warehouse needs.
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
