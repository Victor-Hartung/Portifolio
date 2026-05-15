import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { name: 'HTML', category: 'core' },
  { name: 'CSS', category: 'core' },
  { name: 'JavaScript', category: 'core' },
  { name: 'TypeScript', category: 'core' },
  { name: 'React', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Git', category: 'tooling' },
  { name: 'Databases', category: 'backend' },
  { name: 'APIs', category: 'backend' },
];

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
  };

  return (
    <section id="skills" className="relative py-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-grow bg-gradient-to-l from-border to-transparent" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-right">
            ARSENAL <span className="text-secondary neon-text-violet">.02</span>
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SKILLS.map((skill, index) => (
            <motion.div 
              key={skill.name}
              variants={item}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col justify-center items-center p-8 bg-card/40 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden neon-border transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors group-hover:neon-text-cyan z-10">
                  {skill.name}
                </div>
                
                {/* Decorative circuit lines */}
                <svg className="absolute bottom-0 right-0 w-12 h-12 opacity-10 group-hover:opacity-40 transition-opacity text-primary" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M100 100 L50 50 L50 0 M100 80 L70 50 L0 50" />
                </svg>
              </div>
            </motion.div>
          ))}
          
          {/* Decorative empty grid item */}
          <motion.div 
            variants={item}
            className="hidden lg:flex relative h-full flex-col justify-center items-center p-8 border border-white/5 border-dashed rounded-lg opacity-50"
          >
            <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-secondary rounded-full" />
            </div>
            <div className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              AWAITING_INPUT
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
