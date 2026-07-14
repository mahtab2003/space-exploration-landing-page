import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CTASection = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.5)'
      }
    );
  }, []);

  return (
    <section className="relative py-32 mt-20 flex flex-col items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
        style={{ backgroundImage: `url(${new URL('../assets/hero-frames/ezgif-frame-240.jpg', import.meta.url).href})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark"></div>

      <div ref={ctaRef} className="relative z-10 flex flex-col items-center px-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest uppercase mb-10 text-glow">
          Ready For Launch?
        </h2>
        <button className="px-8 md:px-10 py-3 md:py-4 border border-white bg-transparent hover:bg-white hover:text-black transition-colors font-bold tracking-widest text-xs md:text-sm">
          INITIATE SEQUENCE
        </button>
      </div>
    </section>
  );
};
