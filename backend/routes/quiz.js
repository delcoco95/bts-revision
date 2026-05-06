const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function loadJSON(file) {
  try {
    let content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1); // strip UTF-8 BOM
    return JSON.parse(content);
  } catch { return []; }
}

// GET /api/quiz/:subject — liste des quiz par matiere
router.get('/:subject', (req, res) => {
  const { subject } = req.params;
  const allowed = ['sisr', 'cyber', 'cejm', 'maths', 'anglais', 'culture', 'e5', 'e6', 'e7'];
  if (!allowed.includes(subject)) return res.status(400).json({ error: 'Matiere inconnue.' });
  const data = loadJSON(`quiz_${subject}.json`);
  res.json(data);
});

// GET /api/quiz/:subject/:id — un quiz specifique (sans correction)
router.get('/:subject/:id', (req, res) => {
  const { subject, id } = req.params;
  const data = loadJSON(`quiz_${subject}.json`);
  const quiz = data.find(q => q.id === id);
  if (!quiz) return res.status(404).json({ error: 'Quiz introuvable.' });
  // On envoie sans la correction
  const { correction, ...quizSansCorrection } = quiz;
  res.json(quizSansCorrection);
});

// POST /api/quiz/:subject/:id/check — verification d'une reponse
router.post('/:subject/:id/check', (req, res) => {
  const { subject, id } = req.params;
  const { answer } = req.body;
  const data = loadJSON(`quiz_${subject}.json`);
  const quiz = data.find(q => q.id === id);
  if (!quiz) return res.status(404).json({ error: 'Quiz introuvable.' });

  if (quiz.type === 'qcm') {
    const correct = quiz.correct === answer;
    res.json({ correct, correction: quiz.correction, expected: quiz.correct });
  } else {
    res.json({ correction: quiz.correction });
  }
});

module.exports = router;
