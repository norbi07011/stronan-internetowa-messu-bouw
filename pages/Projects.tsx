
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../types';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'houtrot' | 'gevel' | 'timmerwerk'>('all');

  // Placeholder data
  const projects: Project[] = [
    { id: 1, title: "Herenhuis Rotterdam", category: "houtrot", description: "Complete renovatie kozijnen", imageBefore: "https://picsum.photos/800/600?random=1", imageAfter: "https://picsum.photos/800/600?random=2" },
    { id: 2, title: "Nieuwe dakkapel", category: "timmerwerk", description: "Plaatsing en afwerking", imageBefore: "https://picsum.photos/800/600?random=3", imageAfter: "https://picsum.photos/800/600?random=4" },
    { id: 3, title: "Gevelreiniging", category: "gevel", description: "Reinigen en voegen", imageBefore: "https://picsum.photos/800/600?random=5", imageAfter: "https://picsum.photos/800/600?random=6" },
    { id: 4, title: "Balkonrenovatie", category: "houtrot", description: "Herstel draagconstructie", imageBefore: "https://picsum.photos/800/600?random=7", imageAfter: "https://picsum.photos/800/600?random=8" },
    { id: 5, title: "Boeidelen vervangen", category: "timmerwerk", description: "Nieuwe trespa boeidelen", imageBefore: "https://picsum.photos/800/600?random=9", imageAfter: "https://picsum.photos/800/600?random=10" },
    { id: 6, title: "Monumentaal Pand", category: "inspectie", description: "Volledig rapport", imageBefore: "https://picsum.photos/800/600?random=11", imageAfter: "https://picsum.photos/800/600?random=12" },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="pt-20 min-h-screen bg-navy-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">{t('nav.projects')}</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'houtrot', 'timmerwerk', 'gevel'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                ? 'bg-copper-500 text-white' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative perspective-1000"
              >
                <div className="bg-navy-900 rounded-2xl overflow-hidden border border-white/5 transform transition-transform duration-500 group-hover:rotate-x-2 group-hover:rotate-y-2 shadow-xl group-hover:shadow-copper-500/10 h-full flex flex-col">
                   {/* Bottom Glow */}
                   <div className="absolute inset-0 bg-gradient-to-t from-copper-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none z-10"></div>

                   <div className="relative h-64 shrink-0 z-20">
                     <BeforeAfterSlider 
                       beforeImage={project.imageBefore}
                       afterImage={project.imageAfter}
                     />
                     {/* Watermark Logo */}
                     <div className="absolute bottom-3 right-3 z-30 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                       <img 
                         src="/messu-bouw-logo.jpg" 
                         alt="Messu Bouw" 
                         className="h-10 w-10 object-contain rounded-lg bg-navy-900/80 backdrop-blur-sm p-1.5 border border-white/10"
                       />
                     </div>
                   </div>
                   
                   <div className="p-6 flex flex-col flex-grow relative z-10">
                     <span className="text-xs font-bold text-copper-500 uppercase tracking-wider">{project.category}</span>
                     <h3 className="text-xl font-bold text-white mt-2 mb-2">{project.title}</h3>
                     <p className="text-slate-400 text-sm">{project.description}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
