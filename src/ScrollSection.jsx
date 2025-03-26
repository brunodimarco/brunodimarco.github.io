// ScrollSection.jsx
import { motion } from "framer-motion";

export default function ScrollSection({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="scroll-mt-20 py-24 max-w-5xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-fuchsia-500 via-orange-400 to-sky-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div>{children}</div>
    </motion.section>
  );
}
