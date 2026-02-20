import { motion } from 'motion/react';
import { Card } from './Card';

interface Technology {
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
}

const technologies: Technology[] = [
  {
    name: 'React 18',
    icon: '⚛️',
    description: 'Modern UI library with hooks',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'TypeScript',
    icon: '📘',
    description: 'Type-safe development',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Vite',
    icon: '⚡',
    description: 'Lightning-fast build tool',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Tailwind CSS',
    icon: '🎨',
    description: 'Utility-first styling',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    name: 'Motion',
    icon: '✨',
    description: 'Smooth animations',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    name: 'React Router',
    icon: '🗺️',
    description: 'Client-side routing',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    name: 'Recharts',
    icon: '📊',
    description: 'Data visualization',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    name: 'Fuse.js',
    icon: '🔍',
    description: 'Fuzzy search engine',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'Lucide Icons',
    icon: '🎭',
    description: 'Beautiful icon library',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    name: 'Sonner',
    icon: '🔔',
    description: 'Toast notifications',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
];

export function TechStack() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4 border border-emerald-200">
            <span className="text-lg">⚙️</span>
            Built with Modern Tech
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by the Best Tools
          </h2>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            FreshList is built with cutting-edge technologies to deliver a fast, 
            reliable, and delightful user experience.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
            >
              <Card
                variant="bordered"
                padding="md"
                className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl ${tech.bgColor} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  
                  {/* Name */}
                  <h3 className={`font-semibold text-base mb-1 ${tech.color}`}>
                    {tech.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-br from-emerald-600 to-lime-500 bg-clip-text text-transparent mb-1">
              100%
            </div>
            <div className="text-sm text-[var(--text-secondary)]">TypeScript</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
              &lt;100ms
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Load Time</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent mb-1">
              60fps
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Animations</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text text-transparent mb-1">
              A+
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Performance</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}