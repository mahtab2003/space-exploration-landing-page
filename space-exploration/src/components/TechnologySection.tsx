import { motion } from 'framer-motion';
import { Rocket, Satellite, Zap, Shield, Cpu, Activity } from 'lucide-react';

const technologies = [
  {
    icon: <Rocket className="w-8 h-8 text-brand-cyan" />,
    title: 'Propulsion Systems',
    description: 'Next-generation hybrid-ion thrusters for interplanetary travel.',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
  {
    icon: <Shield className="w-8 h-8 text-brand-cyan" />,
    title: 'Hull Integrity',
    description: 'Adaptive titanium shielding against micro-meteorites.',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand-cyan" />,
    title: 'Quantum Computing',
    description: 'Instantaneous trajectory calculations and navigation modeling.',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    icon: <Activity className="w-8 h-8 text-brand-cyan" />,
    title: 'Life Support',
    description: 'Closed-loop oxygen and water reclamation systems for deep space.',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-1',
  },
  {
    icon: <Satellite className="w-8 h-8 text-brand-cyan" />,
    title: 'Orbital Comm',
    description: 'Low-latency deep space communication array.',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
  },
  {
    icon: <Zap className="w-8 h-8 text-brand-cyan" />,
    title: 'Energy Generation',
    description: 'Zero-point energy harnessing for continuous power.',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-2',
  },
];

export const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto bg-brand-dark">
      <div className="text-center mb-16">
        <span className="text-xs font-bold tracking-widest uppercase text-brand-cyan mb-2 block">Technology</span>
        <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6">Our Capabilities</h2>
        <p className="text-brand-gray max-w-2xl mx-auto text-sm leading-relaxed">
          Leveraging state-of-the-art materials and quantum calculations to guarantee safety, speed, and precision in the cosmos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`relative group rounded-xl p-[1px] overflow-hidden ${tech.colSpan}`}
          >
            {/* Colorful animated border that reveals on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan via-purple-500 to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{ backgroundSize: '200% 100%', animation: 'gradient-x 3s linear infinite' }}></div>
            
            {/* Inner card */}
            <div className="relative h-full bg-brand-dark/95 backdrop-blur-sm p-8 rounded-xl flex flex-col justify-between border border-white/10 group-hover:border-transparent transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              
              <motion.div 
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                className="mb-6 relative z-10"
              >
                {tech.icon}
              </motion.div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold tracking-wider mb-2">{tech.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{tech.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
