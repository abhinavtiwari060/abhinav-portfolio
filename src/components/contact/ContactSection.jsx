import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/SocialIcons';
import db from '../../data/db.json';

const socials = [
  { Icon: GithubIcon, href: db.profile.github, label: 'GitHub', color: '#a855f7' },
  { Icon: LinkedinIcon, href: db.profile.linkedin, label: 'LinkedIn', color: '#3b82f6' },
  { Icon: TwitterIcon, href: db.profile.twitter, label: 'Twitter', color: '#06b6d4' },
  { Icon: Mail, href: `mailto:${db.profile.email}`, label: 'Email', color: '#ec4899' },
];

const contactInfo = [
  { Icon: Mail, label: db.profile.email },
  { Icon: MapPin, label: db.profile.location },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formsubmit.co/ajax/abhitiwariaj@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '20%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{
            fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600,
            color: '#a855f7', display: 'block', marginBottom: 12,
          }}>Get In Touch</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(var(--color-white-rgb),0.45)', fontSize: 16, maxWidth: 480, margin: '16px auto 0' }}>
            Have a project in mind? I'd love to hear about it. Let's build something amazing together.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}
          className="contact-grid">

          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
          >
            <div className="glass" style={{ padding: 36, marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
                Open to Opportunities
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(var(--color-white-rgb),0.55)', marginBottom: 28 }}>
                I'm currently available for freelance projects and full-time roles. Whether you need a full product built or a beautiful UI polished — let's talk!
              </p>

              {contactInfo.map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#a855f7', flexShrink: 0,
                  }}><Icon size={16} /></div>
                  <span style={{ fontSize: 14, color: 'rgba(var(--color-white-rgb),0.6)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="glass" style={{ padding: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(var(--color-white-rgb),0.4)', marginBottom: 16, letterSpacing: 1 }}>
                FIND ME ON
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {socials.map(({ Icon, href, label, color }) => (
                  <motion.a key={label} href={href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: `${color}10`, border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, textDecoration: 'none', transition: 'box-shadow 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${color}50`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
          >
            <div className="glass" style={{ padding: 40 }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}
                  className="form-row">
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8,
                      color: 'rgba(var(--color-white-rgb),0.5)' }}>Your Name</label>
                    <input
                      className="input-glass" placeholder="John Doe" required
                      value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8,
                      color: 'rgba(var(--color-white-rgb),0.5)' }}>Email Address</label>
                    <input
                      type="email" className="input-glass" placeholder="hello@example.com" required
                      value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8,
                    color: 'rgba(var(--color-white-rgb),0.5)' }}>Subject</label>
                  <input className="input-glass" placeholder="Project Collaboration" />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8,
                    color: 'rgba(var(--color-white-rgb),0.5)' }}>Message</label>
                  <textarea
                    className="input-glass" rows={5} placeholder="Tell me about your project..." required
                    value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                <motion.button
                  type="submit" className="btn-neon"
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {sent ? '✓ Message Sent!' : <><Send size={16} /> Send Message</>}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
