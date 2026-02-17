"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Головна", href: "/" },
  { name: "Освітні програми", href: "/specialties" },
  { name: "Вступнику", href: "/admission" },
  { name: "Документи", href: "/documents" },
  { name: "Контакти", href: "/contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* НОВИЙ ЛОГОТИП */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex flex-col justify-center border-r-2 border-blue-600/20 pr-3">
              <span className="text-[16px] leading-tight font-black text-blue-900 uppercase tracking-tight">
                Дніпровський фаховий
              </span>
              <span className="text-[16px] leading-tight font-black text-blue-900 uppercase tracking-tight">
                коледж радіоелектроніки
              </span>
            </div>
            <span className="text-2xl font-black text-blue-600 tracking-tighter group-hover:text-blue-700 transition-colors">
              Вступ
            </span>
          </Link>

          {/* Десктоп меню */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-blue-600 relative",
                  pathname === item.href ? "text-blue-600" : "text-gray-600"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full mt-1 w-full h-0.5 bg-blue-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Мобільна кнопка */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-b border-gray-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-gray-600 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}