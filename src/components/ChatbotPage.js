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
  const [conversationContext, setConversationContext] = useState({
    topic: null,
    mood: null,
    previousTopics: []
  });
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
    const words = lowerMessage.split(/\s+/);
    const messageLength = words.length;
    
    // Update conversation context
    let newContext = { ...conversationContext };
    
    // Greetings - More varied and natural
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i)) {
      const greetings = [
        "Hello! It's great to hear from you. How are you doing today? 🌿",
        "Hi there! I'm here to listen and support you. What's on your mind?",
        "Hey! Welcome back. How can I help you feel better today?",
        "Hello! I'm glad you're here. How are you feeling right now?",
        "Hi! It's wonderful to connect with you. What would you like to talk about?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Anxiety responses - More conversational and varied
    if (lowerMessage.match(/\b(anxiety|anxious|panic|worried|worries|nervous|nervousness|overwhelmed|stressed|stressful)\b/)) {
      const anxietyResponses = [
        "I hear you're feeling anxious, and that's completely valid. Anxiety can be really challenging. Can you tell me more about what's making you feel this way? Sometimes talking about it can help. 🌿",
        
        "It sounds like you're experiencing some anxiety right now. That's okay - many people go through this. What specific situation or thought is triggering these feelings? Understanding the source can be the first step toward managing it.",
        
        "I understand that anxiety can feel overwhelming. You're not alone in this. Let me share some techniques that might help:\n\n🧘 **Quick Calming Techniques:**\n• Try the 4-7-8 breathing method: Breathe in for 4 counts, hold for 7, exhale for 8. Repeat 3-4 times.\n• Ground yourself: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.\n• Progressive muscle relaxation: Tense and release each muscle group.\n\nWhat's been helping you cope so far?",
        
        "Anxiety can be really tough to deal with. I'm here to listen. Sometimes just acknowledging the feeling can help. What would make you feel more supported right now?",
        
        "I sense you're dealing with anxiety. Remember, it's a normal human response, even though it doesn't feel good. Have you tried any breathing exercises or mindfulness techniques before? I can guide you through some if you'd like."
      ];
      newContext.topic = 'anxiety';
      setConversationContext(newContext);
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }
    
    // Depression responses - More conversational
    if (lowerMessage.match(/\b(depression|depressed|sad|down|hopeless|empty|numb|worthless)\b/)) {
      const depressionResponses = [
        "I'm really sorry you're going through this. Depression can make everything feel heavy and overwhelming. You're not alone in this, and it's okay to not be okay. Can you tell me what's been weighing on you lately?",
        
        "It sounds like you're experiencing some really difficult feelings right now. Depression is more than just sadness - it can affect everything. What's one small thing that used to bring you even a little bit of joy? Sometimes reconnecting with those things, even briefly, can help.",
        
        "I hear you, and I want you to know that these feelings, as intense as they are, don't define you. Depression lies to us sometimes. Have you been able to maintain any routines lately, even small ones like getting out of bed or having a meal?",
        
        "Thank you for sharing this with me. It takes courage to talk about depression. Remember, seeking help is a sign of strength, not weakness. Have you considered talking to a therapist or counselor? There are also crisis resources available 24/7 if you need immediate support.",
        
        "I can sense you're really struggling right now. Depression can make it hard to see hope, but it's there. What's one thing - even something tiny - that you're proud of yourself for doing recently?"
      ];
      newContext.topic = 'depression';
      setConversationContext(newContext);
      return depressionResponses[Math.floor(Math.random() * depressionResponses.length)];
    }
    
    // Stress responses - More conversational
    if (lowerMessage.match(/\b(stress|stressed|stressing|overwhelmed|pressure|pressured|burnout|burned out|exhausted|too much)\b/)) {
      const stressResponses = [
        "I can hear that you're feeling really stressed right now. That's completely understandable - stress can build up and feel overwhelming. What's the main thing that's causing you stress at the moment?",
        
        "It sounds like you're dealing with a lot of pressure. Stress is your body's way of responding to demands, but when it's constant, it can really take a toll. Have you noticed any physical symptoms, like tension in your shoulders or trouble sleeping?",
        
        "Stress can feel like you're carrying the weight of the world on your shoulders. You're not alone in feeling this way. What helps you unwind when you're stressed? Sometimes even small breaks can make a big difference.",
        
        "I understand that stress can be really challenging. When everything feels like too much, it's important to remember that you don't have to handle it all at once. Can you identify one thing you could do right now to give yourself a moment of relief?",
        
        "It sounds like you're overwhelmed, and that's a valid feeling. Stress management isn't about eliminating stress completely - it's about finding healthy ways to cope. What's one small step you could take today to reduce some of that pressure?"
      ];
      newContext.topic = 'stress';
      setConversationContext(newContext);
      return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    }
    
    // Sleep issues - More conversational
    if (lowerMessage.match(/\b(sleep|sleeping|insomnia|tired|exhausted|can't sleep|wake up|restless|sleepless)\b/)) {
      const sleepResponses = [
        "Sleep issues can really impact how you feel during the day. I'm sorry you're struggling with this. How long has this been going on? Are you having trouble falling asleep, staying asleep, or both?",
        
        "It sounds like you're having trouble with sleep. That can make everything else feel harder. What does your bedtime routine look like? Sometimes small changes to your evening routine can make a big difference.",
        
        "Sleep problems can be really frustrating, especially when you're tired but can't seem to get the rest you need. Have you noticed if there are specific thoughts or worries that keep you up at night?",
        
        "I hear you're struggling with sleep. Poor sleep can affect your mood, energy, and overall well-being. What have you tried so far to improve your sleep? Sometimes it helps to track what works and what doesn't.",
        
        "Sleep is so important for mental health, and I know how frustrating it can be when you're not getting enough. Are you finding that your mind races when you try to sleep, or is it more about physical restlessness?"
      ];
      newContext.topic = 'sleep';
      setConversationContext(newContext);
      return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
    }
    
    // Anger/Irritability - More conversational
    if (lowerMessage.match(/\b(anger|angry|irritated|irritation|frustrated|frustration|mad|furious|rage|annoyed)\b/)) {
      const angerResponses = [
        "I hear that you're feeling angry or frustrated right now. Those are completely valid emotions. Can you tell me what's triggering these feelings? Sometimes understanding the source helps us respond more effectively.",
        
        "It sounds like you're dealing with some strong emotions right now. Anger is a normal human response, but it can be challenging to manage. What's the situation that's making you feel this way?",
        
        "I understand that you're feeling angry or irritated. These feelings can be really intense. Have you noticed any physical sensations when you feel this way, like tension or a racing heart?",
        
        "Anger can be really difficult to deal with, especially when it feels overwhelming. You're not alone in experiencing this. What helps you calm down when you're feeling angry? Sometimes having strategies ready can make a difference.",
        
        "I hear you're feeling frustrated or angry. That's okay - emotions are information. What would help you feel better right now? Sometimes taking a moment to breathe or step away can help."
      ];
      newContext.topic = 'anger';
      setConversationContext(newContext);
      return angerResponses[Math.floor(Math.random() * angerResponses.length)];
    }
    
    // Loneliness/Social support - More conversational
    if (lowerMessage.match(/\b(lonely|loneliness|alone|isolated|isolation|no friends|no one|disconnected)\b/)) {
      const lonelinessResponses = [
        "I hear that you're feeling lonely, and that can be really tough. Loneliness is more than just being alone - it's about feeling disconnected. Can you tell me more about what's making you feel this way?",
        
        "Feeling lonely can be really painful, and I'm sorry you're experiencing that. You're not alone in feeling this way. What kind of connection are you looking for right now? Sometimes understanding what we need helps us find it.",
        
        "I understand that loneliness can be really challenging. It's okay to feel this way, and reaching out - even to me - is a step in the right direction. What would help you feel more connected?",
        
        "Loneliness is a difficult feeling to navigate. Thank you for sharing this with me. Have you been able to reach out to anyone recently, even just for a brief connection? Sometimes small steps can help.",
        
        "I hear you're feeling lonely, and that's really hard. You're taking a brave step by talking about it. What's one small way you could connect with someone today, even if it's just a text or a brief conversation?"
      ];
      newContext.topic = 'loneliness';
      setConversationContext(newContext);
      return lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)];
    }
    
    // Crisis/Urgent help
    if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself') || lowerMessage.includes('end it all') || lowerMessage.includes('not worth living') || lowerMessage.includes('hurt myself')) {
      return "🚨 **CRISIS SUPPORT - You are not alone:**\n\n**Immediate Help:**\n• National Suicide Prevention Lifeline: 988 (24/7)\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n• Go to your nearest emergency room\n\n**You Matter:**\n• Your life has value and meaning\n• These feelings are temporary, even when they don't feel that way\n• There are people who care about you\n• Professional help can make a significant difference\n\n**Right Now:**\n• Stay with someone you trust\n• Remove any means of self-harm\n• Remember: This pain is temporary\n• You are stronger than you know\n\nPlease reach out for immediate professional help. You don't have to go through this alone.";
    }
    
    // Happy/Positive responses - More conversational
    if (lowerMessage.match(/\b(happy|good|great|wonderful|amazing|fantastic|excited|grateful|blessed|feeling good|doing well|better)\b/)) {
      const positiveResponses = [
        "That's wonderful to hear! I'm so glad you're feeling positive right now. What's contributing to this good mood? Sometimes understanding what helps us feel good can help us recreate those feelings later.",
        
        "I love hearing that you're doing well! Celebrating these positive moments is so important for mental health. What's been going well for you lately?",
        
        "That's fantastic! It's great that you're experiencing some positive feelings. How can you build on this? Maybe there's something you can do to extend this good feeling?",
        
        "I'm really happy to hear you're feeling good! These positive moments are precious. What do you think helped you get to this place? Sometimes recognizing what works can help us maintain it.",
        
        "That's amazing! I'm so glad you're having a good day. Remember these feelings - they're important to hold onto during tougher times. Is there something specific that's making you feel this way?"
      ];
      newContext.mood = 'positive';
      setConversationContext(newContext);
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
    
    // General help and support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('resources')) {
      return "I'm here to support you! Here are comprehensive mental health resources:\n\n🆘 **Crisis Resources:**\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency: 911\n\n🏥 **Professional Help:**\n• Find therapists: PsychologyToday.com\n• Low-cost therapy: Open Path Collective\n• Online therapy: BetterHelp, Talkspace\n• Your insurance provider's mental health coverage\n\n📚 **Self-Help Resources:**\n• Mindfulness apps: Headspace, Calm\n• Mood tracking: Daylio, Moodpath\n• Books: 'The Anxiety and Phobia Workbook'\n• Podcasts: 'The Mental Health Podcast'\n\n🌱 **Daily Practices:**\n• Regular exercise and outdoor time\n• Healthy sleep and nutrition\n• Mindfulness and meditation\n• Connecting with supportive people\n\nRemember: Seeking help is a sign of strength, not weakness.";
    }
    
    // Thank you responses - More varied
    if (lowerMessage.match(/\b(thank|thanks|thank you|appreciate|grateful)\b/)) {
      const thankYouResponses = [
        "You're so welcome! I'm really glad I could help. Remember, I'm here whenever you need to talk. You're doing great, and taking care of your mental health is important. 🌟",
        
        "It's my pleasure! I'm here to support you whenever you need it. You're taking important steps for your well-being, and that's something to be proud of. Feel free to come back anytime!",
        
        "You're very welcome! I'm happy I could be helpful. Remember, reaching out for support is a sign of strength, not weakness. You're doing great, and I'm always here if you need to talk again.",
        
        "I'm so glad I could help! That's what I'm here for. Take care of yourself, and know that you can always come back if you need support. You're doing amazing! 💚",
        
        "You're welcome! It means a lot that you reached out. Remember, taking care of your mental health is ongoing work, and you're doing it. I'm here whenever you need me!"
      ];
      return thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
    }
    
    // Questions and follow-ups - More conversational
    if (lowerMessage.match(/\?/)) {
      const questionResponses = [
        "That's a great question. I'm here to help you explore that. Can you tell me a bit more about what you're thinking?",
        
        "I appreciate you asking. Let me help you think through this. What's your biggest concern about this?",
        
        "That's something worth exploring. What made you think about this? Sometimes understanding where a question comes from helps us find better answers.",
        
        "I'm glad you're asking. This shows you're thinking about your well-being. What would be most helpful for you to know right now?",
        
        "That's a thoughtful question. Let's explore this together. What's been on your mind about this topic?"
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }
    
    // Short responses - More engaging
    if (messageLength <= 3) {
      const shortResponses = [
        "I'm listening. Can you tell me more about that?",
        
        "I hear you. What's on your mind?",
        
        "I'm here for you. What would you like to talk about?",
        
        "Tell me more - I'm here to listen and support you.",
        
        "I understand. How are you feeling about this?"
      ];
      return shortResponses[Math.floor(Math.random() * shortResponses.length)];
    }
    
    // Default response - More conversational and engaging
    const defaultResponses = [
      "I'm here to listen and support you. I can help with various mental health concerns including anxiety, depression, stress, sleep issues, and more. What's on your mind today? 💚",
      
      "Thank you for sharing that with me. I'm here to help you navigate whatever you're going through. Can you tell me more about what you're experiencing?",
      
      "I hear you. Mental health is complex, and everyone's journey is different. What would be most helpful for you right now? I can provide support, resources, or just listen.",
      
      "I'm here to support you. Whether you're dealing with anxiety, stress, mood issues, or just need someone to talk to, I'm listening. What would you like to discuss?",
      
      "Thank you for reaching out. I'm here to help you feel better. What's been challenging for you lately? Sometimes talking about it can help."
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
