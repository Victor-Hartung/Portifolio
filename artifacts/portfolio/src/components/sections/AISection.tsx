import React from 'react';
import { motion } from 'framer-motion';
import NeuralBrain from '@/components/NeuralBrain';

export default function AISection() {
  return (
    <section id="intelligence" className="relative py-20 min-h-[80vh] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="grid lg:grid-cols-2 gap-16 items-center"
      >
        <div className="order-2 lg:order-1 relative h-[500px] w-full rounded-2xl border border-white/5 bg-black/50 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] isolate">
          {/* Container for the neural brain visualization */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(157,0,255,0.1),transparent_70%)]" />
          
          <NeuralBrain />
          
          <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 border border-primary/20 text-[10px] font-mono text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              NEURAL_NET_ACTIVE
            </span>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                INTELLIGENCE <span className="text-primary neon-text-cyan">.04</span>
              </h2>
            </div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-primary to-transparent mb-8" />
          </div>

          <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
            <p className="text-foreground font-medium">
              AI is a paradigm shift. It is part of my technical landscape, and I understand how these systems work.
            </p>
            <p>
              The boundary between developer and machine is blurring. My approach is not to resist this evolution, but to integrate it. I leverage artificial intelligence as a potent tool to augment my capabilities, analyze complex data structures, and optimize logic.
            </p>
            <p>
              I comprehend the underlying mechanics — the nodes, the weights, the probabilistic outputs. This allows me to utilize AI models deliberately and securely, architecting solutions that are augmented by intelligence, governed by human intent.
            </p>
          </div>

          <div className="pt-6">
            <div className="font-mono text-sm text-secondary mb-4 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-secondary" />
              CAPABILITIES
            </div>
            <div className="flex gap-4 flex-wrap">
              {['Model Integration', 'Prompt Engineering', 'Semantic Search', 'Automated Workflows'].map((cap, i) => (
                <div key={i} className="px-4 py-2 border border-white/10 rounded-sm bg-white/5 text-sm font-mono text-foreground hover:border-secondary/50 hover:bg-secondary/10 transition-colors">
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
