"use client";
import { useEffect, useState } from "react";
import KoalaBear from "../public/lottie/sloth.json"
import Lottie from "lottie-react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { WebAppUser, WebApp } from "@twa-dev/types";
import superjson from "superjson";

declare global {
    interface Window {
      Telegram?: {
        WebApp: WebApp
      }
    }
  }
  
export default function Home() {
    const [user, setUser] = useState<WebAppUser | null>(null);
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [bLoading, setBLoading] = useState(false)
  const router = useRouter()

    useEffect(() => {
      checkAuth()
  }, [])

  const checkAuth = async () => {
      const response = await fetch("/api/session")
      if (response.ok) {
          setIsAuthenticated(true)
      }
  }

  const authenticateUser = async () => {
      const WebApp = (await import('@twa-dev/sdk')).default
      WebApp.ready()
      const initData = WebApp.initData
      if (initData) {
          try {
              const response = await fetch("/api/auth", {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ initData }),
              })

              if (response.ok) {
                  setIsAuthenticated(true)
                  router.refresh()
              } else {
                  console.error('Authentication failed')
                  setIsAuthenticated(false)
              }
          } catch (error) {
              console.error('Error during authentication:', error)
              setIsAuthenticated(false)
          }
      }
  };

 
    useEffect(() => {
        if (typeof window !== "undefined" && window.Telegram?.WebApp.initDataUnsafe) {
          const userData = window.Telegram.WebApp.initDataUnsafe.user;
          if (userData) {
            setUser(userData);
          }
        }
      }, []);
    
      const postUserToDatabase = async () => {
        if (user) {
            setBLoading(true)
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: superjson.stringify(user),
        });
        setBLoading(false)
    
        if (response.ok) {
          return router.push(`/protectedUser/${user.id}`);
        } else {
          return router.push(`/protectedUser/${user.id}`);
        }
    }
      };

  useEffect(() => {
   setTimeout(() => {
     setLoading(false)
   }, 4200)
 }, [])
 if (loading) {
   return <Loader />
 };

  return (
    <div className="flex justify-center flex-col w-full items-center gap-10 p-10 min-h-screen bg-primary-bg ">
    {isAuthenticated ? (
                <>
                    <Lottie  animationData={KoalaBear} loop={true} className="w-[150px] h-[150px]" />
                    <button
                        onClick={postUserToDatabase}
                        disabled={bLoading}
                        className="bg-button-color font-Nohemi text-text-color p-5 rounded-md"
                    >
                        {bLoading ? "Loading..." : "Get Started"}
                    </button>
                </>
            ) : (
                <div className="flex items-center justify-center flex-col w-full">
                    <p className='text-text-color font-Nohemi text-2xl mb-3'>You need to be an owner of this account</p>
                    <button
                        onClick={authenticateUser}
                        className="bg-button-color font-Nohemi text-text-color p-3 rounded-md"
                    >
                        Authenticate
                    </button>
                </div>
            )}
    </div>
  )
}
