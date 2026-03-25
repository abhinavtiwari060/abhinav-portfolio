import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import db from '../../data/db.json';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 24, left: 0, right: 0, margin: '0 auto', zIndex: 1000,
          width: 'calc(100% - 48px)', maxWidth: 1100,
          padding: '0 20px 0 12px',
          height: 64,
          borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(15,15,30,0.7)' : 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px rgba(168,85,247,0.4)',
          }}>
            <span style={{ fontWeight: 800, color: '#fff', fontSize: 18, fontFamily: 'Space Grotesk, sans-serif' }}>A</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 18, fontFamily: 'Space Grotesk, sans-serif' }}
            className="gradient-text">{db.profile.name.split(' ')[0]}.dev</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href); }}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none', transition: 'all 0.2s',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
            >
              {label}
            </a>
          ))}

          {/* Removed Dark/Light toggle button */}

          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            className="btn-neon" style={{ marginLeft: 8, padding: '8px 20px', fontSize: 13 }}>
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          display: 'none', padding: 8, background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
          color: '#a855f7', cursor: 'none',
        }} className="nav-mobile-btn">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 70, left: 0, right: 0, zIndex: 999,
              background: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 24px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                style={{
                  padding: '12px 16px', borderRadius: 8, fontSize: 15,
                  color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >{label}</a>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
                className="btn-neon" style={{ fontSize: 13 }}>
                <span>Hire Me</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
