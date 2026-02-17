"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen pt-32 px-6 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-blue-900 mb-6"
      >
        Вступнику
      </motion.h1>
      <p className="text-gray-600 text-lg">Тут буде інформація для вступників...</p>
    </div>
  );
}