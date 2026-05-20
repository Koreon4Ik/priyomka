'use client';

import * as Icons from 'lucide-react';
import Link from 'next/link';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react'; // Додано useState
import { client } from '@/sanity/lib/client'; // Імпорт клієнта Sanity

interface HomeCardData {
  _id: string
  title: string
  description: string
  iconType: 'clock' | 'phone' | 'map' | 'mail'
  badgeColor: 'blue' | 'purple' | 'dark'
}

export default function HomePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Стан для нових карток інформації
  const [infoCards, setInfoCards] = useState<HomeCardData[]>([]);

  // Налаштування плавності для різних рівнів глибини
  const sX1 = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const sY1 = useSpring(mouseY, { stiffness: 30, damping: 20 });
  
  const sX2 = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const sY2 = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const sX3 = useSpring(mouseX, { stiffness: 90, damping: 30 });
  const sY3 = useSpring(mouseY, { stiffness: 90, damping: 30 });

  // Розрахунок зміщення (чим більша цифра, тим сильніший рух)
  const layer1X = useTransform(sX1, [0, 2000], [-30, 30]);
  const layer1Y = useTransform(sY1, [0, 1000], [-30, 30]);

  const layer2X = useTransform(sX2, [0, 2000], [-70, 70]);
  const layer2Y = useTransform(sY2, [0, 1000], [-70, 70]);

  const layer3X = useTransform(sX3, [0, 2000], [-130, 130]);
  const layer3Y = useTransform(sY3, [0, 1000], [-130, 130]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    
    // Завантаження карток інфо з Sanity
    const fetchInfoCards = async () => {
      const query = `*[_type == "homeCard"] {
        _id,
        title,
        description,
        iconType,
        badgeColor
      }`;
      const data = await client.fetch(query);
      setInfoCards(data);
    };
    fetchInfoCards();

    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  // Допоміжна функція підбору іконки для нових карток
  const renderInfoIcon = (type: string) => {
    switch (type) {
      case 'clock': return <Icons.Clock size={40} />
      case 'phone': return <Icons.Phone size={40} />
      case 'map': return <Icons.MapPin size={40} />
      case 'mail': return <Icons.Mail size={40} />
      default: return <Icons.Clock size={40} />
    }
  };

  // Допоміжна функція градієнтів для нових карток
  const getInfoBgGradient = (color: string) => {
    switch (color) {
      case 'purple': return 'from-purple-500 to-indigo-600 shadow-purple-200'
      case 'dark': return 'from-gray-700 to-gray-900 shadow-gray-200'
      default: return 'from-blue-500 to-blue-600 shadow-blue-200'
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden relative selection:bg-blue-100">
      
      {/* --- LAYER 1: ВЕЛИКІ ТУМАННІ ПЛЯМИ (ДАЛЕКИЙ ПЛАН) --- */}
      <motion.div style={{ x: layer1X, y: layer1Y }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-50/50 rounded-full blur-[140px]" />
      </motion.div>

      {/* --- LAYER 2: МАСИВНІ ТЕХНО-ІКОНКИ (СЕРЕДНІЙ ПЛАН) --- */}
      <motion.div style={{ x: layer2X, y: layer2Y }} className="fixed inset-0 pointer-events-none z-0">
        <Icons.Cpu 
          className="absolute top-[15%] right-[10%] text-blue-100/40 rotate-12" 
          size={320} strokeWidth={0.5} 
        />
        <Icons.CodeXml 
          className="absolute bottom-[10%] left-[5%] text-blue-100/30 -rotate-12" 
          size={280} strokeWidth={0.5} 
        />
        <div className="absolute top-[40%] left-[15%] font-mono text-xs text-blue-200/50 uppercase tracking-[1em] [writing-mode:vertical-lr]">
          System_Core_Init
        </div>
      </motion.div>

      {/* --- LAYER 3: ЧІТКІ АКЦЕНТНІ ЕЛЕМЕНТИ (БЛИЖНІЙ ПЛАН) --- */}
      <motion.div style={{ x: layer3X, y: layer3Y }} className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[60%] left-[25%] p-6 bg-white shadow-2xl shadow-blue-100 rounded-3xl border border-blue-50">
          <Icons.Zap className="text-blue-500" size={40} fill="currentColor" />
        </div>
        <div className="absolute top-[20%] left-[30%] p-4 bg-blue-600 rounded-2xl shadow-xl rotate-12">
          <Icons.Terminal className="text-white" size={30} />
        </div>
        <div className="absolute bottom-[30%] right-[20%] p-5 bg-white shadow-xl rounded-full border border-gray-100">
          <Icons.ShieldCheck className="text-blue-600" size={35} />
        </div>
      </motion.div>

      {/* --- ГОЛОВНИЙ КОНТЕНТ --- */}
      <section className="relative pt-52 pb-40 px-6 z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Вступ 2026
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-12 tracking-tighter">
            Твоє майбутнє <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              саме тут
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-16 font-medium leading-relaxed">
            Приєднуйся до лідерів цифрової трансформації. <br />
            Твоя кар'єра в IT та інженерії починається в ДФКР
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/specialties" className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-gray-900 transition-all duration-500 shadow-2xl shadow-blue-200 active:scale-95">
              Освітні програми
            </Link>
            <Link href="/documents" className="px-12 py-6 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-black text-xl hover:bg-gray-50 transition-all active:scale-95">
              Документи
            </Link>
          </div>
        </div>
      </section>

      {/* --- КАРТКИ (TILT EFFECT) --- */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Software", desc: "Розробка сучасного програмного забезбечення", icon: Icons.Binary },
            { title: "Hardware", desc: "Мікроелектроніка та робототехніка", icon: Icons.CircuitBoard },
            { title: "Cyber", desc: "Захист даних та мереж", icon: Icons.Lock }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, rotateX: 5, rotateY: 5 }}
              className="group p-10 bg-white/70 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-xl hover:shadow-blue-100/50 transition-all cursor-default"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:rotate-[10deg] transition-transform">
                <card.icon size={40} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">{card.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- НОВА СЕКЦІЯ: ІНФОРМАЦІЙНІ КАРТКИ З SANITY --- */}
      {infoCards.length > 0 && (
        <section className="pb-32 relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {infoCards.map((card) => (
              <motion.div
                key={card._id}
                whileHover={{ y: -20, rotateX: 5, rotateY: 5 }}
                className="group p-10 bg-white/70 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-xl hover:shadow-blue-100/50 transition-all cursor-default flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className={`w-20 h-20 bg-gradient-to-br text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-lg group-hover:rotate-[10deg] transition-transform ${getInfoBgGradient(card.badgeColor)}`}>
                    {renderInfoIcon(card.iconType)}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">{card.title}</h3>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed whitespace-pre-line">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}