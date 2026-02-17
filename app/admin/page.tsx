// app/admin/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, FileText, Calendar, Settings } from 'lucide-react';

export default function AdminPage() {
  // Стан: чи авторизований користувач
  const [isAuth, setIsAuth] = useState(false);
  
  // Дані форми
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Функція входу (Тимчасова логіка для тесту)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ТУТ МИ ПОТІМ ЗМІНИМО НА СПРАВЖНЮ ПЕРЕВІРКУ
    if (username === 'admin' && password === 'dfkr2024') {
      setIsAuth(true);
      setError('');
    } else {
      setError('Невірний логін або пароль');
    }
  };

  // Якщо НЕ авторизований — показуємо форму входу
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
        >
          <div className="flex justify-center mb-6 text-blue-900">
            <div className="bg-blue-100 p-4 rounded-full">
              <Lock size={40} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Вхід для приймальної комісії</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Логін</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Введіть логін"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <LogIn size={20} /> Увійти
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Якщо АВТОРИЗОВАНИЙ — показуємо Панель Керування
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Панель керування</h1>
          <button 
            onClick={() => setIsAuth(false)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Вийти
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Картка 1: Новини */}
          <DashboardCard 
            title="Новини та оголошення" 
            desc="Додати новину на головну сторінку"
            icon={<FileText size={32} className="text-blue-600" />}
          />

          {/* Картка 2: Дати */}
          <DashboardCard 
            title="Календар вступу" 
            desc="Змінити дати вступної кампанії"
            icon={<Calendar size={32} className="text-green-600" />}
          />

          {/* Картка 3: Налаштування */}
          <DashboardCard 
            title="Налаштування сайту" 
            desc="Змінити контакти або телефони"
            icon={<Settings size={32} className="text-gray-600" />}
          />
        </div>
      </div>
    </div>
  );
}

// Компонент картки для адмінки
function DashboardCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </motion.div>
  );
}