import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Download } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/SocialIcons';
import ThreeDOrb from './ThreeDOrb';
import db from '../../data/db.json';

const playClick = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch { }
};

const socials = [
  { Icon: GithubIcon, href: db.profile.github, label: 'GitHub' },
  { Icon: LinkedinIcon, href: db.profile.linkedin, label: 'LinkedIn' },
  { Icon: TwitterIcon, href: db.profile.twitter, label: 'Twitter' },
];

export default function HeroSection() {
  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', padding: '120px 0 80px',
    }}>
      {/* Radial glow blobs */}
      <div style={{
        position: 'absolute', width: '100%', maxWidth: 600, height: 600,
        borderRadius: '50%', top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', width: '100%', maxWidth: 400, height: 400,
        borderRadius: '50%', bottom: '5%', right: '50%', transform: 'translateX(50%)', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
          className="hero-grid">

          {/* Text Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span style={{
                display: 'inline-block', padding: '6px 16px', borderRadius: 999,
                background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)',
                fontSize: 13, fontWeight: 600, color: '#a855f7', marginBottom: 24, letterSpacing: 1,
              }}>
                ✦ {db.profile.role}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20,
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              Hi, I'm{' '}
              <span className="gradient-text">{db.profile.name}</span>
              <br />
              I Build{' '}
              <span style={{ color: '#06b6d4' }} className="text-glow-cyan">
                <TypeAnimation
                  sequence={['Web Apps', 2000, 'Blogs', 2000, 'Ideas', 2000, 'the Future', 2000]}
                  wrapper="span" speed={50} repeat={Infinity}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(var(--color-white-rgb),0.55)', marginBottom: 40, maxWidth: 480 }}
            >
              {db.profile.heroBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }} className="hero-buttons"
            >
              <button
                onClick={() => { playClick(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-neon"
              >
                <span>View My Work</span>
              </button>
              <a
                href="/cv.pdf"
                target="_blank"
                onClick={playClick}
                className="btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
              >
                <Download size={16} /> Download CV
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', gap: 16, alignItems: 'center' }}
            >
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href}
                  style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'rgba(var(--color-white-rgb),0.05)',
                    border: '1px solid rgba(var(--color-white-rgb),0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(var(--color-white-rgb),0.6)', textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
                    e.currentTarget.style.color = '#a855f7';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(168,85,247,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(var(--color-white-rgb),0.05)';
                    e.currentTarget.style.borderColor = 'rgba(var(--color-white-rgb),0.1)';
                    e.currentTarget.style.color = 'rgba(var(--color-white-rgb),0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
              <div style={{ width: 1, height: 30, background: 'rgba(var(--color-white-rgb),0.1)', margin: '0 4px' }} />
              <span style={{ fontSize: 13, color: 'rgba(var(--color-white-rgb),0.35)' }}>Let's connect</span>
            </motion.div>
          </div>

          {/* 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ height: 500, width: '100%', position: 'relative' }} className="hero-orb"
          >
            {/* Glow ring behind orb */}
            <div style={{
              position: 'absolute', inset: 0, margin: 'auto',
              width: '100%', maxWidth: 320, aspectRatio: '1/1', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)',
              filter: 'blur(30px)',
            }} />
            <ThreeDOrb />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 60 }}
        >
          <span style={{ fontSize: 12, color: 'rgba(var(--color-white-rgb),0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>
            Scroll Down
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={18} color="rgba(var(--color-white-rgb),0.3)" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            text-align: center; 
          }
          .hero-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-orb { height: 350px !important; width: 100% !important; display: flex; justify-content: center; align-items: center; margin: 0 auto; }
          .hero-buttons { justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
