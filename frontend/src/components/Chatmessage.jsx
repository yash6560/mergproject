import { useEffect, useLayoutEffect, useRef } from 'react';
import RightHead from './RightHead';
import SendSection from './SendSection';
import { useChatStore } from '../store/useChatStore';
import { socket } from '../utils/socket';

const Chatmessage = () => {
  const {selectedUser, getMessage, messages, addMessage, clearMessages } = useChatStore();

  const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 🧹 Clear previous messages before loading new chat
   clearMessages()

    const getMessages = async() => {
       if (selectedUser?._id) {
      const res = await getMessage(selectedUser._id);
      res.forEach(msg => addMessage(msg)); // populate store);
    }
    }
    getMessages();

    // ✅ Listen for new incoming message
    socket.on('receive_message', (data)=> {
      if(data.senderId === selectedUser?._id || data.receiverId === selectedUser?._id) {
        addMessage(data); // ✅ Update Zustand store on receive
        // setMessage((prev) => [...prev, data ]);
        scrollToBottom();
      }
    })
    // 🧹 Clean up listener when component unmounts or user changes
    return () => socket.off('receive_message');
  }, [selectedUser, addMessage, clearMessages, getMessage]);
  

   // ✅ Scroll when messages update
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  if(!selectedUser) {
    return(
      <div className="text-center text-gray-500 p-4 flex w-full items-center justify-center">
        Select a user to start chatting
      </div>
    )
  }
  return (
    <div className='flex-1 p-2 flex-col h-auto flex'>
      <div><RightHead/></div>
      <div className='flex-1 p-2 overflow-auto'>
        {
          messages?.map((message) => (
            <div key={message._id} className={`chat ${message.senderId === selectedUser._id ? 'chat-start' : 'chat-end' }`}>
          <div className="chat-image avatar hidden md:block">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            {message.senderId === selectedUser._id ? selectedUser.fullName : "You" }
            <time className="text-xs opacity-50">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
          </div>
          <div className="chat-bubble">{message.text && <span>{message.text}</span>}
  {message.image && (
    <img
      src={message.image}
      alt="sent"
      className="max-w-32 rounded-md"
    />
  )}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
          ))
        }
        <div ref={messagesEndRef}></div>
        
      </div>
      <div><SendSection/></div>
    </div>
  )
}

export default Chatmessage