
import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ShieldCheck, Clock, MessageCircle, Users, 
  Leaf, HardHat
} from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"]
  });

  const values = [
    { icon: ShieldCheck, title: 'about.value_quality', desc: 'about.value_quality_desc' },
    { icon: Clock, title: 'about.value_time', desc: 'about.value_time_desc' },
    { icon: MessageCircle, title: 'about.value_comms', desc: 'about.value_comms_desc' },
    { icon: Users, title: 'about.value_flex', desc: 'about.value_flex_desc' },
  ];

  const timeline = [
    { year: '2015', title: 'Start', desc: 'Oprichting in Rotterdam.' },
    { year: '2018', title: 'Expansie', desc: 'Opening eigen timmerwerkplaats.' },
    { year: '2021', title: 'Specialisatie', desc: 'Focus op epoxy en houtrot.' },
    { year: '2024', title: 'Groei', desc: 'Partner voor grote VvE’s.' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      
      {/* Header */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 to-navy-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-display"
          >
            {t('about.title')}
          </motion.h1>
          <p className="text-xl text-copper-400 max-w-2xl mx-auto font-medium">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Safety & Sustainability */}
      <section className="py-16 bg-navy-900 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center space-x-2 text-green-400 mb-4">
                  <Leaf size={20} />
                  <span className="uppercase tracking-widest text-xs font-bold">Duurzaam & Veilig</span>
               </div>
               <h2 className="text-3xl font-bold text-white mb-6">{t('safety.title')}</h2>
               <p className="text-slate-400 leading-relaxed mb-6">
                  {t('safety.desc')}
               </p>
               <div className="flex space-x-4">
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5 flex items-center group/cert hover:border-copper-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                     <HardHat className="text-copper-500 mr-3 group-hover/cert:scale-110 transition-transform" />
                     <span className="text-white font-bold">VCA VOL</span>
                  </div>
                  <div className="bg-navy-950 p-4 rounded-xl border border-white/5 flex items-center group/cert hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                     <Leaf className="text-green-500 mr-3 group-hover/cert:scale-110 transition-transform" />
                     <span className="text-white font-bold">FSC Hout</span>
                  </div>
               </div>
               
               {/* Messu Bouw Certification Badge */}
               <div className="mt-6 bg-gradient-to-br from-copper-500/10 to-gold-500/10 p-6 rounded-xl border border-copper-500/20 flex items-center space-x-4 hover:border-copper-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                  <img 
                    src="/publick/messu-bouw-logo.jpg" 
                    alt="Messu Bouw Gecertificeerd" 
                    className="h-16 w-16 object-contain rounded-lg bg-navy-950/80 p-2 border border-copper-500/30"
                  />
                  <div>
                    <p className="text-white font-bold text-lg">Gecertificeerd Specialist</p>
                    <p className="text-copper-400 text-sm">Houtrotherstel & Renovatie</p>
                  </div>
               </div>
            </div>
            <div className="relative h-64 bg-white/5 rounded-2xl overflow-hidden border border-white/5">
               <div className="absolute inset-0 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop" alt="Safety" className="opacity-50 w-full h-full object-cover" />
               </div>
            </div>
         </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="group relative perspective-1000 h-full">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/5 transform transition-transform duration-500 group-hover:rotate-x-6 group-hover:rotate-y-6 shadow-xl group-hover:shadow-copper-500/10 relative overflow-hidden h-full">
                {/* Bottom Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-copper-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
                
                <val.icon className="w-10 h-10 text-copper-500 mb-6 relative z-10" />
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{t(val.title)}</h3>
                <p className="text-slate-400 text-sm relative z-10">{t(val.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-16 font-display">Onze Tijdlijn</h2>
        
        <div ref={timelineRef} className="relative">
          
          {/* Connecting Line Container */}
          {/* Mobile: 16px from left (left-4). Desktop: Center (left-1/2) */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 md:-ml-[1px] h-full bg-white/10 overflow-hidden rounded-full">
             {/* Animated Progress Line */}
             <motion.div 
               style={{ scaleY: scrollYProgress }}
               className="absolute top-0 left-0 w-full h-full bg-copper-500 origin-top shadow-[0_0_15px_rgba(249,115,22,0.8)]"
             />
          </div>

          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative md:flex md:justify-between md:items-center group pl-12 md:pl-0">
                
                {/* Dot */}
                <motion.div 
                  whileHover={{ scale: 1.3 }}
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 md:top-auto w-4 h-4 rounded-full bg-navy-950 border-2 border-copper-500 z-10 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                ></motion.div>
                
                {/* Content */}
                <div className={`md:w-[45%] ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                  <span className="text-copper-500 font-bold text-xl block mb-1">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
                
                {/* Spacer for Desktop Layout Balance */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
