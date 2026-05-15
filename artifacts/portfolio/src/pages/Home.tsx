import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import AISection from "@/components/sections/AISection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative z-10 w-full flex flex-col items-center">
      <Hero />
      <div className="w-full max-w-6xl px-6 md:px-12 flex flex-col gap-32 pb-32">
        <About />
        <Skills />
        <Projects />
        <AISection />
        <Contact />
      </div>
    </main>
  );
}
