
import React, { useState } from 'react';
import { motion, useScroll, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Clock, Users, Hammer, FileText, Star, Building2, Home as HomeIcon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import PlanActionModal from '../components/PlanActionModal';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

// --- 3D WINDOW FRAME COMPONENT ---
const WindowFrame3D: React.FC = () => {
  return (
    <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] perspective-1000">
      <motion.div 
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative preserve-3d"
      >
         {/* Outer Frame */}
         <div className="absolute inset-0 border-[20px] border-[#3E2723] bg-transparent shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] backface-visible">
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-blue-200/10 backdrop-blur-[1px]"></div>
            {/* Inner Crossbars (Muntins) */}
            <div className="absolute top-1/2 left-0 w-full h-[10px] bg-[#3E2723] -translate-y-1/2 shadow-md"></div>
            <div className="absolute left-1/2 top-0 h-full w-[10px] bg-[#3E2723] -translate-x-1/2 shadow-md"></div>
         </div>
         
         {/* Thickness/Depth (Sides of the frame) */}
         <div className="absolute top-0 right-0 w-[20px] h-full bg-[#2D1B14] origin-right rotate-y-90"></div>
         <div className="absolute top-0 left-0 w-[20px] h-full bg-[#2D1B14] origin-left -rotate-y-90"></div>
         
         {/* Spotlight Effect on the frame */}
         <div className="absolute -inset-10 bg-copper-500/20 blur-3xl -z-10 animate-pulse"></div>
      </motion.div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const [clientType, setClientType] = useState<'private' | 'business'>('private');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Process Steps Data
  const processSteps = [1, 2, 3, 4, 5, 6].map(n => ({
    id: n,
    title: `process.step${n}`,
    desc: `process.step${n}_desc`
  }));

  // Reviews Data
  const reviews = [
    { name: "J. de Vries", role: "VvE Beheerder", text: "Zeer professioneel. De houtrotinventarisatie was extreem gedetailleerd." },
    { name: "S. Bakker", role: "Particulier", text: "Onze kozijnen zijn weer als nieuw. Vakwerk en alles netjes achtergelaten." },
    { name: "M. Yilmaz", role: "Investeerder", text: "Snelle service voor onze huurwoningen. Transparante communicatie." }
  ];

  // --- ANIMATION VARIANTS ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="w-full bg-navy-950 overflow-hidden">
      
      <PlanActionModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        onScrollToForm={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950"></div>
        <div className="absolute top-1/2 right-[20%] w-[400px] h-[400px] bg-copper-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div style={{ opacity: opacityHero }} className="text-center lg:text-left relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">{t('hero.cta_urgent')}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
            >
              MESSU <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 to-gold-500">BOUW</span>
              <br />
              <span className="text-2xl md:text-4xl font-light text-slate-400 block mt-4 font-display">
                {t('hero.title_main')}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 italic border-l-2 border-copper-500 pl-6"
            >
              "{t('hero.quote')}"
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.8 }}
               className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button onClick={() => setIsPlanModalOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-lg font-bold transition-all shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] flex items-center justify-center group btn-shine">
                {t('hero.cta_quote')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:+31626625190" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold backdrop-blur-sm transition-all flex items-center justify-center">
                <Clock className="mr-2 w-5 h-5 text-copper-500" />
                {t('hero.cta_urgent')}
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Element */}
          <div className="hidden lg:flex items-center justify-center h-[600px] w-full">
             <WindowFrame3D />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center z-20"
        >
          <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5 text-copper-500" />
        </motion.div>
      </section>

      {/* --- USP Cards (Staggered Entry) --- */}
      <section className="py-20 bg-navy-900 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Shield, label: 'features.certified' },
              { icon: Hammer, label: 'features.workshop' },
              { icon: Clock, label: 'features.guarantee' },
              { icon: FileText, label: 'features.transparent' },
            ].map((item, idx) => (
              <motion.div 
                variants={fadeInUp}
                key={idx} 
                className="group relative h-40 perspective-1000"
              >
                <div className="absolute inset-0 bg-navy-950 rounded-2xl border border-white/5 transition-all duration-500 ease-out group-hover:border-copper-500/40 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateZ(10px)] flex flex-col items-center justify-center overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-copper-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="mb-4 relative z-10">
                    <div className="absolute inset-0 bg-copper-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <item.icon className="relative z-10 w-10 h-10 text-copper-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white tracking-wide relative z-10">{t(item.label)}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PROCESS TIMELINE (Interactive Slider) --- */}
      <section className="py-24 bg-navy-950 relative overflow-hidden">
         {/* Background Glow for Process Section */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"></div>

         <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
         >
            <div className="text-center mb-20">
               <h2 className="text-4xl font-bold text-white mb-4 font-display">{t('process.title')}</h2>
               <div className="w-24 h-1 bg-gradient-to-r from-transparent via-copper-500 to-transparent mx-auto"></div>
            </div>

            <div className="relative">
               {/* Static Tracks */}
               {/* Desktop Horizontal Track */}
               <div className="hidden md:block absolute top-[2rem] left-0 w-full h-1 bg-white/5 rounded-full z-0"></div>
               {/* Mobile Vertical Track */}
               <div className="md:hidden absolute left-[2rem] top-0 h-full w-1 bg-white/5 rounded-full z-0"></div>

               <motion.div 
                 variants={staggerContainer}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, margin: "-50px" }}
                 className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10"
               >
                  {processSteps.map((step) => (
                     <motion.div 
                       variants={fadeInUp} 
                       key={step.id} 
                       className="group relative flex md:flex-col flex-row items-center md:justify-start md:text-center text-left gap-6 md:gap-0 cursor-pointer"
                       onMouseEnter={() => setActiveStep(step.id)}
                       onClick={() => setActiveStep(step.id)}
                     >
                        {/* Interactive Line Segment (Sliding Animation) */}
                        {activeStep === step.id && (
                          <motion.div 
                            layoutId="activeProcessLine"
                            className="absolute bg-copper-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] z-10 rounded-full
                                       md:w-full md:h-1 md:top-[2rem] md:left-0
                                       h-full w-1 left-[2rem] top-0"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}

                        {/* Step Number Bubble */}
                        <div className={`
                           relative z-20 w-16 h-16 mx-auto shrink-0 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-500
                           ${activeStep === step.id 
                              ? 'bg-navy-900 border-copper-500 text-white scale-110 shadow-[0_0_30px_rgba(249,115,22,0.4)]' 
                              : 'bg-navy-950 border-white/10 text-slate-600 group-hover:border-copper-500/50 group-hover:text-slate-400'}
                        `}>
                           {step.id}
                        </div>

                        {/* Content */}
                        <div className={`mt-0 md:mt-8 transition-all duration-300 ${activeStep === step.id ? 'opacity-100 translate-x-2 md:translate-x-0' : 'opacity-50'}`}>
                           <h3 className={`text-lg font-bold mb-1 transition-colors ${activeStep === step.id ? 'text-white' : 'text-slate-500'}`}>
                             {t(step.title)}
                           </h3>
                           <p className="text-sm text-slate-400 max-w-[200px] mx-auto">{t(step.desc)}</p>
                        </div>
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </motion.div>
      </section>

      {/* --- BEFORE / AFTER --- */}
      <section className="py-24 bg-navy-900 border-y border-white/5">
         <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
         >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Resultaat</h2>
            <div className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
               <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
                  afterImage="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
               />
            </div>
            <div className="text-center mt-4 text-slate-400 text-sm flex items-center justify-center">
               <ArrowRight className="w-4 h-4 mr-2 text-copper-500" />
               {t('common.drag_compare')}
            </div>
         </motion.div>
      </section>

      {/* --- MATERIALS & TECHNIQUES --- */}
      <section className="py-24 bg-navy-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-8 font-display">{t('materials.title')}</motion.h2>
               <div className="space-y-8">
                  {[
                     { title: 'materials.epoxy', desc: 'materials.epoxy_desc', color: 'text-purple-400' },
                     { title: 'materials.wood', desc: 'materials.wood_desc', color: 'text-amber-600' },
                     { title: 'materials.paint', desc: 'materials.paint_desc', color: 'text-blue-400' },
                  ].map((item, i) => (
                     <motion.div variants={fadeInUp} key={i} className="flex items-start group">
                        <div className="mr-6 mt-1 relative">
                           <div className={`w-3 h-3 rounded-full bg-current ${item.color} relative z-10`}></div>
                           <div className={`absolute inset-0 w-3 h-3 rounded-full bg-current ${item.color} blur-sm animate-pulse`}></div>
                           <div className="absolute top-4 left-1.5 w-px h-16 bg-white/10 group-last:hidden"></div>
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-white mb-2">{t(item.title)}</h3>
                           <p className="text-slate-400">{t(item.desc)}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 group"
            >
               <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop" alt="Technisch Rapport Inspectie" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
               <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                     <span className="text-white font-bold">Technisch Rapport</span>
                     <FileText className="text-copper-500" />
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- TARGET AUDIENCE --- */}
      <section className="py-24 bg-navy-900 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-12"
            >
              {t('target.title')}
            </motion.h2>
            
            <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 mb-12">
               <button 
                  onClick={() => setClientType('private')}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${clientType === 'private' ? 'bg-copper-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
               >
                  {t('target.private')}
               </button>
               <button 
                  onClick={() => setClientType('business')}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${clientType === 'business' ? 'bg-copper-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
               >
                  {t('target.business')}
               </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                 key={clientType}
                 initial={{ opacity: 0, y: 20, rotateX: 10 }}
                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
                 exit={{ opacity: 0, y: -20, rotateX: -10 }}
                 transition={{ duration: 0.5 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left max-w-5xl mx-auto perspective-1000"
              >
                 <div className="group relative h-full">
                   <div className="h-full bg-navy-950 p-8 rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-500 ease-out group-hover:border-copper-500/40 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(4deg)_rotateY(4deg)_translateZ(10px)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-copper-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      <div className="relative z-10">
                        {clientType === 'private' ? <HomeIcon className="w-12 h-12 text-copper-500 mb-6" /> : <Building2 className="w-12 h-12 text-copper-500 mb-6" />}
                        <h3 className="text-2xl font-bold text-white mb-4">
                           {clientType === 'private' ? t('target.private') : t('target.business')}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                           {clientType === 'private' ? t('target.private_desc') : t('target.business_desc')}
                        </p>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                       <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex items-center p-4 bg-white/5 rounded-xl border border-white/5"
                       >
                          <CheckCircle className="text-green-500 mr-4 w-5 h-5" />
                          <span className="text-slate-300">
                             {clientType === 'private' ? 'Persoonlijk advies op maat' : 'Meerjarenonderhoudsplanning (MJOP)'}
                          </span>
                       </motion.div>
                    ))}
                 </div>
              </motion.div>
            </AnimatePresence>
         </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-navy-950">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white text-center mb-16"
            >
              Wat zeggen onze klanten?
            </motion.h2>
            <motion.div 
               variants={staggerContainer}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
               {reviews.map((review, idx) => (
                  <motion.div variants={fadeInUp} key={idx} className="group relative perspective-1000 h-full">
                    <div className="h-full bg-navy-900 p-8 rounded-2xl border border-white/5 relative transition-all duration-500 ease-out group-hover:border-copper-500/40 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:[transform:rotateX(2deg)_rotateY(2deg)_translateZ(10px)] flex flex-col">
                       <div className="relative z-10 flex-grow">
                         <div className="flex text-gold-500 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                         </div>
                         <p className="text-slate-400 italic mb-6">"{review.text}"</p>
                         <div>
                            <div className="text-white font-bold">{review.name}</div>
                            <div className="text-copper-500 text-sm">{review.role}</div>
                         </div>
                       </div>
                    </div>
                  </motion.div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-navy-900 border-t border-white/5">
         <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
         >
            <h2 className="text-3xl font-bold text-white text-center mb-12">{t('faq.title')}</h2>
            <div className="space-y-4">
               {[1, 2, 3, 4].map(n => (
                  <div key={n} className="group/faq relative perspective-1000">
                    <details className="group bg-navy-950 rounded-xl border border-white/5 open:border-copper-500/30 transition-all duration-500 transform group-hover/faq:translate-y-[-4px] shadow-xl group-hover/faq:shadow-copper-500/10 relative overflow-hidden">
                       <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold hover:text-copper-400 transition-colors relative z-10">
                          {t(`faq.q${n}`)}
                          <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-slate-500" />
                       </summary>
                       <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4 relative z-10"
                       >
                          {t(`faq.a${n}`)}
                       </motion.div>
                    </details>
                  </div>
               ))}
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Home;
