
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { BrickWall, Droplets, Paintbrush, Layers, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceContactForm from '../components/ServiceContactForm';
import PlanActionModal from '../components/PlanActionModal';

const ServiceGevel: React.FC = () => {
  const { t } = useLanguage();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const services = [
    { icon: Droplets, title: 'gevel_page.service_cleaning_title', desc: 'gevel_page.service_cleaning_desc' },
    { icon: BrickWall, title: 'gevel_page.service_joints_title', desc: 'gevel_page.service_joints_desc' },
    { icon: Layers, title: 'gevel_page.service_cladding_title', desc: 'gevel_page.service_cladding_desc' },
  ];

  const handleScrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      <PlanActionModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} onScrollToForm={handleScrollToForm} />

      {/* Hero */}
      <section className="relative bg-navy-900 py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466057306966-3636cf8a94d7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('gevel_page.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-400 max-w-3xl">
            {t('gevel_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20 max-w-3xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t('gevel_page.intro_title')}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{t('gevel_page.intro_desc')}</p>
        </motion.div>

        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {services.map((service, idx) => (
            <motion.div variants={itemVariants} key={idx} className="group relative perspective-1000">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/5 transition-all duration-500 ease-out group-hover:border-copper-500/30 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateZ(10px)] relative overflow-hidden h-full">
               
               <div className="absolute inset-0 bg-gradient-to-b from-copper-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

               {/* Animated Icon */}
               <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-copper-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-150"></div>
                  <div className="relative w-full h-full bg-navy-950 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-500 ease-out group-hover:bg-copper-500 group-hover:border-copper-400 group-hover:scale-110 group-hover:-rotate-3 shadow-lg group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                     <service.icon className="w-7 h-7 text-copper-500 transition-all duration-500 ease-out group-hover:text-white group-hover:rotate-12" />
                  </div>
               </div>

               <h3 className="text-xl font-bold text-white mb-4 relative z-10">{t(service.title)}</h3>
               <p className="text-slate-400 relative z-10 leading-relaxed">{t(service.desc)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-navy-900 p-12 rounded-3xl border border-white/5 text-center relative overflow-hidden"
        >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-navy-950 to-navy-900 opacity-90"></div>
             <div className="relative z-10">
               <h3 className="text-2xl font-bold text-white mb-8">{t('gevel_page.target_title')}</h3>
               <div className="flex justify-center space-x-8 sm:space-x-16">
                  <div className="flex flex-col items-center group">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-copper-500 group-hover:bg-copper-500/20 transition-all duration-300 group-hover:scale-110">
                        <Home className="text-copper-500 w-8 h-8" />
                      </div>
                      <span className="text-white font-medium">Steen</span>
                  </div>
                   <div className="flex flex-col items-center group">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-copper-500 group-hover:bg-copper-500/20 transition-all duration-300 group-hover:scale-110">
                        <Layers className="text-copper-500 w-8 h-8" />
                      </div>
                      <span className="text-white font-medium">Hout/Trespa</span>
                  </div>
               </div>
             </div>
        </motion.div>
      </div>
      <ServiceContactForm serviceType="timmerwerk" />
    </div>
  );
};

export default ServiceGevel;
