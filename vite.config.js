import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Helper to parse JSON body
      const getBody = (req) => new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      });

      if (req.url === '/api/data' && req.method === 'POST') {
        getBody(req).then(data => {
          try {
            const filePath = path.resolve(__dirname, 'src/data/db.json');
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else if (req.url === '/api/data' && req.method === 'GET') {
        try {
          const filePath = path.resolve(__dirname, 'src/data/db.json');
          const data = fs.readFileSync(filePath, 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.end(data);
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      } else if (req.url === '/api/upload' && req.method === 'POST') {
        getBody(req).then(({ image, filename }) => {
          try {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const name = filename || 'profile.jpg';
            const filePath = path.resolve(__dirname, `public/${name}`);
            fs.writeFileSync(filePath, base64Data, 'base64');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: `/${name}` }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else if (req.url === '/api/upload-avatar' && req.method === 'POST') {
        getBody(req).then(({ image }) => {
          try {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const filePath = path.resolve(__dirname, 'public/avatar.jpg');
            fs.writeFileSync(filePath, base64Data, 'base64');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else if (req.url === '/api/upload-cv' && req.method === 'POST') {
        getBody(req).then(({ pdf }) => {
          try {
            const base64Data = pdf.replace(/^data:application\/pdf;base64,/, "");
            const filePath = path.resolve(__dirname, 'public/cv.pdf');
            fs.writeFileSync(filePath, base64Data, 'base64');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localApi()
  ],
})
