import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-primary neon-text-cyan">01.</span> SOBRE
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <div className="space-y-5 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>
                Sou <span className="text-foreground font-semibold">Victor Hartung</span>, designer e desenvolvedor web com 4 anos de experiência construindo interfaces que comunicam, convertem e ficam na memória.
              </p>
              <p>
                Meu trabalho vive na interseção entre design e código — onde a estética precisa funcionar e a função precisa ser bela. Cada projeto começa com uma pergunta: <span className="text-primary italic">o que essa página precisa fazer sentir?</span>
              </p>
              <p>
                Trabalho com marcas, produtos e profissionais que entendem que presença digital não é apenas existir, é <span className="text-foreground font-semibold">impactar</span>.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {['Web Design', 'UI/UX', 'Frontend Dev', 'Identidade Visual', 'Motion'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-mono text-primary border border-primary/30 rounded-full bg-primary/5 hover:bg-primary/15 hover:border-primary/70 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              className="relative p-6 rounded-xl border border-white/8 bg-card/30 backdrop-blur-sm overflow-hidden"
              whileHover={{ borderColor: 'rgba(0,255,255,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/8 rounded-full blur-3xl" />

              <div className="font-mono text-[10px] text-primary mb-6 tracking-widest">VICTOR_HARTUNG.json</div>

              <div className="space-y-5 relative z-10">
                {[
                  { label: 'Função', value: 'Web Designer & Dev' },
                  { label: 'Experiência', value: '4 anos' },
                  { label: 'Foco', value: 'Interfaces de impacto' },
                  { label: 'Status', value: 'Disponível' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
                    <span className="text-sm font-semibold text-foreground font-mono">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                STATUS: OPERATIONAL
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
