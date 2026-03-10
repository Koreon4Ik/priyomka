import PageHeader from '../../components/PageHeader'
import { CheckCircle2 } from 'lucide-react'

export default function AdmissionPage() {
  const steps = [
    "Створити електронний кабінет",
    "Подати заяву на вступ",
    "Пройти співбесіду або творчий конкурс",
    "Надати оригінали документів"
  ]

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      <PageHeader 
        title="Вступнику" 
        subtitle="Все, що потрібно знати для успішного вступу до нашого коледжу"
      />

      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black">
                {index + 1}
              </div>
              <p className="text-lg font-bold text-gray-800">{step}</p>
              <CheckCircle2 className="ml-auto text-blue-100" size={24} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}