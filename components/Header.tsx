
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
import { Menu, X, Hammer, ChevronDown, Globe, Shield, BrickWall, Paintbrush, ClipboardCheck, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', path: '/' },
    { 
      key: 'nav.services', 
      path: '/diensten',
      dropdown: [
        { key: 'nav.houtrot', path: '/houtrotherstel', icon: Shield },
        { key: 'nav.timmerwerk', path: '/timmerwerk', icon: Hammer },
        { key: 'nav.gevel', path: '/gevelwerk', icon: BrickWall },
        { key: 'nav.renovatie', path: '/renovatie', icon: Paintbrush },
        { key: 'nav.inspecties', path: '/inspecties', icon: ClipboardCheck }
      ]
    },
    { key: 'nav.projects', path: '/projecten' },
    { key: 'nav.about', path: '/over-ons' },
    { key: 'nav.contact', path: '/contact' },
  ];

  const flags: Record<Language, string> = {
    [Language.NL]: '🇳🇱', [Language.EN]: '🇬🇧', [Language.TR]: '🇹🇷',
    [Language.PL]: '🇵🇱', [Language.BG]: '🇧🇬', [Language.AR]: '🇸🇦',
    [Language.DE]: '🇩🇪', [Language.HU]: '🇭🇺', [Language.FR]: '🇫🇷',
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-header py-2' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-copper-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="bg-gradient-to-br from-navy-800 to-navy-950 border border-copper-500/30 p-1 rounded-lg relative z-10 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                   <img 
                     src="/messu-bouw-logo.jpg" 
                     alt="Messu Bouw Logo" 
                     className="h-10 w-10 object-contain group-hover:rotate-3 transition-transform duration-300"
                   />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-100 leading-none">
                  MESSU <span className="text-copper-500">BOUW</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase mt-1 hidden sm:block">
                  Houtrotherstel
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.key} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors group flex items-center ${
                      isActive(item.path) ? 'text-white' : 'text-slate-400 hover:text-copper-400'
                    }`}
                  >
                    {t(item.key)}
                    {item.dropdown && <ChevronDown size={14} className="ml-1 mt-0.5" />}
                    {isActive(item.path) && !item.dropdown && (
                      <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className="absolute top-full left-0 mt-2 w-64 bg-navy-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
                      >
                         <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
                         <div className="relative p-2">
                           {item.dropdown.map((subItem) => (
                             <Link
                               key={subItem.key}
                               to={subItem.path}
                               onClick={() => setActiveDropdown(null)}
                               className="flex items-center px-4 py-3 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors group/item"
                             >
                               {subItem.icon && (
                                 <div className="mr-3 relative w-5 h-5 flex items-center justify-center">
                                   <subItem.icon size={16} className="text-copper-500 group-hover/item:text-white transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6 relative z-10" />
                                   <div className="absolute inset-0 bg-copper-500 rounded-full blur-md opacity-0 group-hover/item:opacity-80 transition-opacity duration-300"></div>
                                 </div>
                               )}
                               {t(subItem.key)}
                             </Link>
                           ))}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Language Switcher */}
              <div className="relative ml-4" onMouseEnter={() => setIsLangMenuOpen(true)} onMouseLeave={() => setIsLangMenuOpen(false)}>
                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-copper-500/50">
                  <Globe size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-200">{flags[language]}</span>
                  <ChevronDown size={12} className="text-slate-500" />
                </button>
                
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 glass-panel rounded-xl overflow-hidden shadow-2xl py-2 z-50"
                    >
                      <div className="grid grid-cols-1 gap-1 p-1 max-h-64 overflow-y-auto custom-scrollbar">
                        {Object.values(Language).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
                              language === lang ? 'bg-copper-500/20 text-copper-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="mr-3 text-lg">{flags[lang]}</span>
                            <span className="uppercase tracking-wide">{lang}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Header Contact Button */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="ml-6 px-5 py-2 bg-gradient-to-r from-copper-600 to-copper-500 hover:from-copper-500 hover:to-copper-400 text-white text-sm font-bold rounded-full shadow-lg shadow-copper-500/20 hover:shadow-copper-500/40 transition-all flex items-center group btn-shine"
              >
                <Phone size={14} className="mr-2 group-hover:rotate-12 transition-transform" />
                Contact
              </button>
            </nav>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
               <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-3 py-1.5 bg-copper-500/10 border border-copper-500/50 text-copper-500 rounded-lg text-xs font-bold"
               >
                 Contact
               </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Sluit menu" : "Open menu"}
                className="p-2 text-slate-300 hover:text-copper-500 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden fixed inset-0 bg-navy-950 z-40 pt-24 px-6 overflow-y-auto"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.key} className="border-b border-white/5 pb-4">
                     <div className="flex items-center justify-between">
                        <Link
                          to={item.path}
                          onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                          className="text-xl font-light text-slate-300 hover:text-copper-500 transition-colors"
                        >
                          {t(item.key)}
                        </Link>
                        {item.dropdown && (
                          <button 
                            onClick={() => setExpandedMobileMenu(expandedMobileMenu === item.key ? null : item.key)}
                            aria-label={expandedMobileMenu === item.key ? "Sluit submenu" : "Open submenu"}
                            className="p-2 text-slate-500"
                          >
                            <ChevronDown className={`transition-transform duration-300 ${expandedMobileMenu === item.key ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                     </div>
                     
                     {/* Mobile Dropdown */}
                     <AnimatePresence>
                       {item.dropdown && expandedMobileMenu === item.key && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden pl-4 mt-2 space-y-3"
                         >
                           {item.dropdown.map(subItem => (
                             <Link
                               key={subItem.key}
                               to={subItem.path}
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="flex items-center text-slate-400 text-sm py-2 group/mobile-item"
                             >
                               {subItem.icon && (
                                 <subItem.icon size={16} className="mr-3 text-copper-500 group-hover/mobile-item:scale-110 transition-transform" />
                               )}
                               {t(subItem.key)}
                             </Link>
                           ))}
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                ))}
                
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 bg-copper-500 text-white font-bold rounded-xl mb-6 flex items-center justify-center"
                  >
                    <Phone className="mr-2" size={20} />
                    Direct Contact
                  </button>

                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Select Language</p>
                  <div className="grid grid-cols-3 gap-3 mb-10">
                    {Object.values(Language).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border ${
                          language === lang ? 'border-copper-500 bg-copper-500/10 text-copper-400' : 'border-white/10 bg-white/5 text-slate-400'
                        }`}
                      >
                        <span className="text-2xl mb-1">{flags[lang]}</span>
                        <span className="text-xs font-bold uppercase">{lang}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
