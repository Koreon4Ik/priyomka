import { client } from '@/sanity/lib/client'
import PageHeader from '../../components/PageHeader'
import { FileText, Download, Eye, FolderOpen } from 'lucide-react'

async function getDocumentsPage() {
  // Запит адаптований під нову схему 'docsPage'
  const query = `*[_type == "docsPage"][0] {
    mainTitle,
    sections[] {
      sectionTitle,
      items[] {
        label,
        "fileUrl": file.asset->url
      }
    }
  }`
  return await client.fetch(query)
}

export default async function DocumentsPage() {
  const data = await getDocumentsPage()

  if (!data || !data.sections) {
    return (
      <main className="min-h-screen bg-white pb-20 relative z-10">
        <PageHeader title="Документи" subtitle="Завантаження даних..." />
        <div className="text-center py-20 text-gray-400 font-medium">
          Документів поки немає. Будь ласка, створіть запис у Sanity Studio (тип "Сторінка Документи").
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      <PageHeader 
        title={data.mainTitle || "Документи"} 
        subtitle="Офіційна інформація, розподілена за категоріями"
      />

      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {data.sections.map((section: any, sIdx: number) => (
          <div key={sIdx} className="space-y-4">
            {/* Назва розділу (наприклад: Вступ 2026) */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <FolderOpen size={20} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">{section.sectionTitle}</h2>
            </div>

            <div className="bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-4 shadow-inner">
              {section.items && section.items.map((doc: any, iIdx: number) => (
                <div 
                  key={iIdx} 
                  className="flex items-center justify-between p-6 bg-white rounded-2xl mb-3 last:mb-0 border border-transparent hover:border-blue-200 transition-all group"
                >
                  {/* Клік на назву для перегляду */}
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 flex-grow cursor-pointer"
                  >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {doc.label}
                      </h3>
                      <p className="text-xs text-blue-400 font-medium flex items-center gap-1">
                        <Eye size={12} /> Переглянути онлайн
                      </p>
                    </div>
                  </a>

                  {/* Кнопка завантаження */}
                  <a 
                    href={`${doc.fileUrl}?dl=${doc.label}.pdf`}
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Завантажити PDF"
                  >
                    <Download size={24} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}