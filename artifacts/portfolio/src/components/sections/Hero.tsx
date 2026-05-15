import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(0,255,255,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(157,0,255,0.06),transparent)]" />
      </div>

      <motion.div
        className="z-10 text-center max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-secondary/40 bg-secondary/5 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-secondary tracking-widest uppercase">Online & Available</span>
        </motion.div>

        <h1 className="text-7xl md:text-[9rem] font-bold mb-2 tracking-tighter leading-none">
          <span className="glitch-wrapper block">
            <span className="glitch-text text-foreground font-sans" data-text="VICTOR">VICTOR</span>
          </span>
          <span className="glitch-wrapper block mt-1">
            <span className="glitch-text font-sans" data-text="HARTUNG" style={{
              background: 'linear-gradient(135deg, #00ffff 0%, #9d00ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>HARTUNG</span>
          </span>
        </h1>

        <motion.div
          className="mt-6 mb-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <p className="text-base md:text-lg font-mono text-muted-foreground tracking-[0.3em] uppercase">
            Web Designer<span className="text-primary mx-2">/</span>Developer
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-secondary/60" />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <button
            onClick={scrollToContact}
            className="relative group px-8 py-3.5 font-mono text-sm font-bold tracking-widest text-background overflow-hidden rounded-md transition-all"
            style={{
              background: 'linear-gradient(135deg, #00ffff, #0088ff)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
            }}
          >
            <span className="relative z-10">INICIAR CONTATO</span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </button>

          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 font-mono text-sm font-bold tracking-widest text-primary border border-primary/40 rounded-md bg-transparent hover:bg-primary/10 hover:border-primary/80 transition-all neon-border"
          >
            VER PROJETOS
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col gap-1 items-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary/80 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00ffff]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
