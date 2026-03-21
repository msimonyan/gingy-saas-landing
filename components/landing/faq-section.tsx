'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is Gingy suitable for small teams?',
    answer:
      'Absolutely! Gingy is designed to scale with your operations. Our Starter plan is perfect for small teams with up to 5 workers, and you can upgrade as your team grows. Many of our customers started small and now manage dozens of workers across multiple warehouses.',
  },
  {
    question: 'Does Gingy support mobile workers?',
    answer:
      'Yes, Gingy includes a dedicated mobile app for workers. Workers can receive task assignments, view assembly instructions, scan barcodes, and communicate with their team - all from their mobile device. The app works on both iOS and Android.',
  },
  {
    question: 'Can Gingy manage warehouses and supplies?',
    answer:
      'Gingy provides comprehensive warehouse and supply management. You can track inventory across multiple warehouses, manage incoming shipments, monitor component stock levels, and organize supplies by location. Real-time visibility ensures you always know what you have and where.',
  },
  {
    question: 'Can plans be changed later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you will get immediate access to new features. When downgrading, the change takes effect at the start of your next billing cycle. No long-term contracts required.',
  },
  {
    question: 'Does Gingy offer an API?',
    answer:
      'Yes, Gingy provides a comprehensive REST API for developers. You can integrate Gingy with your existing systems, automate workflows, sync inventory data, and build custom integrations. Our API documentation includes examples, SDKs, and webhook support.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            FAQ
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We have answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-foreground">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
