import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2023', title: 'Horizon Alpha', desc: 'Initial orbital test flights.' },
  { year: '2025', title: 'Lunar Base', desc: 'Establishing the first permanent lunar colony.' },
  { year: '2028', title: 'Mars Transit', desc: 'First crewed mission to Mars orbit.' },
  { year: '2032', title: 'Deep Space Network', desc: 'Deploying comm relays to Jupiter.' },
];

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
    
    // Animate the vertical line drawing down
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    // Fade in milestones as the line reaches them
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="missions" ref={sectionRef} className="py-32 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6">Mission Timeline</h2>
        <p className="text-brand-gray max-w-2xl mx-auto text-sm leading-relaxed">
          Tracing our trajectory from Earth orbit to deep space exploration.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* The central vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
          <div ref={lineRef} className="absolute top-0 w-full h-full bg-brand-cyan shadow-[0_0_15px_rgba(0,168,255,0.5)]"></div>
        </div>

        <div className="flex flex-col space-y-16 relative">
          {milestones.map((ms, i) => (
            <div key={ms.year} className={`timeline-item flex flex-col md:flex-row items-start md:items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:block md:w-1/2"></div>
              
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-cyan transform -translate-x-[7px] md:-translate-x-1/2 z-10"></div>
              
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                <span className="text-brand-cyan font-bold tracking-widest mb-2 block">{ms.year}</span>
                <h3 className="text-2xl font-display font-bold mb-2">{ms.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
