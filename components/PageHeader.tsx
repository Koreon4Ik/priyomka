"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-40 pb-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Основний заголовок */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        
        {/* Стилізоване синє підкреслення */}
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
        
        {/* Підзаголовок (якщо він потрібен) */}
        {subtitle && (
          <p className="text-gray-500 text-lg max-w-2xl mx-auto px-4">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}