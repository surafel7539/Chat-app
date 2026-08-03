import React from 'react'
import { useState, useRef } from 'react'
import { LogOutIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast' // Make sure toast is imported if you use it

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore()
  
  // 1. Fixed the state setter name to match what is called in the function
  const [selectedImg, setSelectedImg] = useState(null)
  const fileInputRef = useRef()

  const handleImgUpload = (e) => {
    if (!e?.target?.files) return;

    const file = e.target.files[0]; 
    if (!file) return; 

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must be less than 4MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      
      // ✅ Works correctly now that state matches variable declaration
      setSelectedImg(base64Image);

      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className='p-6 border-b border-slate-700/50 '>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='avatar avatar-online '>
                    <button className='size-14 rounded-full overflow-hidden relative group cursor-pointer' onClick={() => fileInputRef.current.click()}>
                        {/* 2. Standardized fallback chains if profilePic hasn't been uploaded yet */}
                        <img src={selectedImg || authUser?.profilePic || "/avatar.png"} alt="User Image" className='size-full object-cover' />
                        <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                            <span className='text-white text-xs'> Change</span>
                        </div>
                    </button>
                    <input 
                      type="file" 
                      accept='image/*' 
                      ref={fileInputRef} 
                      // 3. FIX: Passed function by reference so React runs it only on choice selection
                      onChange={handleImgUpload} 
                      className='hidden' 
                    />
                </div>
                <div>
                    <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
                        {authUser?.username}
                    </h3>
                    <p className='text-slate-400 text-xs'>Online</p>
                </div>
            </div>

            <div className='flex gap-4 items-center'>
                <button 
                    className='text-slate-400 hover:text-slate-200 transition-colors'
                    onClick={logout}    
                >
                 <LogOutIcon className='size-5 cursor-pointer'/>   
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader;
