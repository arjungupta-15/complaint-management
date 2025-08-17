const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require('./routes/contactRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
<<<<<<< HEAD
const dynamicOptionRoutes = require('./routes/dynamicOptionRoutes');
const DynamicOption = require('./models/DynamicOption');
=======
>>>>>>> 0d908ec6bccfb7c73b319a94466c77a6c5c82006
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

// Seed data function
const seedData = async () => {
  try {
    // Check if data already exists
    const existingOptions = await DynamicOption.countDocuments();
    if (existingOptions > 0) {
      console.log('✅ Database already has data, skipping seed...');
      return;
    }

    console.log('🌱 Seeding initial data...');

    // Add initial categories
    const categories = [
      { type: 'category', value: 'facility' },
      { type: 'category', value: 'request' },
      { type: 'category', value: 'hostel' },
    ];

    // Add initial departments
    const departments = [
      { type: 'department', value: 'Computer Science' },
      { type: 'department', value: 'Electrical Engineering' },
      { type: 'department', value: 'Mechanical Engineering' },
      { type: 'department', value: 'Civil Engineering' },
      { type: 'department', value: 'Information Technology' },
    ];

    // Add initial subcategories
    const subCategories = [
      // Facility subcategories
      { type: 'subCategory', value: 'washroom', parentCategory: 'facility' },
      { type: 'subCategory', value: 'Water-Cooler', parentCategory: 'facility' },
      { type: 'subCategory', value: 'Garbage', parentCategory: 'facility' },
      { type: 'subCategory', value: 'tap', parentCategory: 'facility' },
      { type: 'subCategory', value: 'Fan', parentCategory: 'facility' },
      { type: 'subCategory', value: 'Lights', parentCategory: 'facility' },
      
      // Request subcategories
      { type: 'subCategory', value: 'wheelchair', parentCategory: 'request' },
      { type: 'subCategory', value: 'mat', parentCategory: 'request' },
      { type: 'subCategory', value: 'Table-Cloth', parentCategory: 'request' },
      { type: 'subCategory', value: 'Sound-System', parentCategory: 'request' },
      { type: 'subCategory', value: 'Seminar-Hall', parentCategory: 'request' },
      
      // Hostel subcategories
      { type: 'subCategory', value: 'electricity', parentCategory: 'hostel' },
      { type: 'subCategory', value: 'cleaning', parentCategory: 'hostel' },
      { type: 'subCategory', value: 'water', parentCategory: 'hostel' },
    ];

    // Insert all data
    await DynamicOption.insertMany([...categories, ...departments, ...subCategories]);
    console.log('✅ Dynamic options seeded successfully!');

    // Create a default admin account
    const adminExists = await Admin.findOne({ email: 'admin@college.com' });
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

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Default Accounts:');
    console.log('👨‍💼 Admin: admin@college.com / admin123');
    console.log('👨‍🎓 Student: student@college.com / student123');
    console.log('\n🚀 You can now test the system!');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

app.use('/api/auth', authRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', contactRoutes)
app.use('/api', complaintRoutes)
app.use('/api/dynamic-options', dynamicOptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Seed data when server starts
  seedData();
});
