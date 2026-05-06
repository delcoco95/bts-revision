const express = require('express');
const router = express.Router();

// Stockage en memoire de session (a remplacer par SQLite pour persistance)
// GET /api/progress
router.get('/', (req, res) => {
  if (!req.session.progress) req.session.progress = {};
  res.json(req.session.progress);
});

// POST /api/progress — enregistrer un score
router.post('/', (req, res) => {
  const { subject, quizId, score, total } = req.body;
  if (!subject || score === undefined || total === undefined) {
    return res.status(400).json({ error: 'subject, score et total sont requis.' });
  }
  if (!req.session.progress) req.session.progress = {};
  if (!req.session.progress[subject]) req.session.progress[subject] = [];
  req.session.progress[subject].push({
    quizId,
    score,
    total,
    pct: Math.round((score / total) * 100),
    date: new Date().toISOString()
  });
  res.json({ saved: true, progress: req.session.progress[subject] });
});

// DELETE /api/progress — reset
router.delete('/', (req, res) => {
  req.session.progress = {};
  res.json({ reset: true });
});

module.exports = router;
