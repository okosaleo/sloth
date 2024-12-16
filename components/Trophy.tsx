"use client"
import Trophy from '../public/lottie/trophy.json'
import Lottie from "lottie-react";

export default function TrophyPage() {
  return (
    <div>
        <Lottie  animationData={Trophy} loop={true} className="w-[160px] h-[160px]" />
    </div>
  )
}
