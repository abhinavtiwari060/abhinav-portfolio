import { Heart } from 'lucide-react';
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
  { Icon: GithubIcon, href: db.profile.github },
  { Icon: LinkedinIcon, href: db.profile.linkedin },
  { Icon: TwitterIcon, href: db.profile.twitter },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid rgba(var(--color-white-rgb),0.06)',
      padding: '48px 32px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(168,85,247,0.3)',
            }}>
              <span style={{ fontWeight: 800, color: "var(--color-white)", fontFamily: 'Space Grotesk, sans-serif' }}>A</span>
            </div>
            <span className="gradient-text" style={{ fontWeight: 700, fontSize: 17, fontFamily: 'Space Grotesk, sans-serif' }}>{db.profile.name}</span>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {footerLinks.map(({ label, href }) => (
              <a key={label} href={href}
                onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  padding: '6px 14px', fontSize: 13, color: 'rgba(var(--color-white-rgb),0.45)',
                  textDecoration: 'none', borderRadius: 6, transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(var(--color-white-rgb),0.45)'}
              >{label}</a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(({ Icon, href }, i) => (
              <a key={i} href={href}
                style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: 'rgba(var(--color-white-rgb),0.04)', border: '1px solid rgba(var(--color-white-rgb),0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(var(--color-white-rgb),0.4)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#a855f7'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(var(--color-white-rgb),0.4)'; e.currentTarget.style.borderColor = 'rgba(var(--color-white-rgb),0.08)'; }}
              ><Icon size={16} /></a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(var(--color-white-rgb),0.05)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(var(--color-white-rgb),0.25)' }}>
            © {year} {db.profile.name}. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(var(--color-white-rgb),0.25)', display: 'flex', alignItems: 'center', gap: 6 }}>
            Built with <Heart size={12} style={{ color: '#ec4899' }} fill="#ec4899" /> using React & Framer Motion
            {' | '}<a href="#/admin" style={{ color: '#a855f7', textDecoration: 'none' }}>Admin Login</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
