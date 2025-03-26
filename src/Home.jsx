// App.jsx
import { useState, useEffect } from "react";
import { translations } from "./locales";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ScrollSection from "./ScrollSection";
import Projects from "./Projects";
import { FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";

import { toggleTheme, getTheme } from "./themes";
import "./index.css";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const [theme, setTheme] = useState(() => getTheme());
  const t = (key) => translations[lang][key] || key;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHashChange(); // scrolla alla prima apertura
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "it" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <main className="relative bg-white dark:bg-black text-black dark:text-white min-h-screen font-sans">
      <Navbar
        lang={lang}
        toggleLang={toggleLang}
        theme={theme}
        toggleTheme={(currentTheme) => setTheme(toggleTheme(currentTheme))}
      />
      <Hero theme={theme} />

      <ScrollSection id="about" title={t("aboutMe")}>
        <p>{t("aboutText")}</p>
        <ul className="list-disc list-inside text-gray-500 dark:text-gray-300 mt-4">
          <li>{t("aboutBullet1")}</li>
          <li>{t("aboutBullet2")}</li>
          <li>{t("aboutBullet3")}</li>
        </ul>
      </ScrollSection>

      <ScrollSection id="projects" title={t("projects")}>
        <Projects />
      </ScrollSection>

      <ScrollSection id="education" title={t("education")}>
        <p className="font-medium mb-2">{t("eduTitle")}</p>
        <p className="text-sm italic">110/110 cum laude</p>
        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          {t("eduThesis")}
        </p>
      </ScrollSection>

      <ScrollSection id="roles" title={t("roles")}>
        <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-300">
          <li>{t("roles1")}</li>
          <li>{t("roles2")}</li>
          <li>{t("roles3")}</li>
          <li>{t("roles4")}</li>
        </ul>
      </ScrollSection>

      <ScrollSection id="contact" title={t("contact")}>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <a
            href="https://linkedin.com/in/bruno-di-marco-b1bb4a1a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg transition-all duration-300"
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:bruno.dimarco@outlook.com"
            className="flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition-all duration-300"
          >
            <FaEnvelope size={20} />
            <span>Email</span>
          </a>
          {/* <a
            href="/BrunoDiMarco_CV.pdf"
            download
            className="inline-flex items-center px-5 py-2 mt-4 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white shadow-lg transition-all duration-300"
          >
            <FaDownload className="mr-2" />
            Download CV
          </a>*/}
        </div>
      </ScrollSection>

      <footer className="text-center text-sm text-gray-400 dark:text-gray-600 py-12">
        <p>{t("motto")}</p>
      </footer>
    </main>
  );
}
