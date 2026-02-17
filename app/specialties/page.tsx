import { client } from '@/sanity/lib/client'
import * as Icons from 'lucide-react'
import Link from 'next/link'

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
    <main className="min-h-screen bg-gray-50/50 pt-48 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-gray-900 mb-16 font-sans tracking-tight">Освітні програми</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item: any) => {
            const LucideIcon = (Icons as any)[item.icon] || Icons.GraduationCap
            // Створюємо безпечне посилання
            const href = item.slug?.current ? `/specialties/${item.slug.current}` : '#';
            
            return (
              <div key={item._id || Math.random()} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                    <LucideIcon size={28} />
                  </div>
                  {/* Відображаємо "база 9 класів" або код */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    {item.code || '---'}
                  </span>
                </div>

                {/* Назва спеціальності (наприклад, G-5) */}
                <h3 className="text-2xl font-black text-gray-900 mb-1 leading-tight">
                  {item.title}
                </h3>
                
                {/* Спеціалізація (наприклад, Електронні комунікації...) */}
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
                  className={`inline-flex items-center font-bold transition-all ${item.slug?.current ? 'text-blue-600 hover:gap-3' : 'text-gray-300 cursor-not-allowed'}`}
                >
                  {item.slug?.current ? 'Детальніше' : 'Посилання відсутнє'} 
                  <Icons.ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}