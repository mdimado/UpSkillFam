import React, { useState, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import axios from 'axios';
import Markdown from 'react-markdown';

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const upskillFamContext = `
    bot_identity:
    name: "UpskillFam AI"
    creator: "UpskillFam"
    primary_role: "Assist users with questions about UpskillFam platform and resources"

  faq:
    - question: "How can I get started with upskilling on this platform?"
      answer: "Begin by exploring our range of resources, such as podcasts, blogs, and videos. You can start with a roadmap or resume tips that match your career goals and go from there."
    - question: "What types of content are available on the platform?"
      answer: "We provide a variety of content including podcasts, blog articles on industry roadmaps, the latest market trends, resume-building tips, upskilling tips, and much more."
    - question: "How often is the content updated?"
      answer: "We're committed to providing fresh, relevant content and update our resources frequently to ensure you're getting the latest insights and best practices across various domains."
    - question: "Is the platform free to use?"
      answer: "Yes UpskillFam is a community for the students by the students and will always remain free:)"
    - question: "What is the Resume Evaluator, and how does it work?"
      answer: "Our Resume Evaluator analyzes your resume to ensure it's optimized for applicant tracking systems (ATS) and provides personalized tips to help improve your profile's appeal to recruiters."
    - question: "How does the job board work, and who can use it?"
      answer: "Our job board lists current openings across various fields and locations. Anyone with a registered account can use it to explore opportunities and apply directly to companies."
    - question: "What kind of upskilling tips do you offer?"
      answer: "Our platform provides tips on soft and technical skills, including effective learning techniques, communication strategies, and ways to adapt to changing market demands."
  `;

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (message.trim() === '' || isTyping) return;

    const updatedMessages = [...messages, { sender: 'user', message: message.trim() }];
    setMessages(updatedMessages);
    setMessage('');
    setIsTyping(true);

    try {
      const groqApiKey = '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';

      const messageList = [
        { role: 'system', content: upskillFamContext },
        ...updatedMessages.map((chat) => ({
          role: chat.sender === 'user' ? 'user' : 'assistant',
          content: chat.message,
        })),
      ];

      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          messages: messageList,
          model: 'llama3-8b-8192',
          temperature: 0.7,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: botMessage }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error.response || error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', message: 'Sorry, something went wrong. Please try again later.' },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = "Hello! I'm UpskillFam AI, here to assist you with questions about the UpskillFam platform and resources. How can I help you today?";
      setMessages([{ sender: 'bot', message: welcomeMessage }]);
    }
  }, [isOpen, messages.length]);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div
        className={`bg-white shadow-lg rounded-lg p-4 w-80 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">UpskillFam AI</h3>
          <button onClick={toggleChatbot}>
            <X size={20} />
          </button>
        </div>
        <div className="h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`px-3 py-2 rounded-lg mb-2 ${
                msg.sender === 'user'
                  ? 'bg-gray-200 self-end'
                  : 'bg-gray-800 text-white self-start'
              }`}
            >
              {msg.sender === 'bot' ? (
                <Markdown>{msg.message}</Markdown>
              ) : (
                msg.message
              )}
            </div>
          ))}
          {isTyping && (
            <div className="px-3 py-2 rounded-lg mb-2 bg-gray-200 self-start">
              <Markdown>...</Markdown>
            </div>
          )}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-lg mr-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white rounded-full h-10 w-10 flex items-center justify-center"
            onClick={sendMessage}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
      <button
        className="bg-gray-800 hover:bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg fixed bottom-4 right-4 z-50"
        onClick={toggleChatbot}
      >
        <i className="fas fa-comment-alt"></i>
      </button>
    </div>
  );
};

export default ChatbotPopup;