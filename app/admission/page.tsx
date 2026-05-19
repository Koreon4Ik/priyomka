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
  deadlines9?: DeadlineItem[]
  deadlines11?: DeadlineItem[]
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
        deadlines9,
        deadlines11
      }`
      const data = await client.fetch(query)
      setSteps(data)
      setLoading(false)
    }
    fetchSteps()
  }, [])

  const sideLinks = steps.find(s => s.linksSection && s.linksSection.length > 0)?.linksSection || []
  const deadlines9 = steps.find(s => s.deadlines9 && s.deadlines9.length > 0)?.deadlines9 || []
  const deadlines11 = steps.find(s => s.deadlines11 && s.deadlines11.length > 0)?.deadlines11 || []

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
          /* ОНОВЛЕНА СІТКА: Оптимальний розподіл простору */
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* ЛІВА КОЛОНКА: ПОСИЛАННЯ (Займає 3/12) */}
            <div className="xl:col-span-3 bg-gray-50/60 border border-gray-100 p-6 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-black uppercase text-xs tracking-wider mb-2">
                <Link2 size={16} className="text-blue-600" />
                <span>Корисні ресурси</span>
              </div>
              {sideLinks.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Заповніть посилання в Sanity</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {sideLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
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

            {/* ЦЕНТРАЛЬНА КОЛОНКА: КРОКИ ВСТУПУ (Займає 4/12) */}
            <div className="xl:col-span-4 space-y-4">
              <div className="text-gray-900 font-black uppercase text-xs tracking-wider mb-2 px-2">
                Етапи вступу
              </div>
              {steps.map((step) => {
                const isExpanded = expandedStepId === step._id
                return (
                  <div 
                    key={step._id}
                    className="bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-sm">
                          {step.number}
                        </div>
                        <h3 className="text-base font-black text-gray-800 leading-tight">{step.title}</h3>
                      </div>

                      <button
                        onClick={() => toggleStep(step._id)}
                        className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-sm"
                      >
                        <span>Детальніше</span>
                        <ChevronDown 
                          size={12} 
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-gray-100 space-y-5 animate-in slide-in-from-top-2 duration-200">
                        <div className="prose prose-blue max-w-none text-gray-600 text-xs md:text-sm leading-relaxed">
                          <PortableText value={step.content} />
                        </div>

                        {step.fileUrl && (
                          <a 
                            href={step.fileUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 p-3.5 bg-gray-900 text-white rounded-2xl text-[11px] font-bold hover:bg-blue-600 transition-all shadow-lg"
                          >
                            <FileText size={14} />
                            <span>Завантажити інструкцію</span>
                            <Download size={12} className="opacity-60" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* ПРАВА КОЛОНКА: ВАЖЛИВІ ДАТИ (Займає 5/12 та ділиться на 2 колонки всередині) */}
            <div className="xl:col-span-5 bg-gray-50/60 border border-gray-100 p-6 rounded-[2rem] space-y-6">
              <div className="flex items-center gap-2 text-gray-900 font-black uppercase text-xs tracking-wider border-b border-gray-200/60 pb-3">
                <Calendar size={16} className="text-blue-600" />
                <span>Важливі дати вступу</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* ПІДКОЛОНКА: БАЗА 9 КЛАСІВ */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-xl w-fit">
                    База 9 класів
                  </h4>
                  {deadlines9.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Дати відсутні</p>
                  ) : (
                    deadlines9.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          item.type === 'accent'
                            ? 'bg-blue-100/40 border-blue-200 text-blue-900'
                            : 'bg-white border-gray-100 text-gray-800 shadow-sm'
                        }`}
                      >
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase mb-2 ${
                          item.type === 'accent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.period}
                        </span>
                        <p className="text-xs font-bold leading-normal">{item.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* ПІДКОЛОНКА: БАЗА 11 КЛАСІВ */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black text-gray-700 uppercase tracking-widest bg-gray-200/50 px-3 py-1.5 rounded-xl w-fit">
                    База 11 класів
                  </h4>
                  {deadlines11.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Дати відсутні</p>
                  ) : (
                    deadlines11.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          item.type === 'accent'
                            ? 'bg-blue-100/40 border-blue-200 text-blue-900'
                            : 'bg-white border-gray-100 text-gray-800 shadow-sm'
                        }`}
                      >
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase mb-2 ${
                          item.type === 'accent' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.period}
                        </span>
                        <p className="text-xs font-bold leading-normal">{item.text}</p>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}