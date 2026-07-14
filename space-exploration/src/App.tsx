import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import SpaceHero from './components/SpaceHero';
import { TechnologySection } from './components/TechnologySection';
import { TimelineSection } from './components/TimelineSection';
import { PartnersSection } from './components/PartnersSection';
import { BlogSection } from './components/BlogSection';
import { CoverageSection } from './components/CoverageSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scroll and link it to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className="w-full bg-brand-dark min-h-screen font-sans antialiased selection:bg-brand-cyan selection:text-white">
      <Navbar />
      <main>
        {/* The tall GSAP Frame Animation section acting as our expansive Hero */}
        <SpaceHero />
        
        {/* Elite New Sections */}
        <PartnersSection />
        <TechnologySection />
        <TimelineSection />
        
        {/* Pre-existing Sections */}
        <FeaturesSection />
        <CoverageSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
