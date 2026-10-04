/**
 * EG TECH — Production Node.js Server & REST API
 * Handles static asset delivery and persistent project inquiry storage via node:sqlite.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite Database
const dbPath = path.join(DATA_DIR, 'inquiries.db');
const db = new DatabaseSync(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS project_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL,
    description TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    reference_url TEXT,
    attachment_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertInquiry = db.prepare(`
  INSERT INTO project_inquiries (
    name, email, phone, company, project_type, description, budget, timeline, reference_url, attachment_name
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const getAllInquiries = db.prepare(`
  SELECT * FROM project_inquiries ORDER BY created_at DESC
`);

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // API ROUTE: POST /api/project-inquiry
  if (pathname === '/api/project-inquiry' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Cap at 10MB
      if (body.length > 10 * 1024 * 1024) {
        req.destroy();
      }
    });

    req.on('end', () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload format.' }));
        return;
      }

      try {
        // Validation
        const errors = [];
        if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
          errors.push('Full Name is required.');
        }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          errors.push('A valid email address is required.');
        }
        if (!data.phone || data.phone.trim().length < 6) {
          errors.push('A valid phone number is required.');
        }
        const projectType = data.projectType || data.project_type || '';
        if (!projectType) {
          errors.push('Please select a project type.');
        }
        if (!data.description || data.description.trim().length < 10) {
          errors.push('Please provide a brief description (at least 10 characters).');
        }

        if (errors.length > 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, errors }));
          return;
        }

        // Insert into SQLite database
        const result = insertInquiry.run(
          data.name.trim(),
          data.email.trim(),
          data.phone.trim(),
          (data.company || '').trim(),
          projectType,
          data.description.trim(),
          data.budget || 'Not decided',
          data.timeline || 'Flexible',
          (data.referenceUrl || data.reference_url || '').trim(),
          data.attachmentName || data.attachment_name || ''
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Project inquiry stored successfully in EG TECH database.',
          inquiryId: Number(result.lastInsertRowid),
          receivedAt: new Date().toISOString()
        }));

      } catch (err) {
        console.error('API Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Internal server error processing inquiry.' }));
      }
    });
    return;
  }

  // API ROUTE: GET /api/project-inquiries (Inspect all stored inquiries)
  if (pathname === '/api/project-inquiries' && req.method === 'GET') {
    try {
      const rows = getAllInquiries.all();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: rows.length, inquiries: rows }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // Static File Serving
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = 'index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[EG TECH] Server running at http://localhost:${PORT}`);
  console.log(`[EG TECH] SQLite database active at ${dbPath}`);
});
