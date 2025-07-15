import React, { useState } from 'react';
import { CirclePlus, Send} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { socket } from '../utils/socket';

const SendSection = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState('');

  const {sendMessage, selectedUser, addMessage  } = useChatStore();

  const fileSelect = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const fileSelectRemove = () => {
    setImage(null);
    setImagePreview(null);
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!text.trim() && !image) {
  return; // Don't send empty message
}

    const formData = new FormData();
    formData.append('text', text);
    if(image) {
      formData.append('image', image);
    }
    if (selectedUser?._id){
      formData.append('receiverId', selectedUser._id);
    }

    const message = await sendMessage(formData);

    // ✅ Optimistically update UI
    addMessage(message);

    //emit message in socket.io
    socket.emit('send_message', message);  // message = server response

    setText('');
    setImage(null);
    setImagePreview(null);
  }

  return (
    <div className='flex md:gap-3 gap-1 items-center relative'>
        <label className='btn btn-ghost'><CirclePlus className='md:size-6 size-3'/>
        <input type='file' accept='image/*' hidden onChange={fileSelect}/></label>
        <span className='flex-1'><input type="text" placeholder="Type here" className="input w-full p-2 h-9 outline-1 outline" value={text} onChange={(e) => setText(e.target.value)} /></span>
        <button onClick={handleSendMessage} className='btn btn-ghost'><Send className='md:size-6 size-3'/></button>
        {imagePreview && <div className='md:h-24 md:w-24 h-14 w-14 rounded-md overflow-hidden absolute left-5 bottom-full shadow-md'>
          <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
          <button onClick={fileSelectRemove} className='absolute right-0 top-0'>X</button>
        </div>}
    </div>
  )
}

export default SendSection