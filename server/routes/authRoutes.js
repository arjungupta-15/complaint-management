const express = require('express');
const router = express.Router();
const {
  signupStudent,
  loginStudent,
  loginAdmin,
  verifyStudentOTP,

  signupAdmin, // Import new signupAdmin function


  signupAdmin, // Import new signupAdmin function

  signupAdmin
} = require('../controllers/authController');

router.post('/student/signup', signupStudent);
router.post('/student/login', loginStudent);
router.post('/student/verify-otp', verifyStudentOTP);
router.post('/admin/login', loginAdmin);

router.post('/admin/signup', signupAdmin); // New route for admin signup


router.post('/admin/signup', signupAdmin); // New route for admin signup

router.post('/admin/signup', signupAdmin);

module.exports = router;
