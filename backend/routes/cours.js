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

// GET /api/cours — liste de toutes les matieres
router.get('/', (req, res) => {
  res.json([
    { id: 'sisr',    label: 'SISR — Reseaux, Systemes, Cybersecurite',              icon: 'network-wired' },
    { id: 'cejm',   label: 'CEJM — Culture Economique Juridique et Manageriale',   icon: 'balance-scale' },
    { id: 'culture',label: 'Culture Generale & Expression (E1)',                   icon: 'pen-nib' },
    { id: 'maths',  label: 'Mathematiques pour l\'informatique (E2)',               icon: 'calculator' },
    { id: 'anglais',label: 'Anglais — Progression A2 vers B2',                     icon: 'language' },
    { id: 'e5',     label: 'Epreuve E5 — Parcours de professionnalisation (oral)',  icon: 'person-chalkboard' },
    { id: 'e6',     label: 'Epreuve E6 — Cybersecurite des services informatiques',icon: 'shield-halved' },
    { id: 'e7',     label: 'Epreuve E7 — Administration des systemes et des reseaux (SISR)', icon: 'server' }
  ]);
});

// GET /api/cours/sujets/:subject — liste des sujets BTS avec corrections
router.get('/sujets/:subject', (req, res) => {
  const { subject } = req.params;
  const data = loadJSON(`sujets_${subject}.json`);
  res.json(data);
});

// GET /api/cours/:subject — contenu structure d'une matiere
router.get('/:subject', (req, res) => {
  const { subject } = req.params;
  const allowed = ['sisr', 'cyber', 'cejm', 'maths', 'anglais', 'culture', 'e5', 'e6', 'e7'];
  if (!allowed.includes(subject)) return res.status(400).json({ error: 'Matiere inconnue.' });
  const data = loadJSON(`cours_${subject}.json`);
  res.json(data);
});

// GET /api/cours/:subject/sujet/:id — sujet type BTS (sans correction)
router.get('/:subject/sujet/:id', (req, res) => {
  const { subject, id } = req.params;
  const sujets = loadJSON(`sujets_${subject}.json`);
  const sujet = sujets.find(s => s.id === id);
  if (!sujet) return res.status(404).json({ error: 'Sujet introuvable.' });
  const { correction, ...sujetSansCorrection } = sujet;
  res.json(sujetSansCorrection);
});

// GET /api/cours/:subject/sujet/:id/correction — correction (bouton dedicace)
router.get('/:subject/sujet/:id/correction', (req, res) => {
  const { subject, id } = req.params;
  const sujets = loadJSON(`sujets_${subject}.json`);
  const sujet = sujets.find(s => s.id === id);
  if (!sujet) return res.status(404).json({ error: 'Sujet introuvable.' });
  res.json({ correction: sujet.correction });
});

module.exports = router;
