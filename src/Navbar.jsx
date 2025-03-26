// Navbar.jsx
import { motion } from "framer-motion";
import { translations } from "./locales";

export default function Navbar({ lang, toggleLang, theme, toggleTheme }) {
  const t = (key) => translations[lang][key] || key;
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a
          href="/"
          className="font-bold text-lg tracking-tight text-black dark:text-white hover:opacity-80 transition"
        >
          Bruno Di Marco
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#projects"
            className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 hover:text-fuchsia-500"
          >
            {t("projectsNav")}
          </a>
          <a
            href="#contact"
            className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 hover:text-fuchsia-500"
          >
            {t("contactNav")}
          </a>

          <button
            onClick={toggleLang}
            className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 hover:opacity-8"
          >
            {lang === "en" ? "🇬🇧 EN" : "🇮🇹 IT"}
          </button>
          <button
            onClick={() => toggleTheme(theme)}
            className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600 hover:opacity-80"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
