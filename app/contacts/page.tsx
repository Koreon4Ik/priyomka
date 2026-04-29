export const dynamic = 'force-dynamic';
export const revalidate = 0;

import PageHeader from '../../components/PageHeader'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { client } from '@/sanity/lib/client'

export default async function ContactsPage() {
  // Робимо запит до Sanity за даними (тип "contacts")
  const query = `*[_type == "contacts"][0]{ address, phone, email }`;
  const sanityData = await client.fetch(query, {}, { next: { revalidate: 0 } });

  // Якщо даних в Sanity ще немає, покажемо ці стандартні (щоб сайт не впав)
  const address = sanityData?.address || "м.Дніпро, вул. Степана Бандери, 18";
  const phone = sanityData?.phone || "+38 (067) 123-45-67";
  const email = sanityData?.email || "pk@kre.dp.ua";

  const contactItems = [
    { icon: MapPin, title: "Наша адреса", value: address },
    { icon: Phone, title: "Телефон", value: phone },
    { icon: Mail, title: "Електронна пошта", value: email },
    { icon: Clock, title: "Графік роботи", value: "Пн-Пт: 09:00 - 17:00" }
  ]

  return (
    <main className="min-h-screen bg-white pb-20 relative z-10">
      <PageHeader title="Наші контакти" subtitle="Ми завжди готові відповісти на ваші запитання" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, index) => (
            <div key={index} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                <item.icon size={28} />
              </div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.title}</h3>
              <p className="text-lg font-bold text-gray-900 leading-tight">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Карта */}
        <div className="w-full h-[500px] rounded-[3rem] overflow-hidden border-8 border-gray-50 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.4371720448!2d35.0218!3d48.466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDI3JzU3LjYiTiAzNcKwMDEnMTguNSJF!5e0!3m2!1suk!2sua!4v1620000000000!5m2!1suk!2sua"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          ></iframe>
        </div>
      </div>
    </main>
  )
}