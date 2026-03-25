import { useState, useEffect } from 'react';
import CustomCursor from './components/cursor/CustomCursor';
import Preloader from './components/preloader/Preloader';
import Navbar from './components/navbar/Navbar';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import ProjectsSection from './components/projects/ProjectsSection';
import BlogSection from './components/blog/BlogSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/footer/Footer';
import { Lock } from 'lucide-react';

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

export default function App() {
  return (
    <div className="animated-gradient" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <div className="noise-overlay" />
      <CustomCursor />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      
      {/* Floating Admin Button */}
      <a href="#/admin" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
        background: 'rgba(var(--color-white-rgb),0.1)', padding: 12, borderRadius: '50%',
        backdropFilter: 'blur(10px)', border: '1px solid rgba(var(--color-white-rgb),0.2)',
        color: "var(--color-white)", display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', cursor: 'none'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.3)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(var(--color-white-rgb),0.1)'; e.currentTarget.style.borderColor = 'rgba(var(--color-white-rgb),0.2)'; }}
      >
        <Lock size={18} />
      </a>
    </div>
  );
}
