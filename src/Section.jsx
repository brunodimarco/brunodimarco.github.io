import { motion } from "framer-motion";

export default function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="scroll-mt-20"
    >
      <h2 className="text-2xl font-semibold mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </motion.section>
  );
}
