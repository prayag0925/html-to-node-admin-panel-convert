

const express = require('express');
const router = express.Router();

// ── GET /dashboard ────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'Analytics Dashboard',
    page: 'dashboard'
  });
});

module.exports = router;
