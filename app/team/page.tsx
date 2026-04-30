export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '@/sanity/lib/client'
import PageHeader from '../../components/PageHeader'
import { Users } from 'lucide-react'
import Image from 'next/image'

async function getTeamData() {
  const query = `*[_type == "team"] | order(_createdAt asc) {
    name,
    position,
    "photoUrl": photo.asset->url
  }`
  return await client.fetch(query, {}, { next: { revalidate: 0 } })
}

export default async function TeamPage() {
  const team = await getTeamData()

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      <PageHeader 
        title="Наша команда" 
        subtitle="Люди, які створюють майбутнє нашого коледжу" 
      />
      
      <div className="max-w-7xl mx-auto px-6">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member: any, index: number) => (
              <div 
                key={index} 
                className="group p-4 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 text-center"
              >
                {/* Контейнер для фото */}
                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-[2rem] border-4 border-gray-50">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200">
                      <Users size={64} />
                    </div>
                  )}
                </div>

                {/* Інформація */}
                <div className="px-2 pb-4">
                  <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="w-12 h-1 bg-blue-100 mx-auto mb-4 rounded-full group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500"></div>
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-widest leading-relaxed">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium">Команда ще на стадії формування...</p>
          </div>
        )}
      </div>
    </main>
  )
}