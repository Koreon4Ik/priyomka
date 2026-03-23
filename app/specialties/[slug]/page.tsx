export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '@/sanity/lib/client'
import * as Icons from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

async function getSpecialtyData(slug: string) {
  // Додаємо subtitle у запит для конкретної сторінки
  const query = `*[_type == "specialty" && slug.current == $slug][0]{
    title,
    subtitle,
    code,
    icon,
    shortDescription,
    content,
    benefits
  }`
  return await client.fetch(query, { slug })
}

export default async function SpecialtyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = await getSpecialtyData(resolvedParams.slug)

  if (!item) notFound()

  const LucideIcon = (Icons as any)[item.icon] || Icons.GraduationCap

  return (
    <main className="min-h-screen bg-white pt-48 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/specialties" className="inline-flex items-center text-gray-400 hover:text-blue-600 mb-12 font-medium transition-colors group">
          <Icons.ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Назад до списку
        </Link>

        <div className="flex flex-col gap-6 mb-16 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <LucideIcon size={32} />
             </div>
             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               {item.code}
             </span>
          </div>
          
          <div>
            {/* Основний заголовок (G-5) */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] mb-4">
              {item.title}
            </h1>
            {/* Підзаголовок (Електронні комунікації...) */}
            {item.subtitle && (
              <p className="text-xl md:text-3xl font-medium text-blue-600 tracking-tight">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-8 text-blue-600 border-l-4 border-blue-600 pl-4">
              <Icons.BookOpen size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Про спеціальність</h2>
            </div>
            
            <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
               {item.content ? (
                 <PortableText value={item.content} />
               ) : (
                 <p className="whitespace-pre-wrap text-xl italic">{item.shortDescription}</p> 
               )}
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2">
             <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-40">
                <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <Icons.Star className="text-yellow-500" size={20} />
                  Переваги
                </h3>
                <ul className="space-y-4">
                  {(item.benefits || []).map((b: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-medium">
                      <Icons.CheckCircle2 className="text-green-500 shrink-0 mt-1" size={18} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}