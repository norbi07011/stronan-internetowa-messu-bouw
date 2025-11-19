
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Hammer, ShieldCheck, Search, Home } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'houtrot',
      title: 'nav.houtrot',
      icon: Home,
      link: '/houtrotherstel',
      description: 'Specialistische reparatie van houtrot met behoud van bestaande kozijnen waar mogelijk. Duurzaam en kostenbesparend.',
    },
    {
      id: 'timmerwerk',
      title: 'Timmerwerk & Kozijnen',
      icon: Hammer,
      link: '/timmerwerk',
      description: 'Van het plaatsen van nieuwe kozijnen tot op maat gemaakte deuren en aftimmerwerk.',
    },
    {
      id: 'gevel',
      title: 'Gevelonderhoud',
      icon: ShieldCheck,
      link: '/gevelwerk',
      description: 'Renovatie van boeidelen, gevelbekleding en algemeen onderhoud om uw woning te beschermen.',
    },
    {
      id: 'inspectie',
      title: 'Inspecties',
      icon: Search,
      link: '/inspecties',
      description: 'Uitgebreide inventarisatie van de staat van uw woning inclusief helder rapport en meerjarenplan.',
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{t('nav.services')}</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Messu Bouw biedt een compleet pakket aan diensten voor het behoud en de verbetering van uw vastgoed.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div variants={itemVariants} key={service.id} className="group relative perspective-1000 h-full">
              <Link 
                to={service.link} 
                className="block h-full bg-navy-900 border border-white/5 rounded-2xl p-8 transition-all duration-500 ease-out group-hover:border-copper-500/30 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateZ(10px)] flex flex-col relative overflow-hidden"
              >
                {/* Dynamic Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-copper-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full transform-style-3d">
                  {/* Animated Icon Container */}
                  <div className="relative w-16 h-16 mb-6">
                    {/* Blur Glow Behind */}
                    <div className="absolute inset-0 bg-copper-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-50 group-hover:scale-150"></div>
                    
                    {/* Icon Box */}
                    <div className="relative w-full h-full bg-white/5 rounded-xl flex items-center justify-center border border-white/10 transition-all duration-500 ease-out group-hover:bg-copper-500 group-hover:border-copper-400 group-hover:scale-110 group-hover:-rotate-3 shadow-lg group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                      <service.icon className="text-copper-500 w-8 h-8 transition-all duration-500 ease-out group-hover:text-white group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-copper-100 transition-colors">{t(service.title)}</h3>
                  <p className="text-slate-400 flex-grow group-hover:text-slate-300 transition-colors leading-relaxed">{service.description}</p>
                  <span className="mt-6 text-copper-400 font-medium flex items-center group-hover:text-copper-300 transition-colors group-hover:translate-x-2 duration-300">
                    {t('common.read_more')} &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
