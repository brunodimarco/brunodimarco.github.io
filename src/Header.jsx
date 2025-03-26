import { motion } from "framer-motion";

export default function Header({ lang, toggleLang, theme, toggleTheme }) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="font-bold text-lg tracking-wide text-black dark:text-white">
          Bruno Di Marco
        </h1>
        <div className="flex gap-3 items-center">
          <button
            onClick={toggleLang}
            className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-white border border-zinc-600 hover:bg-zinc-700 transition"
          >
            {lang === "en" ? "🇬🇧 EN" : "🇮🇹 IT"}
          </button>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 hover:opacity-80 transition"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
