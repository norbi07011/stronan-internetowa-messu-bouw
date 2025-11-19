
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Hammer, Paintbrush, ThermometerSun, Briefcase, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceContactForm from '../components/ServiceContactForm';
import PlanActionModal from '../components/PlanActionModal';

const ServiceRenovatie: React.FC = () => {
  const { t } = useLanguage();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const services = [
    { icon: Hammer, title: 'renovatie_page.service_total_title', desc: 'renovatie_page.service_total_desc' },
    { icon: Paintbrush, title: 'renovatie_page.service_kitchen_title', desc: 'renovatie_page.service_kitchen_desc' },
    { icon: ThermometerSun, title: 'renovatie_page.service_isolation_title', desc: 'renovatie_page.service_isolation_desc' },
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

      <section className="relative bg-navy-900 py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('renovatie_page.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-400 max-w-3xl">
            {t('renovatie_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <h2 className="text-3xl font-bold text-white mb-6">{t('renovatie_page.intro_title')}</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-8">{t('renovatie_page.intro_desc')}</p>
               <button onClick={() => setIsPlanModalOpen(true)} className="px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-lg font-bold shadow-lg shadow-copper-500/20 btn-shine">
                 {t('common.contact_us')}
               </button>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white/5 p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/10 rounded-full blur-3xl group-hover:bg-copper-500/20 transition-colors"></div>
                <div className="flex items-center space-x-3 mb-6 relative z-10">
                    <Briefcase className="text-copper-500" />
                    <h3 className="text-xl font-bold text-white">{t('renovatie_page.project_title')}</h3>
                </div>
                <p className="text-slate-400 mb-6 relative z-10">{t('renovatie_page.project_desc')}</p>
                <ul className="space-y-2 relative z-10">
                    {[1,2,3].map(i => (
                        <li key={i} className="flex items-center text-slate-300 text-sm">
                            <CheckCircle size={16} className="text-green-500 mr-2" />
                            <span>Professionele planning</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>

        <motion.div 
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {services.map((service, idx) => (
            <motion.div variants={itemVariants} key={idx} className="group relative perspective-1000 h-full">
               <div className="bg-navy-900 p-8 rounded-2xl border border-white/5 transition-all duration-500 ease-out group-hover:border-copper-500/30 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateZ(10px)] h-full relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-copper-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

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
      </div>
      <ServiceContactForm serviceType="timmerwerk" />
    </div>
  );
};

export default ServiceRenovatie;
