export const Footer = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target && (window as any).lenis) {
      (window as any).lenis.scrollTo(target);
    }
  };

  return (
    <footer className="bg-brand-dark pt-20 pb-10 px-6 lg:px-16 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-16">
        <div className="flex items-center justify-center space-x-2 mb-4 cursor-pointer hover:scale-110 transition-transform" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg className="w-8 h-8 transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 8H9L12 2Z" />
            <rect x="10" y="8" width="4" height="8" />
            <path d="M6 10H8V14H6V10Z" />
            <path d="M16 10H18V14H16V10Z" />
            <circle cx="12" cy="18" r="2" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold tracking-widest mb-4">HORIZON 2026</h3>
        <p className="text-brand-gray text-xs text-center max-w-sm leading-relaxed">
          Horizon is an interstellar aerospace manufacturing and space exploration company.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-16 mb-16 text-sm">
        <div>
          <h4 className="font-bold tracking-widest uppercase mb-6">Explore</h4>
          <ul className="space-y-4 text-brand-gray">
            <li><a href="#technology" onClick={(e) => handleScroll(e, '#technology')} className="hover:text-brand-cyan transition-colors">Technology</a></li>
            <li><a href="#missions" onClick={(e) => handleScroll(e, '#missions')} className="hover:text-brand-cyan transition-colors">Missions</a></li>
            <li><a href="#features" onClick={(e) => handleScroll(e, '#features')} className="hover:text-brand-cyan transition-colors">Features</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest uppercase mb-6">Network</h4>
          <ul className="space-y-4 text-brand-gray">
            <li><a href="#network" onClick={(e) => handleScroll(e, '#network')} className="hover:text-brand-cyan transition-colors">Galactic Reach</a></li>
            <li><a href="#network" onClick={(e) => handleScroll(e, '#network')} className="hover:text-brand-cyan transition-colors">Launchpads</a></li>
            <li><a href="#network" onClick={(e) => handleScroll(e, '#network')} className="hover:text-brand-cyan transition-colors">Relays</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest uppercase mb-6">Company</h4>
          <ul className="space-y-4 text-brand-gray">
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">About</a></li>
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">Careers</a></li>
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest uppercase mb-6">Legal</h4>
          <ul className="space-y-4 text-brand-gray">
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">Privacy</a></li>
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">Terms</a></li>
            <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-cyan transition-colors">Security</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-brand-gray">
        <div className="mb-4 md:mb-0">
          Horizon © 2026
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 rounded-full border border-brand-gray flex items-center justify-center text-[10px]">C</span>
          <div className="flex flex-col">
            <span className="font-bold text-white">Created by Mehtab Hassan</span>
            <span className="text-[10px] text-brand-cyan">AI Engineer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
