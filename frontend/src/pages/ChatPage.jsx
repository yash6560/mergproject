import React from 'react'
import Chatsidebar from '../components/Chatsidebar'
import Chatmessage from '../components/Chatmessage'

const ChatPage = () => {
  return (
    <div className='flex h-[calc(100vh-128px)]'>
        <div className='p-4 flex-1'>
            <div className='bg-base-100 p-2 rounded-md flex h-full'>
                <Chatsidebar/>
                <Chatmessage/>
            </div>
        </div>
    </div>
  )
}

export default ChatPage