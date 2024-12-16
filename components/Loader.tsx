"use client"
import gsap from "gsap";
import Image from 'next/image';
import { useGSAP } from "@gsap/react";
import Lottie from 'lottie-react';
import Sloth from "../public/lottie/sloth.json"
import { useRef } from "react";


export default function Loader() {
  gsap.registerPlugin(useGSAP)
  const lott = useRef(null)

  useGSAP(() => {
    gsap.to(".line h1", {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      delay: 1.2,
      ease: "power4.out",
    });
    gsap.to(lott.current, {
      y: 0,
      stagger: 0.1,
      delay: 1.6,
      duration: 1.5,
      ease: "power4.out",
    });
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-primary-bg">
      <div className='relative w-[150px] h-[150px] mb-4'>
       <Image src="https://utfs.io/f/MyBJHXY8aJsOS2KmH9WimRJdxk6aPTCH0YyQGBOlWEbsU5c2" alt='Koala Logo' fill />
       </div>
       <div className='line [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)] flex flex-row '>
      <h1 className="text-4xl font-Nohemi font-bold mb-8 text-text-color relative will-change-transform translate-y-[75px]" >Sloth</h1>
      <div ref={lott} className="relative will-change-transform translate-y-[75px] ">
      <Lottie  animationData={Sloth} loop={true} className="w-[40px] h-[40px]" />
      </div>
      </div>
    </main>
  )
}
