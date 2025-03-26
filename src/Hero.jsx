import { motion } from "framer-motion";
import HeroNeurons from "./HeroNeurons";

export default function Hero({ theme }) {
  return (
    <section className="relative w-screen h-screen overflow-hidden text-center">
      {/* Canvas background */}
      <div className="absolute inset-0 z-0  bg-white dark:bg-black">
        <HeroNeurons theme={theme} />
      </div>

      {/* Overlay content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-fuchsia-500 via-orange-400 to-sky-400 bg-clip-text text-transparent">
          Bruno Di Marco
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Medical Doctor • Clinical AI Developer
        </p>
        <p className="mt-2 text-sm text-zinc-400 italic">
          “Turning medical complexity into technological simplicity.”
        </p>
      </motion.div>
    </section>
  );
}
