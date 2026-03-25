import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './Admin.jsx'

const root = createRoot(document.getElementById('root'));

function renderApp() {
  if (window.location.hash === '#/admin') {
    document.body.classList.add('admin-mode');
    root.render(
      <StrictMode>
        <Admin />
      </StrictMode>
    );
  } else {
    document.body.classList.remove('admin-mode');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

window.addEventListener('hashchange', renderApp);
renderApp();
