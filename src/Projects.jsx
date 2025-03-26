// Projects.jsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "MedBase",
    badge: "🩺 Clinical AI",
    description:
      "AI-powered tool for General Practitioners. JSON-based logic engine, probabilistic reasoning, confidence scoring.",
    stack: ["React", "Supabase", "Bootstrap", "Docker"],
    image: "/images/medbase.png",
  },
  {
    title: "Alzheimer's Progression Prediction",
    badge: "🧠 ML Model",
    description:
      "Thesis project classifying Alzheimer decline speed using SVM, RF, XGBoost and biomarkers from ADNI and real-world cohort.",
    stack: ["Python", "Random Forest", "SVM", "Scikit-learn", "ADNI"],
    image: "/images/ML.png",
  },
];

export default function Projects() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02, rotate: -1 }}
          className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 rounded-2xl shadow-xl transition-all duration-300"
        >
          {/* Immagine di anteprima */}
          {project.image && (
            <div className="mb-4 overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
          )}

          <div className="text-sm mb-2 text-fuchsia-500 font-semibold">
            {project.badge}
          </div>
          <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-gray-800 dark:text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
