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
- **Interactive Chatbot**: Rule-based mental health support (Frontend-only, ready for AI/NLP integration)
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

## Quick Start 🚀

### For New Users (First Time Setup)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hari0880/MindMate.git
   cd MindMate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages (React, Firebase, Tailwind CSS, etc.)

3. **Configure Firebase** (see detailed instructions below)

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - Or manually navigate to `http://localhost:3000`

### Running on Another Machine

If you're setting up on a different machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hari0880/MindMate.git
   cd MindMate
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```
   ⚠️ **Important**: Always run `npm install` after cloning to install all required packages.

3. **Configure Firebase** (use your Firebase credentials in `src/firebase.js`)

4. **Start the server:**
   ```bash
   npm start
   ```

## Getting Started 🚀

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Firebase account** - [Create one here](https://firebase.google.com/)
- **Git** (for cloning) - [Download here](https://git-scm.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Hari0880/MindMate.git
cd MindMate
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication**:
     - Go to Authentication > Sign-in method
     - Enable **Email/Password** provider
     - Enable **Google** provider (optional but recommended)
   - Enable **Firestore Database**:
     - Go to Firestore Database
     - Click "Create database"
     - Start in **test mode** (for development)
   - Get your Firebase config:
     - Go to Project Settings > General
     - Scroll down to "Your apps" section
     - Click the web icon (`</>`) to add a web app
     - Copy the Firebase configuration object
   - Update `src/firebase.js` with your Firebase config:
     ```javascript
     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id",
       measurementId: "your-measurement-id"
     };
     ```

   **Note**: The project comes with a pre-configured Firebase setup. For production, replace with your own Firebase credentials.

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
- Real-time chat interface
- **Current**: Rule-based responses using keyword matching
- Contextual responses for common mental health topics (anxiety, depression, stress, sleep, etc.)
- Quick action buttons for common topics
- Typing indicators and timestamps
- User profile display and logout
- **Future Ready**: Architecture supports easy integration with AI/NLP services

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

## Current Implementation Status 📊

### ✅ What's Working Now (Frontend-Only)
- **Complete authentication system** (Firebase Auth)
- **User registration and login** with email verification
- **Rule-based chatbot** with keyword matching for mental health topics
- **Responsive UI** with beautiful design
- **Protected routes** for authenticated users
- **User profile management** in Firestore
- **No backend required** - everything works client-side

### 🤖 Current Chatbot Implementation
The chatbot currently uses **rule-based pattern matching** (keyword detection) to provide responses. This is:
- ✅ **Sufficient for MVP** - Provides helpful mental health guidance
- ✅ **No backend needed** - Works entirely in the browser
- ✅ **Fast and reliable** - Instant responses
- ✅ **Privacy-friendly** - No data sent to external services
- ⚠️ **Limited intelligence** - Cannot understand context or sentiment yet

**This is perfect for now!** You can add AI/NLP later when you're ready to build a backend.

### 🔄 What's Needed for AI/NLP/Sentiment Analysis (Backend Required)

To add intelligent chatbot features, you'll need:

1. **Backend Service** (Node.js/Python):
   - API endpoints for chat processing
   - NLP model integration (OpenAI GPT, Google Dialogflow, etc.)
   - Sentiment analysis (using libraries like VADER, TextBlob, or cloud APIs)
   - Conversation context management

2. **AI Integration Options**:
   - **OpenAI API**: GPT-3.5/GPT-4 for conversational AI
   - **Google Dialogflow**: Pre-built mental health intents
   - **AWS Lex**: Amazon's conversational AI
   - **Hugging Face Models**: Free open-source NLP models
   - **Custom NLP**: Train your own model with mental health data

3. **Sentiment Analysis**:
   - Real-time emotion detection from user messages
   - Mood tracking over time
   - Crisis detection and alerts

4. **Database Enhancements**:
   - Store conversation history
   - Track user mood patterns
   - Analytics and insights

## Future Enhancements 🚀

### Phase 1: AI Integration (Backend Required)
- [ ] Backend API server (Node.js/Express or Python/Flask)
- [ ] OpenAI GPT integration for intelligent responses
- [ ] Sentiment analysis using NLP libraries
- [ ] Conversation context and memory
- [ ] Personalized responses based on user history

### Phase 2: Advanced Features
- [ ] User profiles and progress tracking
- [ ] Mood tracking and analytics dashboard
- [ ] Meditation and breathing exercises (guided)
- [ ] Crisis detection and automatic alerts
- [ ] Professional therapist connections
- [ ] Chat history and insights

### Phase 3: Additional Features
- [ ] Push notifications
- [ ] Offline support
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Mobile app version

## Adding AI/NLP Later 🔮

When you're ready to add intelligent features:

### Option 1: OpenAI Integration (Easiest)
```javascript
// Backend API endpoint example
app.post('/api/chat', async (req, res) => {
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.body.message }]
  });
  // Add sentiment analysis
  const sentiment = analyzeSentiment(req.body.message);
  res.json({ reply: response.data, sentiment });
});
```

### Option 2: Google Dialogflow
- Pre-built mental health intents
- Natural language understanding
- Easy integration with Firebase

### Option 3: Custom NLP Model
- Train on mental health datasets
- Deploy using TensorFlow.js or PyTorch
- Full control over responses

**Note**: The current frontend architecture is designed to easily integrate with any backend API. Simply replace the `getBotResponse()` function with an API call.

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
