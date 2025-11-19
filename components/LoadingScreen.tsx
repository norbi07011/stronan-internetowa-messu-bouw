import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-copper-500/10 via-gold-500/10 to-copper-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 1.1, 1],
            opacity: [0, 1, 1],
            rotateY: [0, 360]
          }}
          transition={{
            duration: 1.5,
            times: [0, 0.6, 1],
            ease: "easeOut",
            rotateY: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative mb-8 perspective-1000"
        >
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-copper-500 blur-3xl rounded-full"
          />
          
          {/* Logo */}
          <div className="relative bg-gradient-to-br from-navy-800 to-navy-950 border-2 border-copper-500/50 p-4 rounded-2xl shadow-2xl preserve-3d">
            <img 
              src="/publick/messu-bouw-logo.jpg" 
              alt="Messu Bouw Logo" 
              className="h-24 w-24 md:h-32 md:w-32 object-contain"
            />
          </div>

          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 border-4 border-transparent border-t-copper-500 rounded-2xl"
          />
        </motion.div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            MESSU <span className="text-copper-500">BOUW</span>
          </h1>
          <p className="text-slate-400 text-sm tracking-[0.3em] uppercase">
            Houtrotherstel
          </p>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex space-x-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-copper-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
