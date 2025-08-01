const otpMap = new Map(); // In-memory

function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap.set(email, otp);
  setTimeout(() => otpMap.delete(email), 300000); // 5 minutes
  return otp;
}

function verifyOTP(email, otp) {
  return otpMap.get(email) === otp;
}

module.exports = { generateOTP, verifyOTP };
