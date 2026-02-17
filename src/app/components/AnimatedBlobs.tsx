import { motion } from 'motion/react';

export function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Mint */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--primary-400) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: '10%', left: '10%' }}
      />

      {/* Blob 2 - Lime */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--accent-400) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ top: '20%', right: '15%' }}
      />

      {/* Blob 3 - Coral */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--secondary-400) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ bottom: '10%', left: '20%' }}
      />

      {/* Blob 4 - Small accent */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-2xl"
        style={{
          background: 'radial-gradient(circle, var(--primary-300) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ bottom: '30%', right: '25%' }}
      />
    </div>
  );
}
