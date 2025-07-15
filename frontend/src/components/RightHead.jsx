import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const RightHead = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className='flex gap-3 items-center'>
        <div><img src={selectedUser?.profilePic} className='size-11 rounded-full'/></div>
        <span className='flex-1 font-bold text-sm'>{selectedUser.fullName || ""}</span>
        <button className='text-secondary' onClick={() => setSelectedUser(null)}><X /></button>
    </div>
  )
}

export default RightHead