import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children, className = '' }: { children: ReactNode; className?: string }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -22, filter: 'blur(8px)' }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
