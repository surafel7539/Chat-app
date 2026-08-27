import React from 'react'
import { MessageCircleIcon } from 'lucide-react'

function NoConvPlaceHolder() {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center p-6'>

    
      <div className='h-12 w-12 flex justify-center items-center p-2 bg-cyan-500/10 rounded-2xl'>
         <MessageCircleIcon className="size-10 text-cyan-400" />
      </div>

      <h3 className='font-medium text-slate-100 text-1xl'>Select a Conversation</h3>
      <p className='text-slate-300 font-light'>Choose a contact from the sidebar to start chatting or continue a previous conversation</p>
   </div>


  )
}

export default NoConvPlaceHolder