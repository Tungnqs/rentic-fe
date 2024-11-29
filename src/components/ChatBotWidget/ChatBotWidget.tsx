import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { 
  getChatbotSession, 
  resetChatbotState, 
  selectChatbotError, 
  selectChatbotLoading, 
  selectChatbotUrl 
} from '../../store/slices/chatbot.slice';
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
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">Failed to load chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={handleOpenChat} 
          disabled={isLoading}
          className="flex items-center justify-center w-14 h-14 max-sm:w-10 max-sm:h-10 bg-primaryYellow hover:bg-lightYellow text-black rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <AIIcon className="w-8 h-8 max-sm:w-4 max-sm:h-4" />
          )}
        </button>
      ) : (
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-[95vw] w-[400px] max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AIIcon className="w-6 h-6 text-white" />
              <h3 className="text-white font-medium">AI Assistant</h3>
            </div>
            <button 
              onClick={handleCloseChat}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="relative w-full h-[500px] max-h-[calc(90vh-64px)]">
            {chatUrl ? (
              <iframe
                src={chatUrl}
                className="w-full h-full"
                // frameBorder="0"
                title="Chat Bot"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-900 border-t-transparent" />
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ChatBotWidget;