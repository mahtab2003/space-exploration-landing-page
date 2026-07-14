import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FeatureBlock = ({ tagline, title, description, buttonText, imageSrc, reverse = false }: any) => {
  const blockRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(blockRef.current,
      { opacity: 0, x: reverse ? 100 : -100, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: blockRef.current,
          start: 'top 80%',
        },
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
  }, [reverse]);

  return (
    <div ref={blockRef} className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 py-20`}>
      <div className="w-full lg:w-1/2 flex flex-col items-start">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-8 h-[2px] bg-brand-cyan"></div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gray">{tagline}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wide leading-tight mb-6">
          {title}
        </h2>
        <p className="text-brand-gray text-sm leading-loose mb-8">
          {description}
        </p>
        <button className="px-8 py-3 bg-brand-cyan text-white font-bold text-sm tracking-wide hover:bg-[#0090dd] transition-colors rounded-sm">
          {buttonText}
        </button>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="relative p-1">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent blur-2xl"></div>
          <img
            src={imageSrc}
            alt={title}
            className="relative z-10 w-full h-auto object-cover rounded-sm shadow-2xl border border-white/5"
          />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => (
  <section id="features" className="px-6 lg:px-16 max-w-7xl mx-auto divide-y divide-white/5">
    <FeatureBlock
      tagline="Our Mission"
      title="Life Beyond Earth?"
      description="With our species poised to become multi-planetary, the boundaries of exploration have expanded. Astronauts and colonists at the edge of the solar system can now rely on Horizon's infrastructure to sustain life and propel further discovery."
      buttonText="EXPLORE"
      imageSrc={new URL('../assets/hero-frames/ezgif-frame-110.jpg', import.meta.url).href}
    />
    <FeatureBlock
      tagline="Our Capabilities"
      title="Innovation"
      description="Horizon uses thousands of micro-satellites and deep space relays scattered across low orbit to provide continuous telemetry and navigation data. This allows us to track trajectories with pinpoint accuracy and drastically reduce mission risk."
      buttonText="LEARN MORE"
      imageSrc={new URL('../assets/hero-frames/ezgif-frame-120.jpg', import.meta.url).href}
      reverse={true}
    />
    <FeatureBlock
      tagline="Our Solution"
      title="Looking For Speed?"
      description="A slow transit that takes months or years is the biggest hurdle to deep space colonization. Therefore, Horizon has developed hybrid-ion propulsion solutions that allow you to reach Mars in record time, with no deceleration frustration attached."
      buttonText="SHOW ME"
      imageSrc={new URL('../assets/hero-frames/ezgif-frame-130.jpg', import.meta.url).href}
    />
    <FeatureBlock
      tagline="Our Promise"
      title="Safety Is Important"
      description="Orbital debris and cosmic radiation pervade every mission and aren't always predictable. Increasing extraterrestrial travel means a much larger hazard vector than in the past. Learn more about our advanced kinetic shielding and safety protocols."
      buttonText="LEARN MORE"
      imageSrc={new URL('../assets/hero-frames/ezgif-frame-140.jpg', import.meta.url).href}
      reverse={true}
    />
  </section>
);
