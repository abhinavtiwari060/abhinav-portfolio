import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            const filePath = path.resolve(__dirname, 'src/data/db.json');
            // Write formatted JSON
            const formatted = JSON.stringify(JSON.parse(body), null, 2);
            fs.writeFileSync(filePath, formatted);
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
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { image } = JSON.parse(body);
            const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
            const filePath = path.resolve(__dirname, 'public/profile.jpg');
            fs.writeFileSync(filePath, base64Data, 'base64');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      } else if (req.url === '/api/upload-avatar' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { image } = JSON.parse(body);
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
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { pdf } = JSON.parse(body);
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
