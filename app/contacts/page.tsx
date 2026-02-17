import { client } from '@/sanity/lib/client'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactCard from './ContactCard' // Імпортуємо наш компонент

async function getContacts() {
  const query = `*[_type == "contacts"][0]`
  return await client.fetch(query)
}

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Анімований заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {contacts?.title || "Наші контакти"}
          </h1>
          <p className="text-lg text-gray-600">Ми завжди готові відповісти на ваші запитання</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Картка 1: Адреса */}
          <ContactCard delay={0.1}>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Наша адреса</h3>
              <p className="text-gray-600 leading-relaxed">{contacts?.address}</p>
            </div>
          </ContactCard>

          {/* Картка 2: Телефон */}
          <ContactCard delay={0.2}>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
              <a href={`tel:${contacts?.phone}`} className="text-blue-600 hover:underline">
                {contacts?.phone}
              </a>
            </div>
          </ContactCard>

          {/* Картка 3: Email */}
          <ContactCard delay={0.3}>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Електронна пошта</h3>
              <a href={`mailto:${contacts?.email}`} className="text-blue-600 hover:underline">
                {contacts?.email}
              </a>
            </div>
          </ContactCard>

          {/* Картка 4: Графік */}
          <ContactCard delay={0.4}>
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Графік роботи</h3>
              <p className="text-gray-600">{contacts?.workHours || "Пн-Пт: 09:00 - 17:00"}</p>
            </div>
          </ContactCard>

        </div>
      </div>
    </main>
  )
}