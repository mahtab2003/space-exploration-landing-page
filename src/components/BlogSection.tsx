import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BlogCard = ({ date, title, excerpt, imageSrc }: { date: string, title: string, excerpt: string, imageSrc: string }) => (
  <div className="flex flex-col group cursor-pointer blog-card opacity-0 translate-y-10">
    <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-6">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
      />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white text-black rounded-full flex flex-col items-center justify-center font-bold leading-none shadow-lg">
        <span className="text-lg">{date.split(' ')[0]}</span>
        <span className="text-[10px] uppercase">{date.split(' ')[1]}</span>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-cyan transition-colors">{title}</h3>
    <p className="text-brand-gray text-sm mb-4 line-clamp-3 leading-relaxed">
      {excerpt}
    </p>
    <span className="text-xs font-semibold tracking-widest uppercase text-white/70 flex items-center group-hover:text-white transition-colors">
      Read more
    </span>
  </div>
);

export const BlogSection = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo('.blog-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      }
    );
  }, []);

  const blogs = [
    { id: 1, date: "14 Feb", title: "Space Is Full Of Surprises", imageSrc: new URL('../assets/hero-frames/ezgif-frame-005.jpg', import.meta.url).href },
    { id: 2, date: "14 Feb", title: "Space Is What Matters The Most", imageSrc: new URL('../assets/hero-frames/ezgif-frame-015.jpg', import.meta.url).href },
    { id: 3, date: "14 Feb", title: "Let's Measure The Space", imageSrc: new URL('../assets/hero-frames/ezgif-frame-025.jpg', import.meta.url).href },
    { id: 4, date: "16 Feb", title: "Space Is Full Of Surprises", imageSrc: new URL('../assets/hero-frames/ezgif-frame-035.jpg', import.meta.url).href },
    { id: 5, date: "16 Feb", title: "Earth Is Just The Beginning", imageSrc: new URL('../assets/hero-frames/ezgif-frame-045.jpg', import.meta.url).href },
    { id: 6, date: "16 Feb", title: "The Stars Are Calling Us", imageSrc: new URL('../assets/hero-frames/ezgif-frame-055.jpg', import.meta.url).href },
  ];

  const excerptText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis aliquet sapien. Donec velit lacus, mollis eu vulputate sed vulputate arcu.";

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 max-w-7xl mx-auto bg-brand-dark">
      <div className="text-center mb-16">
        <span className="text-sm text-brand-gray font-medium tracking-wide">Our Blog</span>
        <h2 className="text-4xl md:text-5xl font-display font-semibold mt-2 mb-6">News & Blog</h2>
        <p className="text-brand-gray max-w-2xl mx-auto text-sm leading-relaxed">
          Stay updated with our latest findings, space missions, and technological breakthroughs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {blogs.map(blog => (
          <BlogCard key={blog.id} {...blog} excerpt={excerptText} />
        ))}
      </div>
    </section>
  );
};
