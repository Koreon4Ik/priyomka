import { client } from '@/sanity/lib/client'
import * as Icons from 'lucide-react'

async function getDocs() {
  const query = `*[_type == "docsPage"][0]{
    mainTitle,
    sections[]{
      sectionTitle,
      items[]{
        label,
        "url": file.asset->url
      }
    }
  }`
  return await client.fetch(query)
}

export default async function DocumentsPage() {
  const data = await getDocs()

  return (
    <main className="min-h-screen bg-gray-50 pt-48 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Статичний заголовок з Sanity */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {data?.mainTitle || "Документи"}
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {data?.sections?.map((section: any, sIdx: number) => (
            <div key={sIdx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Icons.FolderOpen className="text-blue-600" size={28} />
                {section.sectionTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items?.map((doc: any, dIdx: number) => (
                  <a
                    key={dIdx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm">
                        <Icons.FileText size={24} />
                      </div>
                      <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                        {doc.label}
                      </span>
                    </div>
                    <Icons.Download size={20} className="text-gray-400 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {(!data || !data.sections) && (
          <div className="text-center py-20 text-gray-400 italic">
            Документи завантажуються або ще не додані...
          </div>
        )}
      </div>
    </main>
  )
}