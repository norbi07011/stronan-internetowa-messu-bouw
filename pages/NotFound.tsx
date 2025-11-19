import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Wrench } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-copper-500 blur-2xl rounded-full"
            />
            <img 
              src="/messu-bouw-logo.jpg" 
              alt="Messu Bouw Logo" 
              className="h-24 w-24 object-contain rounded-2xl border-2 border-copper-500/50 bg-navy-900/80 p-3 relative z-10"
            />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-tight">
            4<span className="text-copper-500">0</span>4
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Wrench className="text-copper-500 animate-pulse" size={24} />
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-300">
              Pagina Niet Gevonden
            </h2>
          </div>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            De pagina die u zoekt bestaat niet of is verplaatst. Mogelijk is er een fout in de URL of is de pagina verwijderd.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/"
            className="group flex items-center space-x-2 px-8 py-3 bg-copper-500 hover:bg-copper-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-copper-500/50 hover:scale-105"
          >
            <Home size={20} />
            <span>Terug naar Home</span>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="group flex items-center space-x-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-copper-500/50 rounded-full font-medium transition-all duration-300"
          >
            <ArrowLeft size={20} />
            <span>Ga Terug</span>
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-slate-500 text-sm mb-4">Populaire pagina's:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: '/diensten', label: 'Diensten' },
              { to: '/houtrotherstel', label: 'Houtrotherstel' },
              { to: '/projecten', label: 'Projecten' },
              { to: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 text-slate-400 hover:text-copper-400 border border-white/5 hover:border-copper-500/30 rounded-lg transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
