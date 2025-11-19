
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, BarChart3, Search, Building2, Home, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceContactForm from '../components/ServiceContactForm';
import PlanActionModal from '../components/PlanActionModal';

const ServiceInspecties: React.FC = () => {
  const { t } = useLanguage();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handleScrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      
      <PlanActionModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        onScrollToForm={handleScrollToForm}
      />

      {/* Header */}
      <section className="relative bg-navy-900 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 bg-white/5 rounded-full mb-6"
          >
            <Search className="w-8 h-8 text-copper-500" />
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('inspecties_page.title')}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            {t('inspecties_page.subtitle')}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">{t('inspecties_page.intro_title')}</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {t('inspecties_page.intro_desc')}
            </p>
            <button 
              onClick={() => setIsPlanModalOpen(true)}
              className="px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-full font-bold transition-colors shadow-lg shadow-copper-500/20 btn-shine"
            >
              {t('common.plan_inspection')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="text-copper-500 font-bold text-4xl mb-2">100%</div>
                <div className="text-slate-400 text-sm">Inzicht in staat</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mt-8">
                <div className="text-copper-500 font-bold text-4xl mb-2">MJOP</div>
                <div className="text-slate-400 text-sm">Meerjarenplan</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="text-copper-500 font-bold text-4xl mb-2">VvE</div>
                <div className="text-slate-400 text-sm">Specialist</div>
            </div>
          </div>
        </div>

        {/* Services Details */}
        <div className="space-y-8 mb-24">
          {[
            { 
              icon: ClipboardCheck, 
              title: 'inspecties_page.service_inventory_title', 
              desc: 'inspecties_page.service_inventory_desc' 
            },
            { 
              icon: FileText, 
              title: 'inspecties_page.service_report_title', 
              desc: 'inspecties_page.service_report_desc' 
            },
            { 
              icon: BarChart3, 
              title: 'inspecties_page.service_plan_title', 
              desc: 'inspecties_page.service_plan_desc' 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row items-start md:items-center p-8 bg-navy-900 rounded-2xl border border-white/5 hover:border-copper-500/30 transition-colors"
            >
              <div className="bg-navy-950 p-4 rounded-xl mb-4 md:mb-0 md:mr-8 border border-white/10 shrink-0">
                <item.icon className="w-8 h-8 text-copper-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t(item.title)}</h3>
                <p className="text-slate-400">{t(item.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Target Audience */}
        <div className="text-center bg-white/5 rounded-3xl p-12 border border-white/5 mb-20">
           <h2 className="text-2xl font-bold text-white mb-12">{t('inspecties_page.target_title')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Home, title: 'inspecties_page.target_private' },
                { icon: Users, title: 'inspecties_page.target_vve' },
                { icon: Building2, title: 'inspecties_page.target_business' }
              ].map((item, idx) => (
                <div key={idx} className="group relative perspective-1000 h-full">
                  <div className="bg-navy-900 border border-white/5 rounded-2xl p-8 flex flex-col items-center transform transition-transform duration-500 group-hover:rotate-x-6 group-hover:rotate-y-6 shadow-xl group-hover:shadow-copper-500/10 relative overflow-hidden">
                     {/* Bottom Glow */}
                     <div className="absolute inset-0 bg-gradient-to-t from-copper-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
                     
                     <div className="w-16 h-16 bg-navy-950 rounded-full flex items-center justify-center mb-4 text-copper-500 relative z-10">
                       <item.icon />
                     </div>
                     <h3 className="font-bold text-white relative z-10">{t(item.title)}</h3>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>

      <ServiceContactForm serviceType="inspecties" />
    </div>
  );
};

export default ServiceInspecties;
