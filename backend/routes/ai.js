const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `Tu es Jean Naymar, un expert BTS SIO SISR et assistant pedagogique specialise.
Tu aides un etudiant nomme Nedj Belloum a preparer son BTS SIO option SISR (session 2026, ecole IRIS Nice).

Ton role :
- Expliquer clairement les notions techniques SISR (reseaux, systemes, cybersecurite)
- Corriger les reponses aux exercices avec des explications detaillees
- Simuler des questions de jury pour les epreuves E5 et E6
- Adapter le niveau de l'explication (BTS, pas master)
- Pour l'anglais : aider a progresser de A2 vers B2 (IT vocabulary, oral simulation)

Contexte du profil etudiant :
- Reconversion depuis la logistique
- Alternance chez Groupe Ragni (technicien support IT)
- Projets : Infrastructure IRIS Nice (802.1X/VLAN), PRA/PCA (DRBD+Keepalived), ClassCord, GLPI, Supervision Prometheus/Grafana
- Certifications : Cisco Intro Networks, ANSSI SecNumacademie, Fortinet NSE 1 & 2

Regles :
- Toujours repondre en francais sauf pour les exercices d'anglais
- Etre precis, structure, pedagogique
- Ne pas inventer des informations non verifiables
- Pour les questions de jury : etre strict et exigeant`;

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, context, history } = req.body;
    if (!message || typeof message !== 'string' || message.length > 2000) {
      return res.status(400).json({ error: 'Message invalide ou trop long (max 2000 chars).' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construction de l'historique de conversation
    const chatHistory = [];
    if (history && Array.isArray(history)) {
      history.slice(-8).forEach(h => {
        const text = h.parts?.[0]?.text || h.content || '';
        if (text) chatHistory.push({ role: h.role, parts: [{ text }] });
      });
    }

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { maxOutputTokens: 1500, temperature: 0.7 }
    });

    const contextPrefix = context ? `[Contexte : ${context}]\n\n` : '';
    const fullMessage = `${SYSTEM_PROMPT}\n\n${contextPrefix}${message}`;

    const result = await chat.sendMessage(fullMessage);
    const text = result.response.text();

    res.json({ response: text, role: 'assistant' });
  } catch (err) {
    console.error('[AI /chat]', err.message);
    res.status(500).json({ error: 'Erreur IA. Reessayez dans quelques secondes.' });
  }
});

// POST /api/ai/correct — correction d'une reponse libre
router.post('/correct', async (req, res) => {
  try {
    const { question, userAnswer, expectedAnswer, subject } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'question et userAnswer sont requis.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `${SYSTEM_PROMPT}

Matiere : ${subject || 'BTS SIO SISR'}
Question posee : ${question}
Reponse de l'etudiant : ${userAnswer}
${expectedAnswer ? `Reponse de reference : ${expectedAnswer}` : ''}

Corrige la reponse de l'etudiant en :
1. Indiquant si elle est correcte, partiellement correcte ou incorrecte
2. Expliquant les erreurs de facon pedagogique
3. Donnant la reponse complete attendue
4. Proposant un exercice complementaire si necessaire
Reponds en francais, de facon structuree.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ correction: text });
  } catch (err) {
    console.error('[AI /correct]', err.message);
    res.status(500).json({ error: 'Erreur lors de la correction.' });
  }
});

// POST /api/ai/jury — simulation question de jury E5
router.post('/jury', async (req, res) => {
  try {
    const { topic, userResponse, mode, message, history } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Mode chat direct (envoyé depuis sendChat)
    if (message) {
      const chatHistory = [];
      if (history && Array.isArray(history)) {
        history.slice(-8).forEach(h => {
          const text = h.parts?.[0]?.text || h.content || '';
          if (text) chatHistory.push({ role: h.role, parts: [{ text }] });
        });
      }
      const juryPrompt = `${SYSTEM_PROMPT}

Tu joues maintenant le role de Jean Naymar, jury BTS SIO SISR strict et exigeant.
Tu evalues le candidat Nedj Belloum lors de l'epreuve E5 (oral de 30 minutes).
Sois precis, technique, remets en question les reponses insuffisantes.
Ne sois pas complaisant. Pose des questions de relance si la reponse est incomplète.

Message du candidat : ${message}`;

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: { maxOutputTokens: 1200, temperature: 0.7 }
      });
      const result = await chat.sendMessage(juryPrompt);
      return res.json({ reply: result.response.text(), response: result.response.text() });
    }

    let prompt;
    if (mode === 'question') {
      prompt = `${SYSTEM_PROMPT}

Tu joues le role d'un jury BTS SIO SISR strict et exigeant.
Pose une question de jury sur le sujet suivant : ${topic || 'les projets du candidat'}
La question doit etre precise, technique, et tester la comprehension reelle.
Ne pose qu'une seule question. Sois direct.`;
    } else {
      prompt = `${SYSTEM_PROMPT}

Tu joues le role d'un jury BTS SIO SISR strict et exigeant (Jean Naymar).
Sujet de la question : ${topic}
Reponse du candidat : ${userResponse}

Evalue cette reponse comme un vrai jury :
1. Points positifs (soyez objectif)
2. Points negatifs ou manquants (soyez strict)
3. Ce qu'un jury attendrait vraiment
4. Note approximative sur la qualite (/5)
Ne soyez pas complaisant.`;
    }

    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (err) {
    console.error('[AI /jury]', err.message);
    res.status(500).json({ error: 'Erreur simulation jury.' });
  }
});

// POST /api/ai/english — exercice anglais adaptatif
router.post('/english', async (req, res) => {
  try {
    const { type, userText, level } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt;
    if (type === 'exercise') {
      prompt = `You are an English teacher helping a French student (current level: A2, target: B2) 
preparing for BTS SIO SISR. Create one practical English exercise about IT/networking topics.
Exercise type: vocabulary or comprehension. Make it relevant to: networks, cybersecurity, systems administration.
Provide: the exercise in English, then the French instructions.`;
    } else if (type === 'correct') {
      prompt = `You are an English teacher. Correct this student's English text and explain errors in French.
Student text: "${userText}"
Context: IT/BTS SIO SISR student (level A2, target B2).
Give: corrected version, list of errors with explanations in French, one grammar tip.`;
    } else if (type === 'oral') {
      prompt = `You are simulating a BTS SIO SISR English oral examiner.
Ask one IT-related question in English that a student at A2/B1 level could answer.
Keep it simple but professional. Topic: networking, cybersecurity, or daily IT support work.`;
    } else {
      prompt = `Create a short English vocabulary quiz (5 questions) about networking and cybersecurity 
for a French student at A2 level. Format: term in French, 3 choices in English. Include answers.`;
    }

    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (err) {
    console.error('[AI /english]', err.message);
    res.status(500).json({ error: 'Erreur exercice anglais.' });
  }
});

module.exports = router;
