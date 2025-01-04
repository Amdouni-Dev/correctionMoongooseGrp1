// ./routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Créer un utilisateur
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Recherche avancée
router.get('/search', async (req, res) => {
    const { firstName, minAge, maxAge } = req.query;
  
    let filter = {};
    if (firstName) filter.firstName = { $regex: firstName, $options: 'i' };
    if (minAge || maxAge) filter.age = { ...(minAge && { $gte: minAge }), ...(maxAge && { $lte: maxAge }) };
  
    try {
      const users = await User.find(filter);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
