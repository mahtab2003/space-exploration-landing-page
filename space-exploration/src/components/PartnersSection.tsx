import { motion } from 'framer-motion';

const partners = [
  'NASA', 'SpaceX', 'Blue Origin', 'ESA', 'JAXA', 'Roscosmos', 'ISRO',
  'NASA', 'SpaceX', 'Blue Origin', 'ESA', 'JAXA', 'Roscosmos', 'ISRO',
];

export const PartnersSection = () => {
  return (
    <section className="py-16 border-y border-white/5 bg-brand-light overflow-hidden flex flex-col items-center">
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-8 block text-center">
        Trusted by global agencies
      </span>
      
      <div className="w-full flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
          className="flex space-x-16 px-8 items-center"
        >
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl md:text-3xl font-display font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
