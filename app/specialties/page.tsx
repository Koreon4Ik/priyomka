import { client } from '@/sanity/lib/client'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'

async function getSpecialties() {
  const query = `*[_type == "specialty"] | order(code asc) {
    title,
    subtitle,
    code,
    slug,
    shortDescription,
    icon
  }`
  return await client.fetch(query)
}

export default async function SpecialtiesPage() {
  const specialties = await getSpecialties()

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      {/* Використовуємо новий універсальний заголовок */}
      <PageHeader 
        title="Освітні програми" 
        subtitle="Оберіть свій шлях у майбутнє серед наших сучасних спеціальностей"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item: any) => {
            const LucideIcon = (Icons as any)[item.icon] || Icons.GraduationCap
            const href = item.slug?.current ? `/specialties/${item.slug.current}` : '#'
            
            return (
              <div key={item.slug?.current || Math.random()} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all group hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <LucideIcon size={28} />
                  </div>
                  {/* Бейдж з кодом або базою навчання */}
                  {item.code && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      {item.code}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-1">
                  {item.title}
                </h3>
                
                {item.subtitle && (
                  <p className="text-xs font-bold text-blue-600/70 uppercase tracking-tight mb-4">
                    {item.subtitle}
                  </p>
                )}

                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                  {item.shortDescription}
                </p>

                <Link 
                  href={href}
                  className="inline-flex items-center font-bold text-blue-600 hover:gap-3 transition-all group/link"
                >
                  Детальніше 
                  <Icons.ChevronRight size={18} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}