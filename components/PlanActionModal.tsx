import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, FileText, X, Clock, ShieldCheck } from 'lucide-react';

interface PlanActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToForm: () => void;
}

const PlanActionModal: React.FC<PlanActionModalProps> = ({ isOpen, onClose, onScrollToForm }) => {
  if (!isOpen) return null;

  const handleScroll = () => {
    onClose();
    onScrollToForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside
              className="bg-navy-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">Plan een afspraak</h3>
                  <p className="text-slate-400 text-sm mt-1">Kies hoe u contact wilt opnemen.</p>
                </div>
                <button 
                  onClick={onClose}
                  aria-label="Sluit afspraak modal"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Options Grid */}
              <div className="space-y-3 relative z-10">
                
                {/* Option 1: Call (Urgent) */}
                <a 
                  href="tel:+31626625190"
                  className="flex items-center p-4 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-copper-500 hover:to-copper-600 border border-white/10 hover:border-copper-400 rounded-xl group transition-all duration-300 shadow-lg"
                >
                  <div className="bg-white/10 p-3 rounded-lg mr-4 group-hover:bg-white/20">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <span className="block text-white font-bold text-lg">Direct Bellen</span>
                    <span className="text-slate-400 text-xs group-hover:text-white/80">Voor spoed & direct advies</span>
                  </div>
                  <div className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Snelst
                  </div>
                </a>

                {/* Option 2: WhatsApp */}
                <a 
                  href="https://wa.me/31626625190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-[#25D366] hover:to-[#1da851] border border-white/10 hover:border-[#25D366] rounded-xl group transition-all duration-300 shadow-lg"
                >
                  <div className="bg-white/10 p-3 rounded-lg mr-4 group-hover:bg-white/20">
                    <MessageCircle className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <span className="block text-white font-bold text-lg">WhatsApp</span>
                    <span className="text-slate-400 text-xs group-hover:text-white/80">Stuur foto's & vragen</span>
                  </div>
                </a>

                {/* Option 3: Form (Scroll) */}
                <button 
                  onClick={handleScroll}
                  className="w-full flex items-center p-4 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-white/10 hover:to-white/20 border border-white/10 hover:border-white/30 rounded-xl group transition-all duration-300 shadow-lg text-left"
                >
                  <div className="bg-white/10 p-3 rounded-lg mr-4 group-hover:bg-white/20">
                    <FileText className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <span className="block text-white font-bold text-lg">Online Offerte</span>
                    <span className="text-slate-400 text-xs group-hover:text-white/80">Vul het formulier in</span>
                  </div>
                </button>

              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between text-xs text-slate-500">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1 text-copper-500" />
                  <span>Binnen 24u reactie</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={12} className="mr-1 text-copper-500" />
                  <span>Vrijblijvend</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlanActionModal;