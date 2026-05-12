
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;

// ── View Engine Setup ──────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware ─────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true })); // form data
app.use(express.json());                          // JSON data
app.use(express.static(path.join(__dirname, 'public'))); // CSS/JS/Images

// ── Routes ─────────────────────────────────────────────────────
const dashRoutes = require('./routes/dashboard');
const tableRoutes = require('./routes/tables');
const accountRoutes = require('./routes/account');
const { router: userRoutes } = require('./routes/users');


app.get('/', (req, res) => res.redirect('/dashboard'));

app.use('/dashboard', dashRoutes);
app.use('/tables', tableRoutes);
app.use('/account', accountRoutes);
app.use('/users', userRoutes);

// ── 404 Error Page ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('error', { title: 'Page Not Found' });
});

// ── Server Start ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(` Server chalu thayu! http://localhost:${PORT}`);
});
