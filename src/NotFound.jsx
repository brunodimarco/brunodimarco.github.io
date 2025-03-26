// src/NotFound.jsx
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center bg-black text-white px-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-bold text-fuchsia-500 drop-shadow-glow mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-zinc-300 mb-6"
      >
        Oops... Questa pagina non esiste.
      </motion.p>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        href="/"
        className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300"
      >
        Torna alla Home
      </motion.a>
    </div>
  );
}
