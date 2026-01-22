import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ChatbotPage = () => {
  const { userProfile, logout } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello ${userProfile?.firstName || 'there'}! I'm here to support you on your mental wellness journey. How are you feeling today? 🌿`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userProfile?.firstName) {
      setMessages(prev => [
        {
          id: 1,
          text: `Hello ${userProfile.firstName}! I'm here to support you on your mental wellness journey. How are you feeling today? 🌿`,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [userProfile]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (actionText) => {
    if (!actionText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: actionText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(actionText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to support your mental health journey. How are you feeling today? 🌿";
    }
    
    // Anxiety responses
    if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('panic') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      return "I understand you're feeling anxious. Here are some helpful techniques:\n\n🧘 **Immediate Relief:**\n• 4-7-8 breathing: Inhale 4, hold 7, exhale 8\n• Grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Progressive muscle relaxation\n\n🌱 **Daily Practices:**\n• Regular exercise (even a 10-minute walk)\n• Limit caffeine and alcohol\n• Practice mindfulness meditation\n• Maintain a consistent sleep schedule\n\n💊 **Natural Remedies:**\n• Chamomile tea or supplements\n• Lavender essential oil\n• Magnesium supplements (consult doctor first)\n• Omega-3 fatty acids\n\n⚠️ **When to Seek Help:** If anxiety significantly impacts daily life, consider talking to a mental health professional.";
    }
    
    // Depression responses
    if (lowerMessage.includes('depression') || lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('hopeless')) {
      return "I'm sorry you're feeling this way. Remember that it's okay to not be okay. Here's what might help:\n\n☀️ **Daily Support:**\n• Try to maintain a routine, even small tasks\n• Get 10-15 minutes of sunlight daily\n• Connect with someone you trust\n• Engage in activities that used to bring joy\n\n🧠 **Mental Health Support:**\n• Practice gratitude journaling\n• Challenge negative thoughts with evidence\n• Set small, achievable goals\n• Consider therapy or counseling\n\n💊 **Natural Support:**\n• Vitamin D supplements (if deficient)\n• Omega-3 fatty acids\n• Regular exercise releases endorphins\n• St. John's Wort (consult doctor first)\n\n🆘 **Crisis Resources:**\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n\nRemember: You are not alone, and seeking help is a sign of strength.";
    }
    
    // Stress responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Stress can feel overwhelming, but there are effective ways to manage it:\n\n🧘 **Immediate Relief:**\n• Box breathing: Inhale 4, hold 4, exhale 4, hold 4\n• Take a 5-minute break to stretch or walk\n• Practice the STOP technique: Stop, Take a breath, Observe, Proceed\n\n📋 **Organization Tips:**\n• Break large tasks into smaller steps\n• Use a planner or to-do list\n• Prioritize tasks by urgency and importance\n• Learn to say 'no' when needed\n\n🌿 **Stress Management:**\n• Regular exercise (yoga, walking, dancing)\n• Mindfulness meditation or deep breathing\n• Adequate sleep (7-9 hours)\n• Healthy nutrition and hydration\n\n💊 **Natural Stress Relief:**\n• Ashwagandha supplements\n• Green tea (contains L-theanine)\n• Magnesium supplements\n• Chamomile or passionflower tea\n\nRemember: Chronic stress can impact health, so consider professional support if needed.";
    }
    
    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "Sleep is crucial for mental health. Here are some strategies to improve your sleep:\n\n😴 **Sleep Hygiene:**\n• Maintain consistent sleep and wake times\n• Keep bedroom cool, dark, and quiet\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n\n🌙 **Natural Sleep Aids:**\n• Melatonin supplements (start with 0.5-1mg)\n• Magnesium glycinate before bed\n• Valerian root tea or supplements\n• Lavender essential oil or pillow spray\n\n🧠 **Mental Preparation:**\n• Write down worries in a journal\n• Practice relaxation techniques\n• Avoid caffeine after 2 PM\n• Limit alcohol consumption\n\n💊 **When to Consider:**\n• Prescription sleep aids (consult doctor)\n• Cognitive Behavioral Therapy for Insomnia (CBT-I)\n• Sleep study if sleep apnea is suspected\n\nRemember: Consistent good sleep improves mood, focus, and overall well-being.";
    }
    
    // Anger/Irritability
    if (lowerMessage.includes('anger') || lowerMessage.includes('angry') || lowerMessage.includes('irritated') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
      return "Feeling angry or irritable is a normal emotion. Here's how to manage it constructively:\n\n🧘 **Immediate Techniques:**\n• Take deep breaths and count to 10\n• Remove yourself from the situation temporarily\n• Use 'I' statements to express feelings\n• Practice the STOP technique\n\n🌱 **Long-term Management:**\n• Regular exercise to release tension\n• Practice mindfulness and meditation\n• Identify triggers and warning signs\n• Develop healthy communication skills\n\n💊 **Natural Support:**\n• Passionflower supplements\n• Regular exercise releases endorphins\n• Adequate sleep and nutrition\n• Avoid excessive caffeine and alcohol\n\n🆘 **When to Seek Help:**\nIf anger leads to aggression or affects relationships, consider anger management therapy or counseling.";
    }
    
    // Loneliness/Social support
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated') || lowerMessage.includes('loneliness')) {
      return "Feeling lonely can be really tough. Here are ways to build connection:\n\n🤝 **Building Connections:**\n• Reach out to family or friends, even with a simple text\n• Join clubs, groups, or classes that interest you\n• Volunteer for causes you care about\n• Consider online communities with shared interests\n\n💬 **Social Skills:**\n• Practice active listening\n• Share your own experiences and feelings\n• Be patient with yourself and others\n• Start with small social interactions\n\n🌱 **Self-Care:**\n• Practice self-compassion\n• Engage in activities you enjoy\n• Consider getting a pet if appropriate\n• Maintain a routine that includes social time\n\n🆘 **Professional Support:**\n• Group therapy can provide connection\n• Individual therapy to address underlying issues\n• Support groups for specific challenges\n\nRemember: It's okay to feel lonely, and reaching out for connection is a brave step.";
    }
    
    // Crisis/Urgent help
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end it all') || lowerMessage.includes('not worth living') || lowerMessage.includes('hurt myself')) {
      return "🚨 **CRISIS SUPPORT - You are not alone:**\n\n**Immediate Help:**\n• National Suicide Prevention Lifeline: 988 (24/7)\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n• Go to your nearest emergency room\n\n**You Matter:**\n• Your life has value and meaning\n• These feelings are temporary, even when they don't feel that way\n• There are people who care about you\n• Professional help can make a significant difference\n\n**Right Now:**\n• Stay with someone you trust\n• Remove any means of self-harm\n• Remember: This pain is temporary\n• You are stronger than you know\n\nPlease reach out for immediate professional help. You don't have to go through this alone.";
    }
    
    // Happy/Positive responses
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('wonderful') || lowerMessage.includes('amazing')) {
      return "That's wonderful! I'm so glad you're feeling positive today. Celebrating good moments is important for mental health:\n\n✨ **Building on Positivity:**\n• Practice gratitude for these moments\n• Share your joy with someone you care about\n• Take note of what contributed to your good mood\n• Consider journaling about positive experiences\n\n🌱 **Maintaining Well-being:**\n• Continue healthy routines that support your mood\n• Use this energy to tackle tasks or goals\n• Remember these feelings during difficult times\n• Celebrate small wins regularly\n\n💚 **Spreading Joy:**\n• Your positive energy can help others too\n• Consider doing something kind for someone else\n• Share your good mood with the world\n\nKeep up the great work! These positive moments are precious.";
    }
    
    // General help and support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('resources')) {
      return "I'm here to support you! Here are comprehensive mental health resources:\n\n🆘 **Crisis Resources:**\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency: 911\n\n🏥 **Professional Help:**\n• Find therapists: PsychologyToday.com\n• Low-cost therapy: Open Path Collective\n• Online therapy: BetterHelp, Talkspace\n• Your insurance provider's mental health coverage\n\n📚 **Self-Help Resources:**\n• Mindfulness apps: Headspace, Calm\n• Mood tracking: Daylio, Moodpath\n• Books: 'The Anxiety and Phobia Workbook'\n• Podcasts: 'The Mental Health Podcast'\n\n🌱 **Daily Practices:**\n• Regular exercise and outdoor time\n• Healthy sleep and nutrition\n• Mindfulness and meditation\n• Connecting with supportive people\n\nRemember: Seeking help is a sign of strength, not weakness.";
    }
    
    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! I'm glad I could help. Remember, taking care of your mental health is one of the most important things you can do. Feel free to reach out anytime you need support. You're doing great! 🌟";
    }
    
    // Default response with helpful suggestions
    return "I'm here to listen and support you. I can help with various mental health concerns including:\n\n• **Anxiety & Panic** - Breathing techniques and coping strategies\n• **Depression & Mood** - Support and natural remedies\n• **Stress Management** - Organization and relaxation tips\n• **Sleep Issues** - Sleep hygiene and natural sleep aids\n• **Anger & Irritability** - Healthy expression techniques\n• **Loneliness** - Building connections and social skills\n• **Crisis Support** - Emergency resources and immediate help\n\nWhat would you like to talk about? I'm here to provide guidance, resources, and support. 💚";
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen nature-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-24 bg-white/20 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-20 left-20 w-28 h-20 bg-white/15 rounded-full blur-md animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <span className="mr-2">←</span>
            Back to Home
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center">
                <span className="text-lg">🌿</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {userProfile?.firstName} {userProfile?.lastName}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-white/80 hover:bg-white rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-6">
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-healing-400 to-nature-400 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Your AI Companion</h2>
                <p className="text-white/80 text-sm">Always here to listen and support you</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-healing-400 to-nature-400 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="healing-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('I feel sad and down')}
            className="glass-card p-4 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mb-2 block">😔</span>
            <span className="text-sm text-gray-700">Feeling Down</span>
          </button>
          <button 
            onClick={() => handleQuickAction('I feel anxious and worried')}
            className="glass-card p-4 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mb-2 block">😰</span>
            <span className="text-sm text-gray-700">Anxious</span>
          </button>
          <button 
            onClick={() => handleQuickAction('I have trouble sleeping')}
            className="glass-card p-4 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mb-2 block">😴</span>
            <span className="text-sm text-gray-700">Sleep Issues</span>
          </button>
          <button 
            onClick={() => handleQuickAction('I need stress management help')}
            className="glass-card p-4 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mb-2 block">🧘‍♀️</span>
            <span className="text-sm text-gray-700">Stress Relief</span>
          </button>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            "Breathe. You're not alone." 🌸
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full flex items-center justify-center floating-element">
        <span className="text-2xl">💭</span>
      </div>
    </div>
  );
};

export default ChatbotPage;
