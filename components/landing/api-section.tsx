import { Button } from '@/components/ui/button'
import { Code, ArrowRight } from 'lucide-react'

const codeExample = `// Get available billing plans
GET /api/billing/plans

// Response
{
  "data": [
    {
      "slug": "growth",
      "name": "Growth",
      "price": 1990
    }
  ]
}`

export function ApiSection() {
  return (
    <section id="api" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Code className="w-4 h-4" />
              Developer API
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Developer-Friendly API
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Gingy provides a comprehensive REST API that allows companies to integrate 
              warehouse workflows with their own systems. Automate tasks, sync inventory, 
              and build custom integrations.
            </p>
            
            <ul className="mt-6 space-y-3">
              {[
                'RESTful endpoints for all operations',
                'Webhook support for real-time updates',
                'Comprehensive documentation',
                'SDKs for popular languages',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Button asChild className="gap-2">
                <a href="#">
                  View API Documentation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Code example */}
          <div className="relative">
            <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0f0f1a] border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-400 ml-2">api-example.js</span>
              </div>
              
              {/* Code content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code className="text-gray-300">
                    {codeExample.split('\n').map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line.startsWith('//') ? (
                          <span className="text-gray-500">{line}</span>
                        ) : line.startsWith('GET') ? (
                          <span>
                            <span className="text-green-400">GET</span>
                            <span className="text-blue-300">{line.slice(3)}</span>
                          </span>
                        ) : line.includes(':') && !line.includes('//') ? (
                          <span>
                            <span className="text-purple-400">{line.split(':')[0]}</span>
                            <span className="text-gray-300">:</span>
                            <span className="text-amber-300">{line.split(':').slice(1).join(':')}</span>
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
