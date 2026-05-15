import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "MENSAGEM ENVIADA",
        description: "Sua mensagem foi recebida. Em breve retorno o contato.",
        className: "bg-background border-primary text-primary font-mono",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const SOCIAL_LINKS = [
    { name: 'GitHub', icon: <Github size={20} />, href: '#', color: 'primary' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: '#', color: 'secondary' },
    { name: 'Instagram', icon: <Instagram size={20} />, href: '#', color: 'primary' },
    { name: 'WhatsApp', icon: <MessageSquare size={20} />, href: '#', color: 'secondary' }
  ];

  return (
    <section id="contact" className="relative py-20 border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-primary to-transparent" />
          <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
            <span className="text-secondary neon-text-violet">05.</span> CONTATO
          </h2>
          <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-primary to-transparent" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-24">
          
          {/* Link Bio Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-mono font-bold text-foreground mb-4">LINKS DIRETOS</h3>
              <p className="text-muted-foreground">Conecte-se pelas redes abaixo ou envie uma mensagem.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className={`flex items-center justify-between p-4 rounded-lg bg-card/30 border border-white/5 backdrop-blur-sm transition-all duration-300 group ${link.color === 'primary' ? 'hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]' : 'hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-[0_0_15px_rgba(157,0,255,0.15)]'}`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`flex items-center gap-4 ${link.color === 'primary' ? 'group-hover:text-primary' : 'group-hover:text-secondary'} transition-colors`}>
                    {link.icon}
                    <span className="font-mono font-bold tracking-wider">{link.name}</span>
                  </div>
                  <ExternalLinkArrow color={link.color} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden neon-border">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              
              <h3 className="text-2xl font-mono font-bold text-foreground mb-8 relative z-10">FORMULÁRIO DE CONTATO</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Nome</label>
                    <input 
                      id="name" 
                      required 
                      className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50" 
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">E-mail</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50" 
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Mensagem</label>
                  <textarea 
                    id="message" 
                    required 
                    rows={5}
                    className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50" 
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full relative group px-6 py-4 font-mono text-sm font-bold tracking-widest text-background overflow-hidden rounded-md bg-primary transition-all disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
                    {!isSubmitting && <Send size={16} />}
                  </span>
                  <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0" />
                </button>
              </form>
            </div>
          </div>

        </div>
        
        <div className="mt-32 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VICTOR HARTUNG. TODOS OS DIREITOS RESERVADOS.
          </div>
          <div className="text-[10px] font-mono text-primary/40 uppercase tracking-widest">
            Feito com dedicação
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExternalLinkArrow({ color }: { color: string }) {
  return (
    <svg 
      className={`w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity ${color === 'primary' ? 'group-hover:text-primary' : 'group-hover:text-secondary'}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}
