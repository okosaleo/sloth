"use client";
import Lottie from "lottie-react";
import Sloth from "../public/lottie/sloth.json"


export default function LoadingLottie() {
  return (
    <div>
          <Lottie animationData={Sloth} loop={true} className="w-[120px] h-[120px]" />
    </div>
  )
}
