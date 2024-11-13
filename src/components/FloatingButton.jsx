import React, { useState } from 'react';

import Chatbot from './Chatbot';

const FloatingButton = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
    setIsButtonVisible(!isButtonVisible);
  };

  return (
    <>
      {isButtonVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleChatbot}
          >

          </button>
        </div>
      )}
      {isChatbotVisible && <Chatbot />}
    </>
  );
};

export default FloatingButton;