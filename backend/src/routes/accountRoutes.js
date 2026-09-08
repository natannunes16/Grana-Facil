const express = require('express');
const router = express.Router();
const { getAccounts, createAccount, deleteAccount } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAccounts)
  .post(protect, createAccount);

router.route('/:id')
  .delete(protect, deleteAccount);

module.exports = router;
