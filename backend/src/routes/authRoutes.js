const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Auth Routes
 *
 * POST /api/auth/register  — Register a new doctor account
 * POST /api/auth/login     — Login with email & password
 * GET  /api/auth/me        — Get current user (protected)
 *
 * TODO: Uncomment and mount in app.js when backend integration begins.
 */

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
