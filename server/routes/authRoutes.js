const express = require('express');
const router = express.Router();
const {
  signupStudent,
  loginStudent,
  loginAdmin,
  verifyStudentOTP,
<<<<<<< HEAD
  signupAdmin, // Import new signupAdmin function
=======
  signupAdmin
>>>>>>> 0d908ec6bccfb7c73b319a94466c77a6c5c82006
} = require('../controllers/authController');

router.post('/student/signup', signupStudent);
router.post('/student/login', loginStudent);
router.post('/student/verify-otp', verifyStudentOTP);
router.post('/admin/login', loginAdmin);
<<<<<<< HEAD
router.post('/admin/signup', signupAdmin); // New route for admin signup
=======
router.post('/admin/signup', signupAdmin);
>>>>>>> 0d908ec6bccfb7c73b319a94466c77a6c5c82006

module.exports = router;
