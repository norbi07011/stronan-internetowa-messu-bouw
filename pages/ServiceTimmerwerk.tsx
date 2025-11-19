
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Hammer, Home, PenTool, Grid, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceContactForm from '../components/ServiceContactForm';
import PlanActionModal from '../components/PlanActionModal';

const ServiceTimmerwerk: React.FC = () => {
  const { t } = useLanguage();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const services = [
    { icon: Grid, title: 'timmerwerk_page.service_frames_title', desc: 'timmerwerk_page.service_frames_desc' },
    { icon: Home, title: 'timmerwerk_page.service_facade_title', desc: 'timmerwerk_page.service_facade_desc' },
    { icon: Hammer, title: 'timmerwerk_page.service_renovation_title', desc: 'timmerwerk_page.service_renovation_desc' },
  ];

  const handleScrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation Variants
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
      
      <PlanActionModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        onScrollToForm={handleScrollToForm}
      />

      {/* Header */}
      <section className="relative bg-navy-900 py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622352582268-f5e9a7f94568?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('timmerwerk_page.title')}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-slate-400 max-w-3xl"
          >
            {t('timmerwerk_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Intro */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20 max-w-3xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">{t('timmerwerk_page.intro_title')}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t('timmerwerk_page.intro_desc')}
          </p>
        </motion.div>

        {/* Services Grid */}
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
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-copper-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Perfected Icon Animation */}
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 bg-copper-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-150"></div>
                    <div className="relative w-full h-full bg-navy-950 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-500 ease-out group-hover:bg-copper-500 group-hover:border-copper-400 group-hover:scale-110 group-hover:-rotate-3 shadow-lg group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                      <service.icon className="w-7 h-7 text-copper-500 transition-all duration-500 ease-out group-hover:text-white group-hover:rotate-12" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 relative z-10">{t(service.title)}</h3>
                  <p className="text-slate-400 relative z-10 leading-relaxed">
                    {t(service.desc)}
                  </p>
               </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workshop Feature */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-navy-900 rounded-3xl overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-2 mb-20 shadow-2xl"
        >
          <div className="p-12 flex flex-col justify-center relative overflow-hidden group">
            {/* Subtle BG Glow */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-copper-500/5 rounded-full blur-3xl"></div>
            
            <div className="flex items-center space-x-3 text-copper-500 mb-4 relative z-10">
              <PenTool className="w-6 h-6" />
              <span className="font-bold uppercase tracking-wider text-sm">{t('features.workshop')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">{t('timmerwerk_page.workshop_title')}</h2>
            <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
              {t('timmerwerk_page.workshop_desc')}
            </p>
            <ul className="space-y-4 mb-8 relative z-10">
              {[
                'Maatwerk kozijnen en deuren',
                'Snelle levering',
                'Prefabricage van geveldelen',
                'Hoge kwaliteitscontrole'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-copper-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsPlanModalOpen(true)}
              className="inline-block w-fit px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-full font-bold transition-colors btn-shine relative z-10 shadow-lg shadow-copper-500/20"
            >
              {t('common.contact_us')}
            </button>
          </div>
          <div className="relative h-64 lg:h-auto overflow-hidden group">
             <img 
                src="https://images.unsplash.com/photo-1504198266287-16594a85b2dd?q=80&w=1000&auto=format&fit=crop" 
                alt="Workshop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-copper-500/20 mix-blend-multiply"></div>
          </div>
        </motion.div>

      </div>

      <ServiceContactForm serviceType="timmerwerk" />
    </div>
  );
};

export default ServiceTimmerwerk;
