"use client";
import { motion } from "framer-motion";

export default function ContactCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Початковий стан: прозорий і трохи нижче
      animate={{ opacity: 1, y: 0 }}  // Кінцевий стан: видимий і на місці
      transition={{ 
        duration: 0.5, 
        delay: delay, // Затримка, щоб картки вилітали по черзі
        ease: "easeOut" 
      }}
      whileHover={{ scale: 1.02 }} // Ефект при наведенні
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow"
    >
      {children}
    </motion.div>
  );
}