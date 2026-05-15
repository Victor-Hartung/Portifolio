import { motion } from 'framer-motion';
import NeuralBrain from '@/components/NeuralBrain';

export default function AISection() {
  return (
    <section id="intelligence" className="relative py-24 min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-4 mb-14">
          <div className="h-[1px] flex-grow bg-gradient-to-l from-border to-transparent" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-right">
            INTELIGÊNCIA <span className="text-secondary neon-text-violet">.04</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Neural Brain Canvas */}
          <motion.div
            className="order-2 lg:order-1 relative rounded-2xl overflow-hidden"
            style={{
              height: '520px',
              background: 'radial-gradient(ellipse at center, rgba(10,0,30,0.98) 0%, rgba(3,3,15,1) 100%)',
              border: '1px solid rgba(157,0,255,0.2)',
              boxShadow: '0 0 60px rgba(157,0,255,0.1), inset 0 0 60px rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(157,0,255,0.07),transparent_70%)] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,255,255,0.04),transparent_60%)] pointer-events-none z-0" />

            <NeuralBrain />

            <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-secondary/30 text-[10px] font-mono text-secondary backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                REDE NEURAL ATIVA
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
              <span className="text-[9px] font-mono text-muted-foreground/50 tracking-widest">
                MOVA / CLIQUE PARA INTERAGIR
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-5 text-lg text-muted-foreground font-sans leading-relaxed">
              <p className="text-foreground font-semibold text-xl">
                A inteligência artificial não é futuro — é parte do presente técnico de qualquer desenvolvedor que pensa à frente.
              </p>
              <p>
                Compreendo como esses sistemas funcionam: os modelos, os pesos, as saídas probabilísticas. Esse entendimento me permite trabalhar com tecnologia de forma mais estratégica e deliberada — integrando o que faz sentido, descartando o que não serve.
              </p>
              <p>
                No meu trabalho, IA é uma camada do conhecimento técnico — assim como CSS, lógica de programação ou arquitetura de sistemas. Uma ferramenta que, quando bem compreendida, amplia o que é possível construir.
              </p>
            </div>

            <div className="pt-4">
              <div className="font-mono text-xs text-secondary mb-5 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-secondary" />
                ÁREAS DE CONHECIMENTO
              </div>
              <div className="flex gap-3 flex-wrap">
                {['Integração de Modelos', 'Prompt Engineering', 'Busca Semântica', 'Automação Inteligente'].map((cap, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-2 border border-white/10 rounded-sm bg-white/3 text-sm font-mono text-foreground hover:border-secondary/60 hover:bg-secondary/10 hover:text-secondary transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    {cap}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
