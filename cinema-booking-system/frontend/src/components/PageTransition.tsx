import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';

export function PageTransition({ className = '' }: { className?: string }) {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, x: 28, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -22, filter: 'blur(8px)' }}
        transition={{ duration: 0.26, ease: 'easeOut' }}
        className={className}
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  );
}
