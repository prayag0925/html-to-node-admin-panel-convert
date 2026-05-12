

const express = require('express');
const router = express.Router();

// Demo data 
const rows = [
  { project: 'Tours Project', client: 'Albert Cook', icon: 'ri-suitcase-2-line', iconColor: 'text-danger', status: 'Active', statusColor: 'primary' },
  { project: 'Sports Project', client: 'Barry Hunter', icon: 'ri-basketball-fill', iconColor: 'text-info', status: 'Inactive', statusColor: 'secondary' },
  { project: 'React Project', client: 'Diana Prince', icon: 'ri-reactjs-line', iconColor: 'text-primary', status: 'Active', statusColor: 'primary' },
  { project: 'Design Project', client: 'Emma Wilson', icon: 'ri-brush-2-line', iconColor: 'text-warning', status: 'Pending', statusColor: 'warning' },
  { project: 'Music Project', client: 'Frank Martin', icon: 'ri-music-2-line', iconColor: 'text-success', status: 'Active', statusColor: 'success' },
];

// ── GET /tables ───────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('tables', {
    title: 'Basic Tables',
    page: 'tables',
    rows: rows
  });
});

module.exports = router;
