import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { ExternalLink, Tag } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';

const tagColors = {
  React: '#06b6d4', 'Next.js': '#a855f7', Python: '#3b82f6', OpenAI: '#ec4899',
  WebSockets: '#6366f1', Stripe: '#3b82f6', 'Three.js': '#06b6d4', PostgreSQL: '#8b5cf6',
  'D3.js': '#f59e0b', 'Node.js': '#22c55e', MongoDB: '#22c55e', Vue: '#4ade80',
  WebRTC: '#a855f7', AWS: '#f59e0b', Redis: '#ef4444', Solidity: '#a855f7',
  IPFS: '#06b6d4', 'Ethers.js': '#6366f1', GraphQL: '#ec4899', Firebase: '#f59e0b',
  TensorFlow: '#f59e0b', 'React Native': '#06b6d4', TypeScript: '#3b82f6',
};

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -10;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 10;
    setTilt({ x: rx, y: ry });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
      style={{
        transformStyle: 'preserve-3d',
        cursor: 'none',
        borderRadius: 16,
        border: hovered ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 60px rgba(168,85,247,0.2)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      data-hover
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s ease' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(5,5,16,0.9))',
        }} />
        {/* Overlay buttons */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            background: 'rgba(5,5,16,0.6)', backdropFilter: 'blur(4px)',
          }}
        >
          <a href={project.demo}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            }}
          ><ExternalLink size={14} /> Live Demo</a>
          <a href={project.github}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            }}
          ><GithubIcon size={14} /> Code</a>
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
          {project.description}
        </p>
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: `${(tagColors[tag] || '#a855f7')}18`,
              border: `1px solid ${(tagColors[tag] || '#a855f7')}40`,
              color: tagColors[tag] || '#a855f7',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const titleRef = useRef(null);

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: '-5%', top: '30%', width: 350, height: 350,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{
            fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600,
            color: '#06b6d4', display: 'block', marginBottom: 12,
          }}>Practice Work</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            Learning <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 480, margin: '16px auto 0' }}>
            A clean showcase of the apps, clones, and tools I'm building to strengthen my technical skills.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .projects-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
