import { useState, useEffect } from 'react';
import { Plus, Trash, Save, Image as ImageIcon, Lock, FileText } from 'lucide-react';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const json = await res.json();
        setData({
          profile: json.profile || {},
          projects: json.projects || [],
          blogs: json.blogs || []
        });
      } else {
        setMessage('Failed to load data. API returned error.');
      }
    } catch (e) {
      console.error(e);
      setMessage('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'abhitiwariaj@gmail.com' && pass === 'abhinav@9452#tiwari') {
      setAuth(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage('Changes saved successfully! Refresh the main site to see.');
      } else {
        setMessage('Failed to save changes.');
      }
    } catch (e) {
      console.error(e);
      setMessage('Error saving data.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        });
        if (res.ok) {
          setMessage('Profile photo updated successfully!');
        } else {
          setMessage('Failed to upload photo.');
        }
      } catch (err) {
        setMessage('Error uploading photo.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      try {
        const res = await fetch('/api/upload-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        });
        if (res.ok) {
          setMessage('Hero Avatar updated successfully!');
        } else {
          setMessage('Failed to upload avatar.');
        }
      } catch (err) {
        setMessage('Error uploading avatar.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('Failed: Please upload a valid PDF file for your CV.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      try {
        const res = await fetch('/api/upload-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdf: base64Data }),
        });
        if (res.ok) {
          setMessage('CV document updated successfully!');
        } else {
          setMessage('Failed to upload CV.');
        }
      } catch (err) {
        setMessage('Error uploading CV.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const newItem = activeTab === 'projects'
      ? { id: Date.now(), title: 'New Project', description: '', image: '', tags: [], demo: '', github: '' }
      : { id: Date.now(), title: 'New Blog Post', date: new Date().toLocaleDateString(), category: '', excerpt: '', readTime: '', link: '' };

    setData({
      ...data,
      [activeTab]: [newItem, ...data[activeTab]],
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setData({
        ...data,
        [activeTab]: data[activeTab].filter(item => item.id !== id),
      });
    }
  };

  const handleEdit = (id, field, value) => {
    setData({
      ...data,
      [activeTab]: data[activeTab].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleProfileEdit = (field, value) => {
    setData({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  const handleTagsEdit = (id, value) => {
    const tagsArray = value.split(',').map(t => t.trim()).filter(t => t !== '');
    handleEdit(id, 'tags', tagsArray);
  };

  if (loading) return <div style={{ padding: 40, color: 'white' }}>Loading Admin Dashboard...</div>;

  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', background: '#050510', color: "var(--color-white)", display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ background: 'rgba(var(--color-white-rgb),0.05)', padding: 40, borderRadius: 16, border: '1px solid rgba(var(--color-white-rgb),0.1)', width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, background: 'rgba(168,85,247,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#a855f7' }}>
              <Lock size={24} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Admin Login</h2>
            <p style={{ color: 'rgba(var(--color-white-rgb),0.5)', fontSize: 13, marginTop: 8 }}>Enter your details to manage your portfolio.</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'rgba(var(--color-white-rgb),0.6)' }}>Email ID</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', borderRadius: 8, color: "var(--color-white)" }} placeholder="admin@abhinav.dev" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 8, color: 'rgba(var(--color-white-rgb),0.6)' }}>Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} required style={{ width: '100%', padding: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', borderRadius: 8, color: "var(--color-white)" }} placeholder="********" />
            </div>
            {loginError && <div style={{ color: '#ef4444', fontSize: 13 }}>{loginError}</div>}
            <button type="submit" style={{ padding: 12, background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: "var(--color-white)", border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
              Login to Dashboard
            </button>
            <a href="/" style={{ textAlign: 'center', fontSize: 13, color: 'rgba(var(--color-white-rgb),0.4)', textDecoration: 'none', marginTop: 8 }}>← Back to site</a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050510', color: "var(--color-white)", padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/" style={{ padding: '10px 20px', background: 'rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", borderRadius: 8, textDecoration: 'none' }}>
              ← Return to Site
            </a>
            <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg, #a855f7, #06b6d4)', color: "var(--color-white)", border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save All Updates'}
            </button>
          </div>
        </div>

        {message && (
          <div style={{ padding: 16, background: message.includes('Failed') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', border: '1px solid', borderColor: message.includes('Failed') ? '#ef4444' : '#22c55e', borderRadius: 8, marginBottom: 20 }}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {['profile', 'projects', 'blogs'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 24px', background: activeTab === tab ? 'rgba(168,85,247,0.2)' : 'transparent', border: '1px solid', borderColor: activeTab === tab ? '#a855f7' : 'rgba(var(--color-white-rgb),0.1)', color: activeTab === tab ? '#a855f7' : "var(--color-white)", borderRadius: 8, cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div style={{ background: 'rgba(var(--color-white-rgb),0.03)', border: '1px solid rgba(var(--color-white-rgb),0.08)', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(var(--color-white-rgb),0.08)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(var(--color-white-rgb),0.1)', overflow: 'hidden' }}>
                <img src={`/profile.jpg?t=${Date.now()}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 8, fontWeight: 600 }}>Profile Photo</h3>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(var(--color-white-rgb),0.1)', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
                  <ImageIcon size={14} /> Upload New Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(var(--color-white-rgb),0.08)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(var(--color-white-rgb),0.1)', overflow: 'hidden' }}>
                <img src={`/avatar.jpg?t=${Date.now()}`} alt="Hero Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 8, fontWeight: 600 }}>Hero 3D Avatar</h3>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(var(--color-white-rgb),0.1)', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
                  <ImageIcon size={14} /> Upload 3D Avatar
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(var(--color-white-rgb),0.08)' }}>
              <div style={{ width: 80, height: 80, borderRadius: 12, background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <FileText size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 8, fontWeight: 600 }}>Resume / CV Document</h3>
                <p style={{ fontSize: 13, color: 'rgba(var(--color-white-rgb),0.5)', marginBottom: 8 }}>Upload a PDF version of your resume to make it downloadable to visitors.</p>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(var(--color-white-rgb),0.1)', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
                  <ImageIcon size={14} /> Upload PDF Document
                  <input type="file" accept="application/pdf" onChange={handleCvUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {Object.keys(data.profile || {}).map(field => (
                <div key={field} style={{ gridColumn: (field.includes('Bio') || field.includes('subtitle') || field.includes('about')) ? '1 / -1' : 'auto' }}>
                  <label style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', color: 'rgba(var(--color-white-rgb),0.4)', marginBottom: 8, letterSpacing: 1 }}>{field}</label>
                  {(field.includes('Bio') || field.includes('subtitle') || field.includes('about')) ? (
                    <textarea value={data.profile[field]} onChange={(e) => handleProfileEdit(field, e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", padding: 12, borderRadius: 8, minHeight: 100, resize: 'vertical' }} />
                  ) : (
                    <input type="text" value={data.profile[field]} onChange={(e) => handleProfileEdit(field, e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", padding: 12, borderRadius: 8 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'projects' || activeTab === 'blogs') && (
          <>
            <button onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(var(--color-white-rgb),0.05)', color: "var(--color-white)", border: '1px dashed rgba(var(--color-white-rgb),0.2)', borderRadius: 8, cursor: 'pointer', marginBottom: 20, width: '100%', justifyContent: 'center' }}>
              <Plus size={16} /> Add New {activeTab === 'projects' ? 'Project' : 'Blog Post'}
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {data[activeTab].map((item, index) => (
                <div key={item.id} style={{ background: 'rgba(var(--color-white-rgb),0.03)', border: '1px solid rgba(var(--color-white-rgb),0.08)', borderRadius: 12, padding: 24, position: 'relative' }}>

                  <button onClick={() => handleDelete(item.id)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer' }}>
                    <Trash size={16} />
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                    {Object.keys(item).filter(k => k !== 'id').map(field => (
                      <div key={field} style={{ gridColumn: (field === 'description' || field === 'excerpt') ? '1 / -1' : 'auto' }}>
                        <label style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', color: 'rgba(var(--color-white-rgb),0.4)', marginBottom: 8, letterSpacing: 1 }}>{field}</label>

                        {(field === 'description' || field === 'excerpt') ? (
                          <textarea
                            value={item[field]}
                            onChange={(e) => handleEdit(item.id, field, e.target.value)}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", padding: 12, borderRadius: 8, minHeight: 100, resize: 'vertical' }}
                          />
                        ) : field === 'tags' ? (
                          <input
                            type="text"
                            value={(item.tags || []).join(', ')}
                            onChange={(e) => handleTagsEdit(item.id, e.target.value)}
                            placeholder="Comma separated tags (e.g. React, Node)"
                            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", padding: 12, borderRadius: 8 }}
                          />
                        ) : (
                          <input
                            type="text"
                            value={item[field]}
                            onChange={(e) => handleEdit(item.id, field, e.target.value)}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(var(--color-white-rgb),0.1)', color: "var(--color-white)", padding: 12, borderRadius: 8 }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {data[activeTab].length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', color: 'rgba(var(--color-white-rgb),0.3)' }}>
                  No {activeTab} yet.
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
