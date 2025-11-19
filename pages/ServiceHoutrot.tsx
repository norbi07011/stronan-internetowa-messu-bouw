
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Search, Hammer, RefreshCw, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceContactForm from '../components/ServiceContactForm';
import PlanActionModal from '../components/PlanActionModal';

// --- 3D LOG COMPONENT ---
// Simulates a 3D wooden log using CSS 3D transforms
const Log3D: React.FC<{
  size: number;   // Diameter of the log
  depth: number;  // Length of the log (z-axis depth)
  x: number;      // Horizontal offset
  y: number;      // Vertical offset
  speed: number;  // Rotation duration in seconds
  delay: number;  // Animation delay
}> = ({ size, depth, x, y, speed, delay }) => {
  // Number of faces to simulate curvature. 24 is a good balance between performance and look.
  const sides = 24; 
  const radius = size / 2;
  // Calculate width of each panel + slight overlap to prevent hairline gaps
  const sideWidth = (2 * radius * Math.tan(Math.PI / sides)) + 1;

  // Textures
  const ringTexture = "https://images.unsplash.com/photo-1589558855229-9d037d9c670f?q=80&w=600&auto=format&fit=crop";
  const barkTexture = "https://images.unsplash.com/photo-1517645770017-2226b02dc7b1?q=80&w=1000&auto=format&fit=crop";

  return (
    <motion.div
      className="absolute preserve-3d"
      style={{
        width: size,
        height: size,
        marginLeft: x,
        marginTop: y,
      }}
      initial={{ rotateX: 15, rotateZ: 10 }} // Initial tilt to show depth
      animate={{ 
        rotateY: 360,
        y: [0, -15, 0] // Floating motion
      }}
      transition={{
        rotateY: { duration: speed, repeat: Infinity, ease: "linear" },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay }
      }}
    >
      {/* Front Cap (Rings) */}
      <div 
        className="absolute inset-0 rounded-full backface-hidden border-2 border-[#3E2723] shadow-inner"
        style={{
          backgroundImage: `url(${ringTexture})`,
          backgroundSize: 'cover',
          transform: `translateZ(${depth/2}px)`
        }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-full"></div>
      </div>

      {/* Back Cap (Rings) */}
      <div 
        className="absolute inset-0 rounded-full backface-hidden border-2 border-[#3E2723] shadow-inner"
        style={{
          backgroundImage: `url(${ringTexture})`,
          backgroundSize: 'cover',
          transform: `rotateY(180deg) translateZ(${depth/2}px)`
        }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-full"></div>
      </div>

      {/* Sides (Bark) */}
      <div className="absolute inset-0 preserve-3d">
        {Array.from({ length: sides }).map((_, i) => {
          const angle = i * (360 / sides);
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 backface-hidden bg-[#4E342E]"
              style={{
                width: sideWidth,
                height: depth,
                backgroundImage: `url(${barkTexture})`,
                backgroundSize: 'auto 100%', 
                // Shift background position to make texture look continuous around the cylinder
                backgroundPosition: `${(i / sides) * 100}% center`,
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius - 0.5}px)`
              }}
            >
               <div className="absolute inset-0 bg-black/10"></div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ServiceHoutrot: React.FC = () => {
  const { t } = useLanguage();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  
  // Refs for scroll animation
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 60%", "end 80%"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { title: t('houtrot_page.step_1_title'), desc: t('houtrot_page.step_1_desc') },
    { title: t('houtrot_page.step_2_title'), desc: t('houtrot_page.step_2_desc') },
    { title: t('houtrot_page.step_3_title'), desc: t('houtrot_page.step_3_desc') },
    { title: t('houtrot_page.step_4_title'), desc: t('houtrot_page.step_4_desc') },
    { title: t('houtrot_page.step_5_title'), desc: t('houtrot_page.step_5_desc') },
  ];

  const services = [
    { icon: Search, title: 'houtrot_page.service_detection_title', desc: 'houtrot_page.service_detection_desc' },
    { icon: Hammer, title: 'houtrot_page.service_repair_title', desc: 'houtrot_page.service_repair_desc' },
    { icon: RefreshCw, title: 'houtrot_page.service_replace_title', desc: 'houtrot_page.service_replace_desc' },
    { icon: Shield, title: 'houtrot_page.service_protect_title', desc: 'houtrot_page.service_protect_desc' },
  ];

  const handleScrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProcess = () => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      
      <PlanActionModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        onScrollToForm={handleScrollToForm}
      />

      {/* --- HERO SECTION WITH 3D LOGS --- */}
      <section className="relative bg-navy-900 min-h-[600px] flex items-center overflow-hidden border-b border-white/5">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-copper-500/5 skew-x-12"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-900/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="relative z-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-copper-500/10 border border-copper-500/30 rounded-full mb-6"
              >
                <Search className="w-5 h-5 text-copper-500" />
                <span className="text-copper-400 font-bold text-sm uppercase tracking-wider">Premium Service</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-display"
              >
                {t('houtrot_page.title').split(' ')[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 to-amber-600">
                  {t('houtrot_page.title').split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative pl-6 border-l-4 border-copper-500"
              >
                <h2 className="text-2xl text-white font-bold mb-2">{t('houtrot_page.subtitle')}</h2>
                <p className="text-lg text-slate-400 max-w-md">
                  {t('houtrot_page.intro')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <button 
                  onClick={() => setIsPlanModalOpen(true)}
                  className="px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-lg font-bold transition-all shadow-lg shadow-copper-500/20 btn-shine"
                >
                  {t('common.plan_inspection')}
                </button>
                <button 
                  onClick={handleScrollToProcess}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-all"
                >
                  {t('common.read_more')}
                </button>
              </motion.div>
            </div>

            {/* 3D Scene Container */}
            <div 
              className="relative h-[500px] w-full flex items-center justify-center"
              style={{ perspective: "1000px" }} 
            >
               {/* Glow behind logs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-copper-500/10 rounded-full blur-[100px]"></div>

               {/* 3D LOGS CONFIGURATION */}
               
               {/* LARGE LOG (Main) */}
               <Log3D 
                  size={220} 
                  depth={140} 
                  x={80} 
                  y={60} 
                  speed={45} 
                  delay={0}
               />

               {/* MEDIUM LOG (Background) */}
               <Log3D 
                  size={160} 
                  depth={100} 
                  x={-60} 
                  y={-80} 
                  speed={35} 
                  delay={2}
               />

               {/* SMALL LOG (Foreground Accent) */}
               <Log3D 
                  size={100} 
                  depth={70} 
                  x={-140} 
                  y={40} 
                  speed={25} 
                  delay={1}
               />
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">{t('houtrot_page.what_is_title')}</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t('houtrot_page.what_is_desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, idx) => (
                <div key={idx} className="group relative perspective-1000">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/5 transition-all duration-500 ease-out group-hover:border-copper-500/40 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(2deg)_rotateY(2deg)_translateZ(10px)] relative overflow-hidden">
                    {/* Bottom Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-copper-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="bg-navy-950 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-copper-500 transition-colors relative z-10">
                      <service.icon className="w-6 h-6 text-copper-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 relative z-10">{t(service.title)}</h3>
                    <p className="text-sm text-slate-400 relative z-10">{t(service.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process Timeline with Scroll Animation */}
          <section id="process" className="relative">
            <h2 className="text-3xl font-bold text-white mb-12 font-display">{t('houtrot_page.process_title')}</h2>
            
            <div className="relative ml-4" ref={processRef}>
              {/* 1. Static Background Line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-white/10 rounded-full"></div>
              
              {/* 2. Animated Foreground Line (Linked to scroll) */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-[7px] top-0 w-0.5 bg-gradient-to-b from-copper-500 via-copper-400 to-amber-500 rounded-full origin-top z-10 shadow-[0_0_15px_rgba(249,115,22,0.8)]"
              />

              <div className="space-y-16 pb-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative pl-16 group">
                    
                    {/* Dot on the line */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-navy-950 border-2 border-white/20 z-20 transition-all duration-300 group-hover:border-copper-500 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 bg-copper-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
                    </div>
                    
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-copper-400 transition-colors">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-navy-900 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-copper-500/10 rounded-bl-full"></div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10">{t('houtrot_page.sidebar_title')}</h3>
              <p className="text-sm text-slate-400 mb-6 relative z-10">
                {t('houtrot_page.sidebar_desc')}
              </p>
              <button 
                onClick={() => setIsPlanModalOpen(true)}
                className="block w-full py-3 bg-copper-500 hover:bg-copper-600 text-white text-center rounded-lg font-semibold transition-colors mb-4 relative z-10 shadow-lg btn-shine"
              >
                {t('common.plan_inspection')}
              </button>
              <Link to="/projecten" className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center rounded-lg font-semibold transition-colors border border-white/10 relative z-10">
                {t('common.view_results')}
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-copper-900/20 to-navy-900 p-6 rounded-2xl border border-copper-500/20">
               <h4 className="font-bold text-white mb-2 flex items-center">
                 <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                 Tip:
               </h4>
               <p className="text-sm text-slate-300">
                 {t('features.report')}
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <ServiceContactForm serviceType="houtrot" />
    </div>
  );
};

export default ServiceHoutrot;
