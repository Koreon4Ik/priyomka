'use client'

import { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { CheckCircle2, X, Download, FileText } from 'lucide-react'
import { client } from '@/sanity/lib/client' // Перевірте шлях до вашого клієнта Sanity
import { PortableText } from '@portabletext/react'

// Тип даних для кроку вступу
interface AdmissionStep {
  _id: string
  number: string
  title: string
  content: any
  fileUrl?: string
}

export const dynamic = 'force-dynamic'
export const revalidate = 0


export default function AdmissionPage() {
  const [steps, setSteps] = useState<AdmissionStep[]>([])
  const [selectedStep, setSelectedStep] = useState<AdmissionStep | null>(null)
  const [loading, setLoading] = useState(true)

  // Завантаження даних із Sanity
  useEffect(() => {
    const fetchSteps = async () => {
      const query = `*[_type == "vstup"] | order(number asc) {
        _id,
        number,
        title,
        content,
        "fileUrl": file.asset->url
      }`
      const data = await client.fetch(query)
      setSteps(data)
      setLoading(false)
    }
    fetchSteps()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20 relative z-10">
      <PageHeader 
        title="Вступнику" 
        subtitle="Все, що потрібно знати для успішного вступу до нашого коледжу"
      />

      <div className="max-w-3xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-10">Завантаження...</div>
        ) : (
          <div className="space-y-4">
            {steps.map((step) => (
              <button
                key={step._id}
                onClick={() => setSelectedStep(step)}
                className="w-full flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all hover:scale-[1.01] group text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black group-hover:bg-blue-700 transition-colors">
                  {step.number}
                </div>
                <p className="text-lg font-bold text-gray-800">{step.title}</p>
                <CheckCircle2 className="ml-auto text-blue-100 group-hover:text-blue-500 transition-colors" size={24} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* МОДАЛЬНЕ ВІКНО (ПОПАП) */}
      {selectedStep && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStep(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закриття */}
            <button 
              onClick={() => setSelectedStep(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="p-8 md:p-12">
              <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4">
                Крок {selectedStep.number}
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                {selectedStep.title}
              </h2>
              
              <div className="prose prose-blue max-w-none text-gray-600 mb-8">
                <PortableText value={selectedStep.content} />
              </div>

              {selectedStep.fileUrl && (
                <a 
                  href={selectedStep.fileUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-fit"
                >
                  <FileText size={20} />
                  <span>Завантажити інструкцію (PDF)</span>
                  <Download size={18} className="ml-2 opacity-70" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
