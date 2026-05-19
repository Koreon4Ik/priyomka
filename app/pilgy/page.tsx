'use client'

import { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { ShieldAlert, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface PilgyData {
  title: string
  subtitle: string
  content: any
}

export default function PilgyPage() {
  const [data, setData] = useState<PilgyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // Беремо перший знайдений документ цього типу
      const query = `*[_type == "pilgyPage"][0] {
        title,
        subtitle,
        content
      }`
      const res = await client.fetch(query)
      setData(res)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      {/* Використовуємо дані з Sanity, або дефолтні значення, якщо адмінка ще пуста */}
      <PageHeader 
        title={data?.title || "Пільгові категорії"} 
        subtitle={data?.subtitle || "Інформація про умови вступу та пільги для окремих категорій громадян"}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Кнопка повернення назад на вступ */}
        <Link 
          href="/admission" 
          className="inline-flex items-center gap-2 text-blue-600 font-bold mb-10 hover:gap-3 transition-all text-sm group"
        >
          <ChevronLeft size={16} /> Назад до кроків вступу
        </Link>

        {loading ? (
          <div className="text-center py-10 font-bold text-gray-400">Завантаження інформації...</div>
        ) : (
          <div className="bg-gray-50/60 border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            {/* Декоративна іконка щита на бекграунді */}
            <div className="absolute top-8 right-8 text-blue-500/10 pointer-events-none hidden md:block">
              <ShieldAlert size={120} />
            </div>

            {/* Основний блок тексту з Sanity */}
            {data?.content ? (
              <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-base md:text-lg 
                prose-headings:font-black prose-headings:text-gray-900 prose-headings:uppercase prose-headings:tracking-tight
                prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2">
                <PortableText value={data.content} />
              </div>
            ) : (
              <p className="text-gray-400 italic text-center py-10">
                Будь ласка, заповніть контент цієї сторінки в адмінці Sanity.
              </p>
            )}

          </div>
        )}
      </div>
    </main>
  )
}