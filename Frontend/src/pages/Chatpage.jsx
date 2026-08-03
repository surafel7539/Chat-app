import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import Border from '../components/Border'
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatContainer from '../components/ChatContainer';
import NoConvPlaceHolder from '../components/NoConvPlaceHolder';
import LoadingElement from '../components/loadingElement';
import ChatList from '../components/ChatList';
import ContactsList from '../components/ContactsList';

function Chatpage() {
  
  const{allContacts, chats, messages, isUserLoading, activeTab, selectedUser, getAllContacts, getChats}= useChatStore()
  
 


  

  return (
    <div className='relative w-full max-w-6xl h-[700px]  '>
      <Border>
          {/*Left Side*/}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col '>
          <ProfileHeader/>
          <ActiveTabSwitch/>

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {activeTab === "chats" ? <ChatList/> : <ContactsList/>}
          </div>
        </div>

        {/* Right Side */}

        <div className='flex-1 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm'>

          { selectedUser ? <ChatContainer/> : <NoConvPlaceHolder/>}

        </div>
      </Border>

    </div>
  )
}

export default Chatpage
