'use client'
import Lottie from 'lottie-react';
import SlothFriends from "../public/lottie/friends.json"

export default function FriendComponent() {

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center p-6 bg-primary-bg">
      <Lottie animationData={SlothFriends} loop={true} className="w-[100px] h-[100px]" />
      <h1 className="text-xl font-bold mb-4 font-Nohemi text-text-color">INVITE FRIENDS</h1>
      <p className='font-Nohemi font-bold text-sm text-text-color'><span className='text-button-color'>Share</span> your invite link with your <span className='text-button-color'>friends</span> and get 200 sloth for each referral.</p>
    </div>
  )
}