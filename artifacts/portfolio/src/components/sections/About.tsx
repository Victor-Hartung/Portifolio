import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-20">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            <span className="text-primary neon-text-cyan">01.</span> ABOUT_ME
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>
        
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
              <p>
                I am a web developer with 4 years of experience navigating the complex architecture of modern applications. My focus is on crafting resilient, scalable systems that feel electric and alive.
              </p>
              <p>
                I don't just write code; I architect digital experiences. Every line serves a purpose. Every component is meticulously designed to perform flawlessly under pressure. I thrive in the space where rigorous logic meets bleeding-edge design.
              </p>
              <p>
                The web is not static, and neither am I. I am constantly adapting, learning, and integrating new paradigms to ensure the systems I build are not just functional, but definitive.
              </p>
            </div>
            
            <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-md bg-secondary/10 border border-secondary/30 text-secondary font-mono text-sm shadow-[0_0_15px_rgba(157,0,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              STATUS: OPERATIONAL & READY FOR DEPLOYMENT
            </div>
          </div>
          
          <div className="md:col-span-4 relative flex justify-center">
            <div className="relative w-64 h-64 md:w-full md:h-80 border-l border-t border-primary/40 rounded-tl-3xl p-4 before:content-[''] before:absolute before:bottom-0 before:right-0 before:w-16 before:h-16 before:border-r before:border-b before:border-secondary/40 before:rounded-br-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
              <div className="w-full h-full bg-card/50 backdrop-blur-sm border border-white/5 rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />
                
                <div className="font-mono text-xs text-primary mb-4">PROFILE_DATA</div>
                
                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Class</div>
                    <div className="font-bold text-foreground">Engineer</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Experience</div>
                    <div className="font-bold text-foreground">4 Cycles</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Alignment</div>
                    <div className="font-bold text-foreground">Chaotic Good</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
