import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore' 
import UsersLoadingSkeleton from './UserLoadingSkeleton'
import NoChatsFound from './NoChatsFound'

function ChatList() {
  const { getChats, chats, isUserLoading, setSelectedUser, selectedUser } = useChatStore()

  const { authUser, onlineUsers } = useAuthStore() 
  

  useEffect(() => {
    
    if (authUser) {
      getChats()
    }
  }, [getChats, authUser]) 


  if (!authUser || isUserLoading) return <UsersLoadingSkeleton/>
  if (chats.length === 0) return <NoChatsFound/>

  return (
    <>
      {chats.map(chat => {
        return (
          <div 
            key={chat.id || chat._id} 
            className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20'
            onClick={() => setSelectedUser(chat)}  
          >
            <div className='flex items-center gap-3'>
              <div className={`avatar ${onlineUsers.includes(chat._id) ? 'avatar-online' : 'offline'}`}>
                <div className='size-12 rounded-full'>
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.username} />
                </div>
              </div>
              <h4 className='text-slate-200 font-medium truncate'>{chat.username}</h4>
            </div>
          </div>
        );
      })}
    </>
  )
}

export default ChatList
