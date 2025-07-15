import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

const Chatsidebar = () => {
    const {userList, getUsers, setSelectedUser, selectedUser} = useChatStore();
    useEffect(() => {
       getUsers();
    }, [])
    
  return (
    <div className='md:w-60 border-r h-full flex flex-col'>
      <h1 className='font-bold text-2xl text-secondary pb-4 border-b'>Chat</h1>
      <div className='p-2 flex-col flex-1 space-y-3 overflow-y-auto '>
      {
        userList.length > 0 ? userList.map((user) => (
          <button key={user._id} onClick={() => setSelectedUser(user)} className={`flex items-center gap-2 p-1 rounded-sm bg-base-100 w-full hover:bg-base-200 ${selectedUser?._id === user._id ? 'bg-base-200' : 'bg-base-100' }`}>
          <span><img src={user.profilePic} className='size-11 rounded-full'/></span>
          <div className='flex-1 hidden md:flex'>
            <div>
          <p className='font-bold text-left'>{user.fullName}</p>
          <span className='flex gap-2 items-center'><div className="badge badge-success w-1 h-2"></div>Online</span>
          </div>
          </div>
          </button>
        )) : 
      <p>No user found</p>
      }
      </div>
      
    </div>
  )
}

export default Chatsidebar