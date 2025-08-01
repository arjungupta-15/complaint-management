const express = require('express');
const router = express.Router();
const {
  signupStudent,
  loginStudent,
  loginAdmin,
  verifyStudentOTP,
} = require('../controllers/authController');

router.post('/student/signup', signupStudent);
router.post('/student/login', loginStudent);
router.post('/student/verify-otp', verifyStudentOTP);
router.post('/admin/login', loginAdmin);

module.exports = router;
