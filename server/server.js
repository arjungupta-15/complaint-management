const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require('./routes/contactRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const Admin = require('./models/Admin');
const Student = require('./models/Student');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
   const seedData = async () => {
     // Create a default admin account
    const  adminExists = await Admin.findOne({ email: 'admin@college.com' });
    if (!adminExists) {
      await Admin.create({
        email: 'admin@college.com',
        password: 'admin123'
      });
      console.log('✅ Default admin account created: admin@college.com / admin123');
    } else {
      console.log('ℹ️ Admin account already exists');
    }

     // Create a default student account
    const studentExists = await Student.findOne({ email: 'student@college.com' });
    if (!studentExists) {
      await Student.create({
        name: 'Test Student',
        email: 'student@college.com',
        password: 'student123'
      });
      console.log('✅ Default student account created: student@college.com / student123');
    } else {
      console.log('ℹ️ Student account already exists');
    }
  }
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', contactRoutes)
app.use('/api', complaintRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
