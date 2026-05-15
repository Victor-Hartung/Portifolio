import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <motion.div 
        className="z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          className="inline-block mb-4 px-4 py-1.5 rounded-full border neon-border-violet bg-background/50 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-sm font-mono text-secondary neon-text-violet">SYSTEM.INITIALIZE()</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="glitch-wrapper block">
            <span className="glitch-text text-foreground font-sans" data-text="ALEX">ALEX</span>
          </span>
          <span className="glitch-wrapper block mt-2">
            <span className="glitch-text text-foreground font-sans" data-text="CHEN">CHEN</span>
          </span>
        </h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground font-mono mt-8 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="text-primary neon-text-cyan">&lt;</span>
          FULL_STACK_DEVELOPER 
          <span className="text-primary neon-text-cyan"> /&gt;</span>
        </motion.p>
        
        <motion.button
          onClick={scrollToContact}
          className="relative group px-8 py-4 font-mono text-lg font-bold tracking-widest text-primary overflow-hidden rounded-md bg-background neon-border transition-all hover:bg-primary/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 neon-text-cyan">INITIATE_CONTACT</span>
          <div className="absolute inset-0 h-full w-0 bg-primary/20 transition-all duration-300 ease-out group-hover:w-full z-0" />
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
          animate={{ height: ["0rem", "3rem", "0rem"], opacity: [0, 1, 0], y: [0, 10, 20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
