# Mental Health Chatbot 🌿

A beautiful, calming mental health chatbot built with React, Tailwind CSS, and Firebase, designed to provide emotional support and mental wellness guidance.

## Features ✨

- **Nature-Healing Theme**: Calming design with soft gradients and floating elements
- **Responsive Design**: Works perfectly on all devices
- **Firebase Authentication**: Secure user registration and login
- **Email Verification**: Account verification through email
- **Password Reset**: Forgot password functionality with email reset
- **Google Sign-in**: Social authentication option
- **User Database**: Firestore integration for user profiles
- **Interactive Chatbot**: AI-powered mental health support
- **Glassmorphism UI**: Modern, elegant interface design
- **Smooth Animations**: Gentle floating and hover effects

## Pages 🗂️

1. **Home Page** (`/`) - Welcoming landing page with features overview
2. **Login Page** (`/login`) - User authentication with email verification
3. **Signup Page** (`/signup`) - User registration with email verification
4. **Forgot Password** (`/forgot-password`) - Password reset functionality
5. **Chatbot Page** (`/chatbot`) - Interactive mental health support interface (Protected Route)

## Tech Stack 🛠️

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Build Tool**: Create React App
- **Fonts**: Inter (Google Fonts)

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental-health-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Update `src/firebase.js` with your Firebase config

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup 🔥

### Authentication Methods
- **Email/Password**: Traditional signup with email verification
- **Google Sign-in**: Social authentication option
- **Password Reset**: Email-based password recovery

### Database Structure
```
users/
  {userId}/
    firstName: string
    lastName: string
    email: string
    emailVerified: boolean
    createdAt: timestamp
    lastLogin: timestamp
    googleSignIn: boolean (optional)
```

## Project Structure 📁

```
src/
├── components/
│   ├── HomePage.js           # Landing page
│   ├── LoginPage.js          # User login with email verification
│   ├── SignupPage.js         # User registration with email verification
│   ├── ForgotPasswordPage.js # Password reset functionality
│   └── ChatbotPage.js        # Chat interface (protected)
├── contexts/
│   └── AuthContext.js        # Authentication state management
├── firebase.js               # Firebase configuration
├── App.js                    # Main app with routing and auth
├── index.js                  # React entry point
└── index.css                 # Global styles and Tailwind
```

## Design Theme 🎨

### Nature-Healing Colors
- **Healing Green**: `#22c55e` - Growth and renewal
- **Nature Blue**: `#0ea5e9` - Calm and tranquility
- **Peach**: `#f27022` - Warmth and comfort
- **Lavender**: `#a855f7` - Peace and serenity

### Design Elements
- Soft gradient backgrounds
- Glassmorphism cards with backdrop blur
- Floating animated elements
- Rounded corners and gentle shadows
- Calming emojis and nature symbols

## Authentication Flow 🔐

### Signup Process
1. User fills out registration form
2. Account created in Firebase Auth
3. Verification email sent automatically
4. User verifies email
5. Account activated and ready for login

### Login Process
1. User enters credentials
2. Email verification status checked
3. If verified, user redirected to chatbot
4. If not verified, error message displayed

### Password Reset
1. User clicks "Forgot password?"
2. Enters email address
3. Reset link sent to email
4. User clicks link and sets new password

## Features in Detail 🔍

### Home Page
- Hero section with compelling messaging
- Feature highlights (24/7 Support, Privacy, Growth)
- Dynamic content based on authentication status
- Call-to-action buttons for login/signup

### Authentication Pages
- Clean, accessible forms with validation
- Social login options (Google)
- Email verification system
- Password reset functionality
- Responsive design with smooth transitions

### Chatbot Interface
- Real-time chat simulation
- Contextual responses based on user input
- Quick action buttons for common topics
- Typing indicators and timestamps
- User profile display and logout

## Security Features 🔒

- **Protected Routes**: Chatbot only accessible to authenticated users
- **Email Verification**: Prevents unauthorized access
- **Secure Authentication**: Firebase Auth handles all security
- **Data Validation**: Form validation and error handling
- **Session Management**: Automatic login state management

## Customization 🎯

### Colors
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  'healing': { /* your custom healing colors */ },
  'nature': { /* your custom nature colors */ },
  // ... more colors
}
```

### Animations
Customize animations in `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  // ... more animations
}
```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements 🚀

- [ ] Real AI integration
- [ ] User profiles and progress tracking
- [ ] Mood tracking and analytics
- [ ] Meditation and breathing exercises
- [ ] Crisis intervention resources
- [ ] Professional therapist connections
- [ ] Push notifications
- [ ] Offline support

## License 📄

This project is licensed under the MIT License.

## Support 💙

If you're experiencing a mental health crisis, please reach out to professional help:

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

---

**Remember**: "Breathe. You're not alone." 🌸

This chatbot is designed to provide support and guidance, but it's not a replacement for professional mental health care.
