import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: 'NEXUS_PROTOCOL',
    description: 'A decentralized data routing protocol designed for high-frequency trading networks. Features sub-millisecond latency and cryptographic verification.',
    tags: ['React', 'Node.js', 'TypeScript', 'WebSockets'],
    theme: 'primary' // Cyan
  },
  {
    title: 'VOID_INTERFACE',
    description: 'Dark-web inspired administrative dashboard for complex server farm management. Incorporates real-time metrics and anomalous activity detection.',
    tags: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL'],
    theme: 'secondary' // Violet
  },
  {
    title: 'SYNAPSE_GRID',
    description: 'Visual logic mapper for composing automated workflows. Users connect operational nodes on an infinite canvas to script background processes.',
    tags: ['TypeScript', 'Canvas API', 'Express', 'Redis'],
    theme: 'primary' // Cyan
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-primary neon-text-cyan">03.</span> ARCHIVES
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`group relative h-full flex flex-col bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 ${project.theme === 'primary' ? 'neon-border' : 'neon-border-violet'}`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-b ${project.theme === 'primary' ? 'from-primary' : 'from-secondary'} to-transparent`} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3 rounded-lg bg-background border ${project.theme === 'primary' ? 'border-primary/30 text-primary' : 'border-secondary/30 text-secondary'}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="#" className={`text-muted-foreground transition-colors ${project.theme === 'primary' ? 'hover:text-primary hover:neon-text-cyan' : 'hover:text-secondary hover:neon-text-violet'}`}>
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <h3 className={`text-xl font-bold font-mono mb-4 transition-colors ${project.theme === 'primary' ? 'group-hover:text-primary group-hover:neon-text-cyan' : 'group-hover:text-secondary group-hover:neon-text-violet'}`}>
                {project.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
