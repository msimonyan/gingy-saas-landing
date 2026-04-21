'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Подойдет ли Gingy для небольшой команды?',
    answer:
      'Да. Gingy подходит как для компактной команды, так и для более крупных процессов. На старте можно работать с базовым тарифом, а по мере роста перейти на более функциональный план.',
  },
  {
    question: 'Есть ли мобильное приложение для сотрудников?',
    answer:
      'Да. У Gingy есть отдельный мобильный сценарий для сотрудников: задачи, инструкции, статусы выполнения, коммуникация и личный прогресс доступны прямо с телефона.',
  },
  {
    question: 'Можно ли вести склады, товары и поставки?',
    answer:
      'Да. Система поддерживает склады, товары, комплектующие, поставки и остатки. Вы видите движение по складам, текущие запасы и связанные с ними операционные задачи.',
  },
  {
    question: 'Можно ли позже поменять тариф?',
    answer:
      'Да. Тариф можно изменить позже через сценарии подписки и биллинга. Это удобно, если команда растет или меняется структура складских процессов.',
  },
  {
    question: 'Какие интеграции доступны сейчас?',
    answer:
      'На текущий момент в продукте уже используются интеграции с МойСклад, Wildberries и YooKassa для подписок. Если нужен отдельный интеграционный сценарий, его лучше обсуждать отдельно по вашему процессу.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            FAQ
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Частые вопросы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Собрали короткие ответы на самые важные вопросы перед запуском.
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
