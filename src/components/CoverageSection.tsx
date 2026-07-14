import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CoverageSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo('.coverage-map', 
      { scale: 0.8, opacity: 0, rotationX: 10, y: 50 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 1,
        opacity: 1,
        rotationX: 0,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section id="network" ref={sectionRef} className="py-24 px-6 lg:px-16 flex flex-col items-center justify-center bg-grid relative border-t border-white/5">
      <div className="text-center max-w-3xl z-10 mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest uppercase mb-6">
          Galactic Reach
        </h2>
        <p className="text-brand-gray text-sm md:text-base leading-relaxed">
          Horizon provides launch capabilities and orbital relay solutions with unmatched precision around the globe. Power your deep space operations with our worldwide network of launchpads and telemetry arrays.
        </p>
      </div>

      <div className="w-full max-w-6xl relative z-10 coverage-map">
        {/* Placeholder since we don't have the map image, using a generic frame */}
        <img src={new URL('../assets/hero-frames/ezgif-frame-200.jpg', import.meta.url).href} alt="Global Coverage Map" className="w-full h-auto object-contain drop-shadow-2xl opacity-90 rounded-2xl" />
      </div>
    </section>
  );
};
