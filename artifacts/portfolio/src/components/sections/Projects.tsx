import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: 'NEXUS PROTOCOL',
    description: 'Dashboard administrativo para gestão de redes distribuídas. Interface densa em dados com visualizações em tempo real e controle granular de permissões.',
    tags: ['React', 'Node.js', 'TypeScript', 'WebSockets'],
    theme: 'primary',
  },
  {
    title: 'VOID INTERFACE',
    description: 'Plataforma de gestão visual com métricas ao vivo e painel de monitoramento. Foco em performance e clareza de informação para operações críticas.',
    tags: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'GraphQL'],
    theme: 'secondary',
  },
  {
    title: 'SYNAPSE GRID',
    description: 'Ferramenta visual de automação de fluxos de trabalho. Usuários conectam nós em um canvas infinito para compor processos em background.',
    tags: ['TypeScript', 'Canvas API', 'Express', 'Redis'],
    theme: 'primary',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-primary neon-text-cyan">03.</span> PROJETOS
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`group relative h-full flex flex-col rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-2 ${project.theme === 'primary' ? 'neon-border' : 'neon-border-violet'}`}
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: project.theme === 'primary'
                    ? 'radial-gradient(circle at top left, rgba(0,255,255,0.05) 0%, transparent 60%)'
                    : 'radial-gradient(circle at top left, rgba(157,0,255,0.05) 0%, transparent 60%)',
                }}
              />

              <div className="p-7 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      border: `1px solid ${project.theme === 'primary' ? 'rgba(0,255,255,0.3)' : 'rgba(157,0,255,0.3)'}`,
                      background: project.theme === 'primary' ? 'rgba(0,255,255,0.05)' : 'rgba(157,0,255,0.05)',
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ background: project.theme === 'primary' ? '#00ffff' : '#9d00ff', opacity: 0.8 }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-github-${i}`}>
                      <Github size={18} />
                    </a>
                    <a
                      href="#"
                      className={`text-muted-foreground transition-colors ${project.theme === 'primary' ? 'hover:text-primary' : 'hover:text-secondary'}`}
                      data-testid={`link-external-${i}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <h3
                  className={`text-lg font-bold font-mono mb-3 transition-colors duration-300 ${project.theme === 'primary' ? 'group-hover:text-primary' : 'group-hover:text-secondary'}`}
                >
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-7 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs font-mono px-2.5 py-1 rounded-sm bg-white/4 text-muted-foreground border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
