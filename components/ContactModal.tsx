
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Send, CheckCircle, Loader2, User, Mail, FileText } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after delay
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 300);
    }, 2000);
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
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-copper-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5 relative z-10 bg-navy-900/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white font-display">Contact</h3>
                <button 
                  onClick={onClose}
                  aria-label="Sluit contact modal"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Scroll Area */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Bericht verzonden!</h4>
                    <p className="text-slate-400">We nemen zo spoedig mogelijk contact met u op.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href="tel:+31626625190"
                        className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-copper-500/50 rounded-xl transition-all group"
                      >
                        <Phone className="w-6 h-6 text-copper-500 mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-white">Bellen</span>
                      </a>
                      <a 
                        href="https://wa.me/31626625190"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#25D366]/50 rounded-xl transition-all group"
                      >
                        <MessageCircle className="w-6 h-6 text-[#25D366] mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-white">WhatsApp</span>
                      </a>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-navy-900 text-slate-500">of stuur een bericht</span>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-copper-500 transition-colors" />
                        <input 
                          required
                          type="text" 
                          placeholder="Naam"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-copper-500 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-copper-500 transition-colors" />
                          <input 
                            required
                            type="email" 
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-copper-500 transition-colors"
                          />
                        </div>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-copper-500 transition-colors" />
                          <input 
                            type="tel" 
                            placeholder="Telefoon"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-copper-500 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <FileText className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-copper-500 transition-colors" />
                        <textarea 
                          required
                          rows={4}
                          placeholder="Uw bericht..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-copper-500 transition-colors resize-none"
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-4 bg-copper-500 hover:bg-copper-600 text-white rounded-xl font-bold shadow-lg shadow-copper-500/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed btn-shine"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Versturen
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
