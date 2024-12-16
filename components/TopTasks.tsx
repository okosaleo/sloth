"use client"
import Tasks from '../public/lottie/task.json'
import Lottie from "lottie-react";

export default function TopTasks() {
  return (
    <div>
        <Lottie  animationData={Tasks} loop={true} className="w-[160px] h-[160px]" />
    </div>
  )
}