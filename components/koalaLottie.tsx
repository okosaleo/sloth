"use client"
import Sloth from '../public/lottie/sloth.json'
import Lottie from "lottie-react";

export default function KoalaLottie() {
  return (
    <div>
        <Lottie  animationData={Sloth} loop={true} className="w-[20px] h-[20px]" />
    </div>
  )
}
