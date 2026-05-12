
const express = require('express');
const router = express.Router();

const defaultUser = { name: 'John Doe', email: 'admin@materio.com' };

// ── GET /account ──────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('account-settings', {
    title: 'Account Settings',
    page: 'account',
    user: defaultUser,
    success: null
  });
});

// ── POST /account ─────────────────────────────────────────────
router.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;
  res.render('account-settings', {
    title: 'Account Settings',
    page: 'account',
    user: { name: `${firstName} ${lastName}`, email: email },
    success: 'Profile successfully save thayun! ✓'
  });
});

module.exports = router;
