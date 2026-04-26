import { Heart, Send, Command, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/SocialIcons';
import db from '../../data/db.json';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { Icon: GithubIcon, href: db.profile.github, label: 'GitHub', color: 'var(--neon-purple)' },
  { Icon: LinkedinIcon, href: db.profile.linkedin, label: 'LinkedIn', color: 'var(--neon-blue)' },
  { Icon: TwitterIcon, href: db.profile.twitter, label: 'Twitter', color: 'var(--neon-cyan)' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer style={{ position: 'relative', paddingTop: 96, paddingBottom: 48, overflow: 'hidden' }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: 0, left: '25%', width: 384, height: 384, background: 'radial-gradient(circle, var(--neon-purple) 0%, transparent 60%)', opacity: 0.05, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 384, height: 384, background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 60%)', opacity: 0.05, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        <div className="glass" style={{ borderRadius: 40, padding: 48, marginBottom: 48, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
            
            {/* Brand Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18, boxShadow: '0 0 15px rgba(168,85,247,0.4)' }}>
                  A
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {db.profile.name}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
                Crafting digital experiences with precision and passion. Building the future one line of code at a time.
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                {socials.map(({ Icon, href, color }) => (
                  <motion.a 
                    key={href} 
                    href={href} 
                    whileHover={{ y: -4, scale: 1.1 }}
                    style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = color}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h4 style={{ fontSize: 10, fontWeight: 900, color: 'var(--neon-purple)', textTransform: 'uppercase', letterSpacing: 4 }}>Quick Navigation</h4>
              <nav style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {footerLinks.map(({ label, href }) => (
                  <a 
                    key={label} 
                    href={href}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); 
                    }}
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--neon-purple)' }} />
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Availability Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               <h4 style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 4 }}>Availability</h4>
               <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(16,185,129,0.05)', padding: '8px 16px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.1)', width: 'fit-content' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: 2 }}>Open for roles</span>
               </div>
               <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', width: 'fit-content', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'var(--neon-purple)'; e.currentTarget.style.color = 'var(--neon-purple)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}>
                  Start a conversation <ArrowUpRight size={14} />
               </a>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '0 16px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2 }}>
             © {year} All Systems Operational | Built by {db.profile.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
              ENGINEERED WITH <Heart size={10} style={{ color: 'var(--neon-pink)', fill: 'var(--neon-pink)' }} /> AND COFFEE
            </p>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
            <a href="#/admin" style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 2, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--neon-purple)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
              Control_Panel.exe
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
