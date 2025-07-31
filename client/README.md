# 🛠️ MaintaBIT Complaint Management System

A modern and interactive complaint management system built with React, Material UI, and animated cursor effects. Designed specifically for college students and administrators to submit, track, and manage complaints efficiently.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication**: OTP-based login system with role-based access (Student/Admin)
- **Complaint Submission**: Comprehensive form with file uploads and auto-priority assignment
- **Complaint Tracking**: Real-time status tracking with timeline visualization
- **Dashboard**: Role-specific dashboards with filtering and search capabilities
- **Feedback System**: Star rating and feedback collection for resolved complaints
- **Admin Management**: Status updates, escalation, and complaint management

### 🎨 UI/UX Features
- **Material UI Components**: Professional and consistent design
- **Custom Cursor Animations**: Interactive cursor effects using react-custom-cursor
- **Responsive Design**: Mobile-friendly layout with adaptive components
- **Smooth Animations**: Fade-in effects and hover animations
- **Professional Styling**: Modern gradient backgrounds and card-based layouts

### 🔒 Security Features
- **OTP Verification**: 5-minute expiry for secure authentication
- **Role-based Access**: Different permissions for students and admins
- **Data Encryption**: Mock encryption for sensitive data
- **Session Management**: Persistent login state with localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd complaint-management/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Pages & Features

### 1. **Home Page** (`/`)
- Welcome message with animated text effect
- Feature overview with interactive cards
- System statistics display
- Quick action buttons for authenticated users

### 2. **Login Page** (`/login`)
- Role selection (Student/Admin)
- Email-based OTP authentication
- 5-minute OTP expiry timer
- Secure session management

### 3. **Submit Complaint** (`/submit-complaint`)
- Comprehensive complaint form
- Department and category selection
- Auto-priority assignment based on category
- File upload support (PDF, DOC, images)
- Real-time priority indicator

### 4. **Track Complaint** (`/track-complaint`)
- Search by tracking ID
- Detailed complaint information
- Status timeline visualization
- Escalate/Reopen functionality
- Action buttons for status management

### 5. **Dashboard** (`/dashboard`)
- Role-specific complaint views
- Advanced filtering and search
- Status management (Admin only)
- Statistics overview
- Bulk operations support

### 6. **Feedback** (`/feedback`)
- Star rating system (1-5 stars)
- Text feedback submission
- Resolved complaint selection
- Rating labels and descriptions

### 7. **FAQs** (`/faqs`)
- Categorized frequently asked questions
- Expandable accordion interface
- Quick navigation to other pages
- Comprehensive help information

### 8. **Contact** (`/contact`)
- Contact form with validation
- Support information display
- Business hours and contact details
- Multiple contact methods

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **UI Library**: Material UI (MUI v5)
- **Routing**: React Router DOM
- **Cursor Animations**: react-custom-cursor
- **Build Tool**: Vite
- **Package Manager**: npm

## 📊 Data Management

### Local Storage Structure
- `user`: Current user information
- `role`: User role (student/admin)
- `complaints`: Array of complaint objects
- `feedback`: Array of feedback submissions
- `contactMessages`: Array of contact form submissions
- `tempOtp`: Temporary OTP for verification

### Complaint Object Structure
```javascript
{
  id: "COMP123456789",
  email: "student@college.edu",
  department: "Computer Science",
  category: "maintenance",
  description: "Detailed complaint description",
  priority: "medium", // auto-assigned
  status: "pending", // pending, resolved, escalated
  createdAt: "2024-01-01T00:00:00.000Z",
  userId: "user123",
  file: null // optional file attachment
}
```

## 🎨 Customization

### Theme Configuration
The application uses Material UI's theming system. You can customize colors, typography, and component styles in `src/App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    // ... more customization
  }
});
```

### Cursor Animations
Customize cursor effects in `src/App.jsx`:

```javascript
<CustomCursor
  targets={['.cursor-target']}
  targetOpacity={0.5}
  smoothness={{ movement: 0.2, opacity: 0.1 }}
  targetScale={1.5}
  // ... more options
/>
```

## 🔧 Development

### Project Structure
```
src/
├── components/
│   └── Header.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SubmitComplaint.jsx
│   ├── TrackComplaint.jsx
│   ├── Dashboard.jsx
│   ├── Feedback.jsx
│   ├── FAQs.jsx
│   └── Contact.jsx
├── App.jsx
└── main.jsx
```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository to Vercel or Netlify
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@maintabit.edu.in
- Phone: +91 98765 43210
- Office: Main Campus, Block A

## 🙏 Acknowledgments

- Material UI for the excellent component library
- React team for the amazing framework
- Vite for the fast build tool
- All contributors and testers

---

**Built with ❤️ for MaintaBIT College**
