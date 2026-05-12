

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ── Multer Config - Photo Upload ───────────────────────────────
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    // Unique name: user_ + timestamp + .jpg/.png
    const ext = path.extname(file.originalname);
    cb(null, 'user_' + Date.now() + ext);
  }
});


const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB max
});

// ── In-memory users (demo mate) ────────────────────────────────
// Real project ma MongoDB ya MySQL use karjo
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    role: 'Admin',
    city: 'Surat',
    photo: null
  }
];
let nextId = 2;

// ── GET /users/add-user ───────────────────────────────────────
router.get('/add-user', (req, res) => {
  res.render('add-user', {
    title: 'Add User',
    page: 'add-user',
    error: null
  });
});

// ── POST /users/add-user ──────────────────────────────────────
router.post('/add-user', upload.single('photo'), (req, res) => {
  const { name, email, phone, role, city } = req.body;


  const photo = req.file ? '/uploads/' + req.file.filename : null;

  const newUser = {
    id: nextId++,
    name: name,
    email: email,
    phone: phone || '',
    role: role || 'User',
    city: city || 'Unknown',
    photo: photo
  };

  users.push(newUser);


  res.redirect('/users/view-user?success=User+successfully+add+thayo!');
});

// ── GET /users/view-user ──────────────────────────────────────
router.get('/view-user', (req, res) => {
  res.render('view-user', {
    title: 'View Users',
    page: 'view-user',
    users: users,
    success: req.query.success || null
  });
});

// ── GET /users/delete/:id ─────────────────────────────────────
router.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex(u => u.id === id);

  if (idx !== -1) {

    if (users[idx].photo) {
      const filePath = path.join(__dirname, '../public', users[idx].photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    users.splice(idx, 1);
  }

  res.redirect('/users/view-user');
});

module.exports = { router, users };
