"use client"
import { ClipboardCheck, HandCoins, House, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WebAppUser, WebApp } from "@twa-dev/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

declare global {
   interface Window {
     Telegram?: {
       WebApp: WebApp
     }
   }
 }

export default function Navbar() {
   const pathname = usePathname()
   const [user, setUser] = useState<WebAppUser | null>(null);
   useEffect(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp.initDataUnsafe) {
        const userData = window.Telegram.WebApp.initDataUnsafe.user;
        if (userData) {
          setUser(userData);
        }
      }
    }, []);

    const userH = user ? BigInt(user.id) : null;

   const navLinks = [
      {
         id: 1,
         title: "Home",
         url: `/protectedUser/${userH}`,
         icon: House
      },
      {
         id:2,
         title: "LeaderBoard",
         url: "/protectedUser/leaderboard",
         icon: Trophy
      },
      {
         id: 3,
         title: "Friends",
         url: `/protectedUser/friends/${userH}`,
         icon: Users
      },
      {
         id: 4,
         title: "Earn",
         url: `/protectedUser/tasks/${userH}`,
         icon: ClipboardCheck
      },
      {
        id: 5,
        title: "Roadmap",
        url: "/protectedUser/airdrop",
        icon: HandCoins
     },
     
     ]
     
  return (
    <div className="flex fixed z-50 bottom-0 left-0 w-full h-[14vh] flex-row items-center justify-between p-3 bg-under-color">
       {navLinks.map((item) => (
        <Link key={item.id}  href={item.url} className=" flex items-center justify-center flex-col gap-3 text-sm font-Nohemi text-text-color">
        <item.icon className={cn( pathname === item.url ? "text-button-color ": "text-text-color")} />
        <p className={cn("text-[11px]", pathname === item.url ? "text-button-color ": "text-text-color")}>{item.title}</p>
        </Link>
       ))}
    </div>
  )
}
