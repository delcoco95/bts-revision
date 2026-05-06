require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');

const aiRouter = require('./routes/ai');
const quizRouter = require('./routes/quiz');
const coursRouter = require('./routes/cours');
const progressRouter = require('./routes/progress');
const glossaireRouter = require('./routes/glossaire');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Securite ──────────────────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false // desactive pour le dev local
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Trop de requetes, attendez quelques minutes.' }
}));

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Limite IA atteinte (20 req/min).' }
});

// ── Middlewares ────────────────────────────────────────────────────────────────
// CORS: autorise GitHub Pages + localhost
const allowedOrigins = [
  'https://delcoco95.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];
app.use(cors({
  origin: function(origin, callback) {
    // Autorise les requetes sans origin (Postman, curl) et les origines connues
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('CORS bloque : origine non autorisee'));
    }
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// ── Static frontend ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── Routes API ─────────────────────────────────────────────────────────────────
app.use('/api/ai', aiLimiter, aiRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/cours', coursRouter);
app.use('/api/progress', progressRouter);
app.use('/api/glossaire', glossaireRouter);
app.use('/api/acronymes', glossaireRouter);

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', env: process.env.NODE_ENV });
});

// ── Catch-all : retourne index.html pour le SPA ───────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n[BTS Revision] Serveur demarre sur http://localhost:${PORT}`);
  console.log(`[BTS Revision] Cles API chargees depuis .env (jamais exposees au frontend)\n`);
});
