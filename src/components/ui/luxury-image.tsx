import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export function LuxuryImage({ src, alt, className, priority = false, aspectRatio = "aspect-[2/3]" }: LuxuryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Pillar 3: LQIP (Low Quality Image Placeholder) Logic
  // In a real Cloudflare/R2 setup, we'd append ?width=50&quality=10 for the placeholder
  const lqip = `${src}?w=50&q=10&blur=10`; 

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden group ${aspectRatio} ${className}`}>
      {/* LQIP Placeholder */}
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={lqip}
              alt=""
              className="w-full h-full object-cover blur-2xl scale-110 opacity-50"
            />
            <Skeleton className="absolute inset-0 bg-white/5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image */}
      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 1.05 
        }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Luxury Overlay Shine */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full" />
    </div>
  );
}
