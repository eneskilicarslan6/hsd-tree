import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaGlobe, FaShareAlt, FaCheck, FaChevronRight, FaGlobeAmericas, FaMedium } from 'react-icons/fa';
import { HiOutlineMail, HiLightningBolt, HiUserGroup } from 'react-icons/hi';


interface LinkItem {
  id: number;
  text: string;
  subText: string;
  url: string;
  icon: any;
  theme: string;
  badge?: string;
}


const linkData: LinkItem[] = [
  {
    id: 1,
    text: "Web Sitemiz",
    subText: "Duyurular, Başvurular ve Etkinlikler",
    url: "https://trabzon.edu.tr",
    icon: <FaGlobe />,
    theme: "yellow",
    badge: "RESMİ"
  },
  {
    id: 2,
    text: "Instagram",
    subText: "@hsdtru - Bizi takip et!",
    url: "https://www.instagram.com/hsdtru/",
    icon: <FaInstagram />,
    theme: "pink",
    badge: "POPÜLER"
  },
  {
    id: 3,
    text: "LinkedIn",
    subText: "Profesyonel ağımıza katıl",
    url: "https://www.linkedin.com/company/hsdtru/",
    icon: <FaLinkedin />,
    theme: "blue"
  },
  { id: 4, text: "Medium",
    subText: "Anlık gelişmelerden haberdar ol",
    url: "https://medium.com/@hsdtrabzon",
    icon: <FaMedium/>,
    theme: "gray" },
  {
    id: 5,
    text: "WhatsApp",
    subText: "Sohbet ve yardımlaşma grubu",
    url: "https://wa.me/905051364450",
    icon: <FaWhatsapp />,
    theme: "green",
    badge: "KATIL"
  },
  {
    id: 6,
    text: "YouTube",
    subText: "Eğlenceli içerikler ve kayıtlar",
    url: "https://www.youtube.com/@hsdtru",
    icon: <FaYoutube />,
    theme: "red"
  },
  {
    id: 7,
    text: "Bize Ulaşın",
    subText: "Sponsorluk ve İletişim",
    url: "mailto:hsd@trabzon.edu.tr",
    icon: <HiOutlineMail />,
    theme: "yellow"
  }
];


const themeMap: any = {
    red:    { glow: 'rgba(239, 68, 68, 0.15)', border: 'group-hover:border-red-500/50', bg: 'group-hover:bg-red-600', text: 'group-hover:text-red-500', badge: 'bg-red-600' },
    pink:   { glow: 'rgba(236, 72, 153, 0.15)', border: 'group-hover:border-pink-500/50', bg: 'group-hover:bg-pink-600', text: 'group-hover:text-pink-500', badge: 'bg-pink-600' },
    blue:   { glow: 'rgba(59, 130, 246, 0.15)', border: 'group-hover:border-blue-500/50', bg: 'group-hover:bg-blue-600', text: 'group-hover:text-blue-500', badge: 'bg-blue-600' },
    sky:    { glow: 'rgba(14, 165, 233, 0.15)', border: 'group-hover:border-sky-500/50', bg: 'group-hover:bg-sky-600', text: 'group-hover:text-sky-500', badge: 'bg-sky-600' },
    green:  { glow: 'rgba(34, 197, 94, 0.15)',  border: 'group-hover:border-green-500/50', bg: 'group-hover:bg-green-600', text: 'group-hover:text-green-500', badge: 'bg-green-600' },
    yellow: { glow: 'rgba(234, 179, 8, 0.15)',   border: 'group-hover:border-yellow-500/50', bg: 'group-hover:bg-yellow-600', text: 'group-hover:text-yellow-500', badge: 'bg-yellow-600' },
    gray:   { glow: 'rgba(156, 163, 175, 0.15)', border: 'group-hover:border-gray-500/50', bg: 'group-hover:bg-gray-600', text: 'group-hover:text-gray-200', badge: 'bg-gray-600' },
    black:  { glow: 'rgba(255, 255, 255, 0.15)', border: 'group-hover:border-neutral-500/50', bg: 'group-hover:bg-black', text: 'group-hover:text-white', badge: 'bg-black border border-white/20' },
};


const TextRotator = () => {
  const words = ["Geleceği Kodla", "Sınırları Zorla", "Topluluğa Katıl"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-6 overflow-hidden flex justify-center items-center mt-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5 }}
          className="text-neutral-400 text-sm font-medium tracking-wide"
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};


function SpotlightCard({ children, className = "", theme = "red" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const glowColor = themeMap[theme].glow;
  const borderColor = themeMap[theme].border;

  return (
    <motion.div
      className={`group relative rounded-xl border border-white/10 bg-neutral-900/50 overflow-hidden ${className} ${borderColor} transition-colors duration-300`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}>

      <motion.div
        className="hidden md:block pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  );
}


function App() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
  }, []);
  

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };


  const logoAnimation = isMobile 
  ? { scale: [1, 1.03, 1] }
  : { 
      opacity: [1, 0.3, 1, 1, 0.5, 1],
      scale: [1, 0.98, 1, 1, 0.99, 1],
      filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
    };

  return (
    <div 
        className="min-h-screen w-full flex items-center justify-center py-10 px-4 relative bg-black text-white font-sans overflow-hidden md:perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      

      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="hidden md:block absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>         
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {isMobile ? (
            <>
              <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[80px]" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[80px]" />
            </>
          ) : (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-red-900/30 rounded-full blur-[180px]" 
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }} 
                transition={{ duration: 12, repeat: Infinity, delay: 3 }}
                className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[180px]" 
              />
            </>
          )}
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[440px] z-10">
  
        <div className="hidden md:block absolute -inset-4 bg-red-600/20 blur-3xl rounded-[50px] -z-10 animate-pulse-slow"></div>
        <div className={`relative border border-white/10 rounded-[40px] shadow-2xl p-6 sm:p-8 overflow-hidden transform-gpu
                        ${isMobile ? 'bg-[#080808] backdrop-blur-none' : 'bg-[#050505]/95 backdrop-blur-2xl'}`}>
            
            <div className="relative flex flex-col items-center text-center pb-6">
                <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="relative w-36 h-36 mb-5 group cursor-pointer">
                    <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative w-full h-full bg-black rounded-full border border-neutral-800 flex items-center justify-center shadow-2xl ring-1 ring-white/5 z-10 overflow-hidden">
                        
                        <motion.img 
                            src="/logo.png" 
                            alt="HSD Logo" 
                            className="w-28 object-contain drop-shadow-2xl"
                            animate={logoAnimation} 
                            transition={{ 
                                duration: isMobile ? 3 : 5, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                times: isMobile ? undefined : [0, 0.1, 0.2, 0.8, 0.9, 1]
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent w-full h-full translate-y-[-100%] group-active:translate-y-[100%] transition-transform duration-300 pointer-events-none"></div>
                    </div>
                     
                     <div className="absolute bottom-1 right-1 bg-black p-2 rounded-full border border-neutral-800 shadow-lg z-20">
                            <FaGlobeAmericas className="text-red-600 text-sm animate-pulse" />
                    </div>
                </motion.div>

                <h1 className="text-2xl font-black tracking-tight text-white uppercase drop-shadow-md">HSD TRABZON ÜNİVERSİTESİ</h1>
                <TextRotator />


                <div className="flex items-center gap-5 mt-5 bg-neutral-900/50 border border-white/5 px-6 py-2.5 rounded-full shadow-inner hover:border-red-900/50 transition-colors cursor-default">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-white font-bold text-base">
                            <HiUserGroup className="text-red-600" /> 50+
                        </div>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-white font-bold text-base">
                            <HiLightningBolt className="text-white" /> 10+
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
            {linkData.map((link, index) => (
                <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}>
                    <SpotlightCard theme={link.theme}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="relative flex items-center p-3.5 z-10">
                        <div className={`p-2.5 rounded-lg bg-neutral-800 text-lg text-gray-400 ${themeMap[link.theme].bg} group-hover:text-white transition-all duration-300`}>
                            {link.icon}
                        </div>
                        
                        <div className="flex flex-col flex-1 ml-3.5">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-200 text-base group-hover:text-white transition-colors">{link.text}</span>
                                {link.badge && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${themeMap[link.theme].badge} shadow-sm`}>
                                        {link.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium mt-0.5 group-hover:text-gray-400">{link.subText}</span>
                        </div>
                        <FaChevronRight className={`text-neutral-600 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${themeMap[link.theme].text} transition-all duration-300`} />
                        </a>
                    </SpotlightCard>
                </motion.div>
            ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
                <div className="flex gap-3 w-full">
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare} 
                        className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 py-2.5 rounded-xl text-xs font-semibold text-gray-300 transition-all border border-white/5 hover:border-white/20"
                    >
                        {copied ? <FaCheck className="text-red-500" /> : <FaShareAlt />} {copied ? "Kopyalandı" : "Paylaş"}
                    </motion.button>
                </div>
                <p className="text-[10px] text-gray-600 font-medium">Designed by <span className="font-bold text-red-700 hover:text-red-500 transition-colors cursor-pointer">eneskilicarslan6</span></p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;