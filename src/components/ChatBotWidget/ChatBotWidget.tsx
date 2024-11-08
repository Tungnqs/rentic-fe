import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { getChatbotSession, resetChatbotState, selectChatbotError, selectChatbotLoading, selectChatbotUrl } from '../../store/slices/chatbot.slice';
import { AIIcon } from '../../assets/icon/icon';

const ChatBotWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const chatUrl = useSelector(selectChatbotUrl);
  const isLoading = useSelector(selectChatbotLoading);
  const error = useSelector(selectChatbotError);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !chatUrl && !isLoading && !error) {
      dispatch(getChatbotSession());
    }
  }, [dispatch, chatUrl, isLoading, error, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    if (!chatUrl) {
      dispatch(getChatbotSession());
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    dispatch(resetChatbotState());
  };

  if (error) {
    return <div className="chat-bot-container">Error loading chat</div>;
  }

  return (
    <div className="chat-bot-container">
      {!isOpen ? (
        <button 
          onClick={handleOpenChat} 
          className="chat-bot-open" 
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : (
            <AIIcon className='w-8'/>
          )}
        </button>
      ) : (
        <div className="chat-bot-iframe">
          <button onClick={handleCloseChat} className="chat-bot-close">Close</button>
          {chatUrl && (
            <iframe
              src={chatUrl}
              width="500"
              height="600"
              frameBorder="0"
              title="Chat Bot"
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;