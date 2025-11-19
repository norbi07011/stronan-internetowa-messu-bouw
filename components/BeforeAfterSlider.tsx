
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage, className = '' }) => {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-ew-resize select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs font-bold text-white backdrop-blur-sm border border-white/10">
        {t('common.after')}
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` } as React.CSSProperties}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
         <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs font-bold text-white backdrop-blur-sm border border-white/10">
          {t('common.before')}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-copper-500 cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` } as React.CSSProperties}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-copper-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
           <MoveHorizontal size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
