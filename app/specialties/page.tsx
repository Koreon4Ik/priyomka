'use client'

import { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { ChevronDown, Download, FileText, Link2, Calendar } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'

interface InlineLink {
  label: string
  url: string
  isImportant?: boolean
}

interface DeadlineItem {
  period: string
  text: string
  type: 'default' | 'accent'
}

interface AdmissionStep {
  _id: string
  number: string
  title: string
  content: any
  fileUrl?: string
  linksSection?: InlineLink[]
  deadlinesSection?: DeadlineItem[]
}

export default function AdmissionPage() {
  const [steps, setSteps] = useState<AdmissionStep[]>([])
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSteps = async () => {
      const query = `*[_type == "vstup"] | order(number asc) {
        _id,
        number,
        title,
        content,
        "fileUrl": file.asset->url,
        linksSection,
        deadlinesSection
      }`
      const data = await client.fetch(query)
      setSteps(data)
      setLoading(false)
    }
    fetchSteps()
  }, [])

  // Беремо посилання та терміни з першого доступного об'єкта, де вони заповнені
  const sideLinks = steps.find(s => s.linksSection && s.linksSection.length > 0)?.linksSection || []
  const sideDeadlines = steps.find(s => s.deadlinesSection && s.deadlinesSection.length > 0)?.deadlinesSection || []

  const toggleStep = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      <PageHeader 
        title="Вступнику" 
        subtitle="Все, що потрібно знати для успішного вступу до нашого коледжу"
      />

      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400">Завантаження даних...</div>
        ) : (
          /* ГОЛОВНА БЕНТО-СІТКА НА 3 КОЛОНКИ (1 : 2 : 1) */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* ЛІВА КОЛОНКА: КОРИСНІ ПОСИЛАННЯ */}
            <div className="lg:col-span-1 bg-gray-50/60 border border-gray-100 p-6 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-black uppercase text-xs tracking-wider mb-2">
                <Link2 size={16} className="text-blue-600" />
                <span>Корисні ресурси</span>
              </div>
              {sideLinks.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Заповніть посилання в адмінці Sanity</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {sideLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full p-4 rounded-2xl font-bold text-sm transition-all hover:translate-x-1 flex items-center justify-between group ${
                        link.isImportant 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-100 hover:bg-blue-700' 
                          : 'bg-white text-gray-700 border border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className={`text-xs transition-transform group-hover:translate-x-0.5 ${link.isImportant ? 'text-blue-200' : 'text-gray-400'}`}>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ЦЕНТРАЛЬНА КОЛОНКА: КРОКИ ВСТУПУ */}
            <div className="lg:col-span-2 space-y-4">
              {steps.map((step) => {
                const isExpanded = expandedStepId === step._id
                return (
                  <div 
                    key={step._id}
                    className="bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black">
                          {step.number}
                        </div>
                        <h3 className="text-lg font-black text-gray-800 leading-tight">{step.title}</h3>
                      </div>

                      {/* Твоя синя кнопка замість старої галочки */}
                      <button
                        onClick={() => toggleStep(step._id)}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        <span>Детальніше</span>
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    </div>

                    {/* Прихований контент, який плавно відкривається вниз */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-100 space-y-6 animate-in slide-in-from-top-2 duration-200">
                        <div className="prose prose-blue max-w-none text-gray-600 text-sm leading-relaxed">
                          <PortableText value={step.content} />
                        </div>

                        {step.fileUrl && (
                          <a 
                            href={step.fileUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 p-4 bg-gray-900 text-white rounded-2xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg"
                          >
                            <FileText size={16} />
                            <span>Завантажити інструкцію (PDF)</span>
                            <Download size={14} className="opacity-60" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* ПРАВА КОЛОНКА: ТЕРМІНИ ВСТУПУ */}
            <div className="lg:col-span-1 bg-gray-50/60 border border-gray-100 p-6 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-black uppercase text-xs tracking-wider mb-2">
                <Calendar size={16} className="text-blue-600" />
                <span>Важливі дати</span>
              </div>
              {sideDeadlines.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Заповніть терміни в адмінці Sanity</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {sideDeadlines.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all ${
                        item.type === 'accent'
                          ? 'bg-blue-50/80 border-blue-100 text-blue-900'
                          : 'bg-white border-gray-100 text-gray-800'
                      }`}
                    >
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase mb-2 ${
                        item.type === 'accent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.period}
                      </span>
                      <p className="text-xs font-bold leading-normal">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </main>
  )
}