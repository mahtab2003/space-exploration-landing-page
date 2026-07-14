import { useState } from 'react';
import { motion, AnimatePresence, type Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Hide navbar when scrolling down past 150px, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add background color when scrolled past the hero section (which is ~400vh tall)
    if (latest > (window.innerHeight * 3.8)) {
      setHasBackground(true);
    } else {
      setHasBackground(false);
    }
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants: Variants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const navLinks = [
    { name: 'Technology', href: '#technology' },
    { name: 'Missions', href: '#missions' },
    { name: 'Features', href: '#features' },
    { name: 'Network', href: '#network' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target && (window as any).lenis) {
      (window as any).lenis.scrollTo(target);
    }
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 px-6 py-4 lg:px-16 lg:py-6 flex justify-between items-center text-white transition-all duration-300 ${hasBackground
          ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
          }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-widest text-white z-50 relative cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* <span className="text-white/60">/</span> HORIZON 2023 */} HORIZON 2026
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-10 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="hover:text-brand-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Register
          </button>
        </div>

        <button onClick={toggleMenu} className="lg:hidden text-white z-50 relative">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col space-y-8 text-center mt-20">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={linkVariants}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-xl md:text-4xl font-display font-bold uppercase tracking-widest hover:text-brand-cyan transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={linkVariants} className="pt-8">
                <button
                  onClick={toggleMenu}
                  className="px-8 py-3 border border-white/50 rounded-full hover:bg-white hover:text-black transition-colors font-bold tracking-widest uppercase text-sm"
                >
                  Register Now
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
