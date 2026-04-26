import { useState, useEffect } from 'react';
import { Plus, Trash, Save, Image as ImageIcon, Lock, FileText, Upload, Palette, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import fallbackDb from './data/db.json';

export default function Admin() {
  const [data, setData] = useState({ profile: {}, projects: [], blogs: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // Login State
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const themes = [
    { id: 'default', name: 'Neon Purple (Default)', color: '#a855f7' },
    { id: 'cyberpunk', name: 'Cyberpunk Red', color: '#ef4444' },
    { id: 'emerald', name: 'Emerald Nature', color: '#10b981' },
    { id: 'crimson', name: 'Crimson Vampire', color: '#e11d48' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  // Update document theme when data profile theme changes in admin
  useEffect(() => {
    if (data.profile?.theme) {
      document.documentElement.setAttribute('data-theme', data.profile.theme);
    }
  }, [data.profile?.theme]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        setData({
          profile: json.profile || fallbackDb.profile || {},
          projects: json.projects || fallbackDb.projects || [],
          blogs: json.blogs || fallbackDb.blogs || []
        });
        if (json.profile?.theme) {
          document.documentElement.setAttribute('data-theme', json.profile.theme);
        }
      } else {
        setData(fallbackDb);
      }
    } catch (e) {
      console.warn('API unavailable, fallback.', e);
      setData(fallbackDb);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (email === 'abhitiwariaj@gmail.com' && pass === 'abhinav@9452#tiwari') {
      setAuth(true);
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showMsg('Data successfully synchronized to database!');
      } else {
        showMsg('Failed to save data. Read-only mode active?');
      }
    } catch (e) {
      showMsg('Network error. Check console.');
    } finally {
      setSaving(false);
    }
  };

  const uploadFile = async (endpoint, payload, successMsg) => {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        showMsg(successMsg);
        return result.url;
      }
      showMsg('Upload failed.');
    } catch (err) {
      showMsg('Upload error.');
    }
    return null;
  };

  const handleGeneralUpload = (e, type, projectId = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;

      if (type === 'profile') {
        const url = await uploadFile('/api/upload', { image: base64Data, filename: 'profile.jpg' }, 'Profile photo updated!');
        if (url) handleProfileEdit('profileImage', url);
      } else if (type === 'avatar') {
        await uploadFile('/api/upload-avatar', { image: base64Data }, 'Hero Avatar updated!');
      } else if (type === 'cv') {
        if (file.type !== 'application/pdf') return showMsg('Please upload a PDF.');
        await uploadFile('/api/upload-cv', { pdf: base64Data }, 'CV updated!');
      } else if (type === 'project') {
        const filename = `project-${projectId || Date.now()}.jpg`;
        const url = await uploadFile('/api/upload', { image: base64Data, filename }, 'Project thumbnail updated!');
        if (url && projectId) {
          handleEdit(projectId, 'image', url);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const newItem = activeTab === 'projects'
      ? { id: Date.now(), title: 'New Project', description: '', image: '', tags: [], demo: '', github: '' }
      : { id: Date.now(), title: 'New Blog Post', date: new Date().toLocaleDateString(), category: '', excerpt: '', readTime: '', link: '' };

    setData({ ...data, [activeTab]: [newItem, ...data[activeTab]] });
  };

  const handleDelete = (id) => {
    if (confirm('Delete this entry permanently?')) {
      setData({ ...data, [activeTab]: data[activeTab].filter(item => item.id !== id) });
    }
  };

  const handleEdit = (id, field, value) => {
    setData({
      ...data,
      [activeTab]: data[activeTab].map(item => item.id === id ? { ...item, [field]: value } : item),
    });
  };

  const handleProfileEdit = (field, value) => {
    setData({ ...data, profile: { ...data.profile, [field]: value } });
  };

  const handleTagsEdit = (id, value) => {
    const tagsArray = value.split(',').map(t => t.trim()).filter(t => t !== '');
    handleEdit(id, 'tags', tagsArray);
  };

  const changeTheme = (themeId) => {
    handleProfileEdit('theme', themeId);
    showMsg(`Theme changed to ${themeId}. Push save to persist globally.`);
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-purple)' }}>
      Loading Secure Gateway...
    </div>
  );

  if (!auth) {
    return (
      <div className="animated-gradient" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass glow-purple" style={{ width: '100%', maxWidth: 420, padding: 40, border: '1px solid rgba(var(--color-white-rgb), 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(var(--color-white-rgb),0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-purple)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
              <Lock size={28} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
              Admin Gateway
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              Authorized personnel only.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--neon-purple)', marginBottom: 8 }}>Email ID</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-glass" placeholder="admin@domain.com" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--neon-purple)', marginBottom: 8 }}>Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} required className="input-glass" placeholder="•••••••••" />
            </div>

            {loginError && <div style={{ color: '#ec4899', fontSize: 13, textAlign: 'center', background: 'rgba(236,72,153,0.1)', padding: 10, borderRadius: 8 }}>{loginError}</div>}

            <button type="submit" className="btn-neon" style={{ display: 'block', width: '100%', padding: '16px 0', marginTop: 10 }}>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                Proceed
              </span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Home size={12} /> Return to Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark-bg)', color: "var(--color-white)", fontFamily: 'Inter, sans-serif', paddingBottom: 100 }}>
      {/* Background Ambience */}
      <div style={{ position: 'fixed', top: -200, left: -200, width: 600, height: 600, background: 'radial-gradient(ellipse, var(--neon-purple) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, opacity: 0.1, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(ellipse, var(--neon-cyan) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, opacity: 0.1, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, padding: '40px 24px' }}>

        {/* Header */}
        <header className="glass" style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 20, boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}>A</div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', margin: 0, letterSpacing: -0.5 }}>Command Center</h1>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Authenticated Session</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {message && <div style={{ color: 'var(--neon-cyan)', fontSize: 14, background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', marginRight: 10 }}>{message}</div>}
            <a href="/" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', textDecoration: 'none' }}><Home size={16} /> Live Site</a>
            <button className="btn-neon" onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', cursor: saving ? 'wait' : 'pointer' }}>
              <Save size={16} /> <span>{saving ? 'Syncing...' : 'Save Database'}</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 10 }}>
          {['projects', 'blogs', 'profile'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 32px', borderRadius: 10, fontWeight: 600, fontSize: 14, textTransform: 'capitalize', letterSpacing: 0.5,
              background: activeTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: `1px solid ${activeTab === tab ? 'var(--neon-purple)' : 'rgba(255,255,255,0.1)'}`,
              color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: activeTab === tab ? '0 0 20px rgba(168,85,247,0.2)' : 'none'
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Frame */}
        <div className="glass" style={{ padding: '40px', minHeight: 600 }}>

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 800, margin: '0 auto' }}>

              {/* Theme Settings Area */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.05)', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Palette size={20} color="var(--neon-purple)" />
                  <h3 style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--neon-purple)', fontWeight: 700, margin: 0 }}>Global Portfolio Theme</h3>
                </div>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => changeTheme(theme.id)}
                      style={{
                        flex: '1 1 150px',
                        padding: '16px',
                        borderRadius: 12,
                        background: data.profile?.theme === theme.id ? `min(rgba(${theme.color}, 0.2), #111)` : 'rgba(255,255,255,0.02)',
                        border: `2px solid ${data.profile?.theme === theme.id ? theme.color : 'rgba(255,255,255,0.1)'}`,
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: theme.color, margin: '0 auto 10px', boxShadow: `0 0 10px ${theme.color}` }} />
                      <span style={{ fontSize: 12 }}>{theme.name}</span>
                    </button>
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Selecting a theme instantly previews it. Remember to press <b>Save Database</b> to apply it to the live portfolio permanently.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 40 }}>
                {/* Visual Assets */}
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--neon-purple)', fontWeight: 700, marginBottom: 20 }}>Visual Assets</h3>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                        <img src={`/profile.jpg?t=${Date.now()}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                      </div>
                      <label style={{ position: 'absolute', bottom: -5, right: -5, width: 30, height: 30, background: 'var(--neon-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        <Upload size={14} color="#fff" />
                        <input type="file" accept="image/*" onChange={(e) => handleGeneralUpload(e, 'profile')} style={{ display: 'none' }} />
                      </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>Primary Photo</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Display picture for portfolio</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                        <img src={`/avatar.jpg?t=${Date.now()}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                      </div>
                      <label style={{ position: 'absolute', bottom: -5, right: -5, width: 30, height: 30, background: 'var(--neon-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        <Upload size={14} color="#fff" />
                        <input type="file" accept="image/*" onChange={(e) => handleGeneralUpload(e, 'avatar')} style={{ display: 'none' }} />
                      </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>3D Hero Avatar</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>For the floating model hero</span>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 16, padding: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: 20 }}>Digital Documents</h3>

                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--neon-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-pink)' }}>
                      <FileText size={28} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 4 }}>Curriculum Vitae</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, display: 'block', marginBottom: 12 }}>PDF formatting is required</span>
                      <label className="btn-outline" style={{ display: 'inline-block', padding: '6px 14px', fontSize: 12, borderRadius: 6, borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
                        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Upload size={12} /> Replace File</span>
                        <input type="file" accept="application/pdf" onChange={(e) => handleGeneralUpload(e, 'cv')} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Data Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {Object.keys(data.profile || {}).filter(k => k !== 'theme').map(field => (
                  <div key={field}>
                    <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    {field.includes('Bio') || field.includes('about') ? (
                      <textarea
                        value={data.profile[field]}
                        onChange={(e) => handleProfileEdit(field, e.target.value)}
                        className="input-glass"
                        style={{ minHeight: 120, resize: 'vertical' }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={data.profile[field]}
                        onChange={(e) => handleProfileEdit(field, e.target.value)}
                        className="input-glass"
                      />
                    )}
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {(activeTab === 'projects' || activeTab === 'blogs') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, margin: 0, fontWeight: 600 }}>Active Registry ({data[activeTab].length} entries)</h2>
                <button onClick={handleAdd} className="btn-neon" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Plus size={16} /> <span>New {activeTab === 'projects' ? 'Project' : 'Blog'} Entry</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {data[activeTab].map((item) => (
                  <div key={item.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', padding: 32, position: 'relative' }}>
                    <button onClick={() => handleDelete(item.id)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(236,72,153,0.1)', color: 'var(--neon-pink)', border: '1px solid rgba(236,72,153,0.2)', padding: '10px', borderRadius: '12px', cursor: 'pointer', zIndex: 10 }}>
                      <Trash size={16} />
                    </button>

                    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>

                      {activeTab === 'projects' && (
                        <div style={{ width: '100%', maxWidth: 320 }}>
                          <label style={{ display: 'block', paddingBottom: 12, fontSize: 12, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>Feature Graphic</label>
                          <div style={{ width: '100%', aspectRatio: '16/10', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', position: 'relative', marginBottom: 16 }}>
                            {item.image ? (
                              <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.1)' }}><ImageIcon size={48} /></div>
                            )}
                            <label style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--neon-purple)' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                              <Upload size={32} style={{ marginBottom: 12 }} />
                              <span style={{ fontSize: 13, fontWeight: 600 }}>Upload Image</span>
                              <input type="file" accept="image/*" onChange={(e) => handleGeneralUpload(e, 'project', item.id)} style={{ display: 'none' }} />
                            </label>
                          </div>
                          <input type="text" value={item.image} onChange={(e) => handleEdit(item.id, 'image', e.target.value)} className="input-glass" placeholder="https://external-image-url..." style={{ fontSize: 12, padding: '10px 14px' }} />
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, color: 'var(--neon-purple)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Title Identifier</label>
                          <input type="text" value={item.title} onChange={(e) => handleEdit(item.id, 'title', e.target.value)} className="input-glass" style={{ fontSize: 20, fontWeight: 700, borderColor: 'rgba(168,85,247,0.3)' }} />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Payload / Description</label>
                          <textarea value={item.description || item.excerpt} onChange={(e) => handleEdit(item.id, activeTab === 'projects' ? 'description' : 'excerpt', e.target.value)} className="input-glass" style={{ minHeight: 100, resize: 'vertical' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                          {Object.keys(item).filter(k => !['id', 'title', 'description', 'excerpt', 'image'].includes(k)).map(field => (
                            <div key={field} style={{ gridColumn: field === 'tags' ? '1 / -1' : 'auto' }}>
                              <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>{field}</label>
                              {field === 'tags' ? (
                                <div>
                                  <input type="text" value={(item.tags || []).join(', ')} onChange={(e) => handleTagsEdit(item.id, e.target.value)} className="input-glass" placeholder="react, node, framer" />
                                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                                    {(item.tags || []).map((t, idx) => (
                                      <span key={idx} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)', borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{t}</span>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <input type="text" value={item[field]} onChange={(e) => handleEdit(item.id, field, e.target.value)} className="input-glass" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

                {data[activeTab].length === 0 && (
                  <div style={{ padding: 80, textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                    No {activeTab} defined in current database layout.
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
