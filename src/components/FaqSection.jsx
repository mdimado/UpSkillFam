import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqData = [
    {
      question: "How can I get started with upskilling on this platform?",
      answer: "Begin by exploring our range of resources, such as podcasts, blogs, and videos. You can start with a roadmap or resume tips that match your career goals and go from there.",
    },
    {
      question: "What types of content are available on the platform?",
      answer: "We provide a variety of content including podcasts, blog articles on industry roadmaps, the latest market trends, resume-building tips, upskilling tips, and much more.",
    },
    {
      question: "How often is the content updated?",
      answer: "We're committed to providing fresh, relevant content and update our resources frequently to ensure you're getting the latest insights and best practices across various domains.",
    },
    {
      question: "Is the platform free to use?",
      answer: "Yes UpskillFam is a community for the students by the students and will always remain free:)",
    },
    {
      question: "What is the Resume Evaluator, and how does it work?",
      answer: "Our Resume Evaluator analyzes your resume to ensure it's optimized for applicant tracking systems (ATS) and provides personalized tips to help improve your profile's appeal to recruiters.",
    },
    {
      question: "How does the job board work, and who can use it?",
      answer: "Our job board lists current openings across various fields and locations. Anyone with a registered account can use it to explore opportunities and apply directly to companies.",
    },
    {
      question: "What kind of upskilling tips do you offer?",
      answer: "Our platform provides tips on soft and technical skills, including effective learning techniques, communication strategies, and ways to adapt to changing market demands.",
    },
  ];

  const FAQItem = ({ question, answer, isActive, onClick, index }) => {
    const contentRef = useRef(null);
    
    return (
      <div className="border rounded-lg overflow-hidden mb-4 transition-colors duration-200 hover:border-blue-200">
        <button
          onClick={onClick}
          className="w-full p-4 flex justify-between items-center text-left focus:outline-none"
        >
          <span className="font-medium">{question}</span>
          <ChevronDown 
            className={`transform transition-transform duration-200 ${
              isActive ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : '0',
            opacity: isActive ? 1 : 0,
          }}
        >
          <div className="p-4 bg-gray-50">{answer}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-8 py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;