const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function loadJSON(file) {
  try {
    let content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1); // strip UTF-8 BOM
    return JSON.parse(content);
  } catch { return []; }
}

// GET /api/glossaire
router.get('/api/glossaire', (req, res) => {
  res.json(loadJSON('glossaire.json'));
});

// GET /api/acronymes
router.get('/api/acronymes', (req, res) => {
  res.json(loadJSON('acronymes.json'));
});

// also handle root (when mounted at /api/glossaire or /api/acronymes)
router.get('/', (req, res) => {
  const isAcro = req.baseUrl.includes('acronymes');
  res.json(loadJSON(isAcro ? 'acronymes.json' : 'glossaire.json'));
});

module.exports = router;
