import express from 'express';
import createUser from '../controllers/userController';

const router = express.Router();

// Users Routes
router.post('/auth/signup', createUser);

module.exports = router;