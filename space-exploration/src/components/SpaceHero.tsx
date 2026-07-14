import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticlesBackground } from './ParticlesBackground';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const getFrameUrl = (index: number) => {
  return new URL(`../assets/hero-frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`, import.meta.url).href;
};

export default function SpaceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = getFrameUrl(i + 1);
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
            resolve(img);
          };
          img.onerror = () => {
            loadedCount++;
            resolve(img);
          };
          loadedImages.push(img);
        });
      });

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  // Set up ScrollTrigger and rendering
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameIndexRef.current);
    };

    const renderFrame = (index: number) => {
      const imageIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(index)));
      const img = images[imageIndex];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.5;
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    };

    const currentFrameIndexRef = { current: 0 };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animationObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    tl.to(animationObj, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate: () => {
        currentFrameIndexRef.current = animationObj.frame;
        renderFrame(animationObj.frame);
      }
    });

    // Handle text overlays (exclusive visibility)
    const groups = gsap.utils.toArray<HTMLElement>('.scroll-text-group');
    
    // Group 1: 0% to 25% (Visible initially, fades out)
    gsap.fromTo(groups[0],
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'top+=' + (100 / 4) + '% top',
          scrub: true,
        }
      }
    );

    // Group 2: 25% to 50%
    gsap.fromTo(groups[1],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=' + (100 / 4) + '% top',
          end: 'top+=' + (100 / 2.5) + '% top',
          scrub: true,
        }
      }
    );
    gsap.to(groups[1], {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top+=' + (100 / 2.5) + '% top',
        end: 'top+=' + (100 / 2) + '% top',
        scrub: true,
      }
    });

    // Group 3: 50% to 75%
    gsap.fromTo(groups[2],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top+=' + (100 / 2) + '% top',
          end: 'top+=' + (100 / 1.5) + '% top',
          scrub: true,
        }
      }
    );
    gsap.to(groups[2], {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top+=' + (100 / 1.5) + '% top',
        end: 'top+=' + (100 / 1.2) + '% top',
        scrub: true,
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  if (!isLoaded) {
    let statusText = "INITIATING UPLINK...";
    if (loadingProgress > 25) statusText = "CALIBRATING ORBITAL TRAJECTORIES...";
    if (loadingProgress > 50) statusText = "SYNCHRONIZING PROPULSION SYSTEMS...";
    if (loadingProgress > 75) statusText = "FINAL PRE-FLIGHT CHECKS...";
    if (loadingProgress === 100) statusText = "SYSTEMS NOMINAL. READY FOR LAUNCH.";

    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-brand-dark text-white z-50 px-4">
        <div className="text-center w-full max-w-lg">
          <h2 className="text-lg md:text-xl font-display font-bold tracking-[0.2em] text-brand-cyan mb-6 text-glow uppercase h-8">
            {statusText}
          </h2>
          <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden border border-white/10 relative">
            <div 
              className="bg-brand-cyan h-full transition-all duration-300 shadow-[0_0_15px_rgba(0,168,255,0.8)]"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-xs font-sans mt-4 text-brand-gray tracking-widest font-mono">
            [ T-MINUS: {100 - loadingProgress} SECONDS ]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-brand-dark">
        {/* Background Particles Layer */}
        <ParticlesBackground />
        
        {/* The Frame Animation Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-screen opacity-70" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/50 to-brand-dark z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-radial-gradient from-brand-cyan/10 to-transparent opacity-50 z-0 pointer-events-none"></div>

        {/* OVERLAY SECTION 1 (Visible immediately) */}
        <section className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none scroll-text-group px-4 pt-16">
          <div className="flex flex-col items-center text-center max-w-5xl pointer-events-auto">
            <div className="flex flex-col items-center mb-4 md:mb-8">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-2">Explore</span>
              <div className="w-6 md:w-8 h-[2px] bg-white/50"></div>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-display font-light tracking-[0.1em] leading-none mb-6 md:mb-8 text-glow select-none">
              HORIZON
            </h1>

            <p className="max-w-xs md:max-w-md text-brand-gray text-xs sm:text-sm md:text-base leading-relaxed mb-8 md:mb-10">
              Horizon is the next generation of platforms to solve all your problems. Register to stay in the loop.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button className="px-6 py-3 md:px-8 bg-white text-black rounded-full font-semibold text-xs md:text-sm hover:bg-gray-200 transition-colors w-full sm:w-auto">
                Register
              </button>
              <button className="px-6 py-3 md:px-8 border border-white/30 rounded-full font-semibold text-xs md:text-sm hover:bg-white/10 transition-colors w-full sm:w-auto">
                Request info
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-6 md:bottom-10 animate-bounce pointer-events-auto">
            <button className="w-8 h-8 md:w-10 md:h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/50">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </button>
          </div>
        </section>

        {/* OVERLAY SECTION 2 */}
        <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 pointer-events-none scroll-text-group px-6 lg:px-16 opacity-0">
           <div className="max-w-2xl text-center pointer-events-auto">
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-glow mb-4 md:mb-6">Light Speed</h2>
             <p className="text-brand-gray text-sm sm:text-base md:text-lg">Harness cutting-edge hybrid-ion thrusters and computational trajectory modeling to launch payloads into geosynchronous orbit.</p>
           </div>
        </section>

        {/* OVERLAY SECTION 3 */}
        <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 pointer-events-none scroll-text-group px-6 lg:px-16 opacity-0">
           <div className="max-w-2xl text-center pointer-events-auto">
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold uppercase tracking-widest text-glow mb-4 md:mb-6 text-brand-cyan">Orbital Reach</h2>
             <p className="text-brand-gray text-sm sm:text-base md:text-lg">At Max-Q, structural forces reach extreme levels. Advanced titanium alloys and composite materials ensure payload integrity.</p>
           </div>
        </section>

      </div>
    </div>
  );
}
