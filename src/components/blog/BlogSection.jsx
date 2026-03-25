import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blog';
import { ArrowRight, Clock } from 'lucide-react';

const categoryColors = {
  'AI & Design': '#a855f7', React: '#06b6d4', '3D & WebGL': '#3b82f6',
  CSS: '#ec4899', Architecture: '#f59e0b', Animation: '#22c55e',
};

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(168,85,247,0.15)' }}
      style={{
        borderRadius: 16, overflow: 'hidden',
        background: 'rgba(var(--color-white-rgb),0.03)',
        border: '1px solid rgba(var(--color-white-rgb),0.07)',
        backdropFilter: 'blur(20px)',
        cursor: 'none',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(var(--color-white-rgb),0.07)'}
      data-hover
    >
      {/* Color top bar */}
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${categoryColors[post.category] || '#a855f7'}, #06b6d4)`,
      }} />

      <div style={{ padding: '28px 28px 24px' }}>
        {/* Category + Read time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 700,
            background: `${categoryColors[post.category] || '#a855f7'}18`,
            border: `1px solid ${categoryColors[post.category] || '#a855f7'}30`,
            color: categoryColors[post.category] || '#a855f7',
            letterSpacing: 0.5,
          }}>{post.category}</span>
          <span style={{ fontSize: 12, color: 'rgba(var(--color-white-rgb),0.35)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={12} /> {post.readTime}
          </span>
        </div>

        <h3 style={{
          fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 12,
          fontFamily: 'Space Grotesk, sans-serif',
        }}>{post.title}</h3>
        
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(var(--color-white-rgb),0.5)', marginBottom: 20 }}>
          {post.excerpt}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(var(--color-white-rgb),0.3)' }}>{post.date}</span>
          <motion.a href={post.link || '#'} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
              color: '#a855f7', textDecoration: 'none',
            }}
          >
            Read more <ArrowRight size={14} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogSection() {
  return (
    <section id="blog" className="section" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', right: '-5%', bottom: '10%', width: 350, height: 350,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{
            fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600,
            color: '#ec4899', display: 'block', marginBottom: 12,
          }}>My Technical Writing</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
            Latest <span className="gradient-text-pink">Articles</span>
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(var(--color-white-rgb),0.45)', fontSize: 16, maxWidth: 480, margin: '16px auto 0' }}>
            A collection of my recent articles on programming, JavaScript, and software development.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="blog-grid">
          {blogPosts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 60 }}
        >
          <a href="https://hashnode.com/@abhitiwari" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            View All Articles <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
