import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '../../data/skills';
import { Code2, Layers, Cpu, Palette, Zap } from 'lucide-react';
import db from '../../data/db.json';

const techIcons = [
  { label: 'JavaScript', icon: '💛' },
  { label: 'React.js', icon: '⚛️' },
  { label: 'Node.js', icon: '🟢' },
  { label: 'Java', icon: '☕' },
  { label: 'HTML/CSS', icon: '🎨' },
  { label: 'Git/GitHub', icon: '🐙' },
  { label: 'Tech Writing', icon: '📝' },
];

function SkillBar({ name, level, color, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 13, color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, #06b6d4)` }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute', right: '-5%', top: '20%', width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        {/* Section title */}
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{
            fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600,
            color: '#a855f7', display: 'block', marginBottom: 12,
          }}>About Me</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            The <span className="gradient-text">Story</span> Behind the Code
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}
          className="about-grid">

          {/* Left card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Avatar card */}
            <div className="glass" style={{ padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(168,85,247,0.4)', overflow: 'hidden'
              }}>
                <img src="/profile.jpg" alt={db.profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, fontFamily: 'Space Grotesk, sans-serif' }}>
                {db.profile.name}
              </h3>
              <p style={{ color: '#a855f7', fontSize: 13, marginBottom: 20 }}>{db.profile.role}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { icon: <Code2 size={14} />, text: 'Consistent Learner' },
                  { icon: <Layers size={14} />, text: 'Active Creator' },
                  { icon: <Zap size={14} />, text: '13+ Blogs' },
                ].map(({ icon, text }) => (
                  <span key={text} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
                    color: '#a855f7',
                  }}>
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio card */}
            <div className="glass" style={{ padding: 32 }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, fontFamily: 'Space Grotesk, sans-serif' }}>
                Hey there! 👋
              </h4>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>
                {db.profile.aboutBio1}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)' }}>
                {db.profile.aboutBio2}
              </p>

              {/* Tech icons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                {techIcons.map(({ label, icon }) => (
                  <motion.div key={label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    style={{
                      padding: '6px 12px', borderRadius: 8, fontSize: 13,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'all 0.2s', cursor: 'none',
                    }}
                    data-hover
                  >
                    <span>{icon}</span> <span style={{ fontSize: 12 }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="glass" style={{ padding: 36 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
                Skills & Expertise
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
                Proficiency levels across my core stack
              </p>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} i={i} />
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              {[
                { num: '13+', label: 'Blogs Written', icon: <Cpu size={20} /> },
                { num: 'Active', label: 'Content Creator', icon: <Layers size={20} /> },
                { num: 'MCA', label: 'Student', icon: <Palette size={20} /> },
                { num: 'Daily', label: 'Consistent Learner', icon: <Zap size={20} /> },
              ].map(({ num, label, icon }) => (
                <motion.div key={label} className="glass" whileHover={{ scale: 1.03, y: -3 }}
                  style={{ padding: '24px 20px', textAlign: 'center', cursor: 'none' }} data-hover>
                  <div style={{ color: '#a855f7', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}
                    className="gradient-text">{num}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
