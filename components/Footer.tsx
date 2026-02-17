"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    // Додаємо relative та z-10, щоб текст був поверх фону
    <footer className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Блок з логотипом */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col justify-center border-r-2 border-blue-600/20 pr-3 text-left">
                <span className="text-[10px] leading-tight font-black text-blue-900 uppercase tracking-tight">
                  Дніпровський фаховий
                </span>
                <span className="text-[10px] leading-tight font-black text-blue-900 uppercase tracking-tight">
                  коледж радіоелектроніки
                </span>
              </div>
              <span className="text-2xl font-black text-blue-600 tracking-tighter">
                Вступ
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Твій шлях у світ технологій починається тут. Сучасна освіта для майбутніх IT-спеціалістів та інженерів.
            </p>
          </div>

          {/* Навігація */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Навігація</h4>
            <ul className="space-y-4 text-left">
              <li><Link href="/specialties" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Освітні програми</Link></li>
              <li><Link href="/admission" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Вступнику</Link></li>
              <li><Link href="/documents" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Документи</Link></li>
              <li><Link href="/contacts" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Контакти</Link></li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-left">Контакти</h4>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin size={18} className="text-blue-600 shrink-0" />
                <span>вулиця Шмідта, 18, Дніпро, Дніпропетровська область, 49000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Phone size={18} className="text-blue-600 shrink-0" />
                <span>+38 (067) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Mail size={18} className="text-blue-600 shrink-0" />
                <span>pk@kre.dp.ua</span>
              </li>
            </ul>
          </div>

          {/* Соцмережі */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-left">Ми в соцмережах</h4>
            <div className="flex gap-4 justify-start">
              <a href="https://www.facebook.com/kre.dp.ua/" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/kre.dnipro/" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://t.me/pk_vstup_KRE" className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-sky-500 hover:bg-sky-50 transition-all">
                <Send size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Нижня частина */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © 2026 ДФКР Вступ. Всі права захищені.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-blue-600">Політика конфіденційності</Link>
            <Link href="#" className="hover:text-blue-600">Розробка сайту</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}