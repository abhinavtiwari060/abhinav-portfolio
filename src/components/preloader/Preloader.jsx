import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setShow(false), 400);
      }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#050510',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 32,
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 40px rgba(168,85,247,0.5)',
            }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>A</span>
            </div>
            <p className="gradient-text" style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 600 }}>
              Loading Portfolio
            </p>
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: 240 }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 4, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
                style={{
                  height: '100%', borderRadius: 99,
                  background: 'linear-gradient(90deg, #a855f7, #06b6d4)',
                  boxShadow: '0 0 10px #a855f7',
                }}
              />
            </div>
            <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              {Math.round(progress)}%
            </p>
          </div>

          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: '#a855f7',
              borderRightColor: '#06b6d4',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
