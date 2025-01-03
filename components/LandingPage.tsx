"use client";
import { useEffect, useState } from "react";
import KoalaBear from "../public/lottie/sloth.json";
import Friends from "../public/lottie/friends.json";
import Lottie from "lottie-react";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { WebAppUser, WebApp } from "@twa-dev/types";
import superjson from "superjson";

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
  }
}

export default function Home() {
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bLoading, setBLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await fetch("/api/session");
    if (response.ok) {
      setIsAuthenticated(true);
    }
  };

  const handleAuthenticateAndPostUser = async () => {
    setBLoading(true);

    try {
      // Authenticate the user
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp.ready();
      const initData = WebApp.initData;

      if (!initData) {
        throw new Error("Initialization data is missing.");
      }

      const authResponse = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });

      if (!authResponse.ok) {
        throw new Error("Authentication failed.");
      }

      setIsAuthenticated(true);

      // Post user data to the database
      if (user) {
        const dbResponse = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: superjson.stringify(user),
        });

        if (!dbResponse.ok) {
          router.push(`/protectedUser/${user.id}`);
        }

        router.push(`/protectedUser/${user.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBLoading(false);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4200);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center flex-col w-full items-center gap-10 p-10 min-h-screen bg-primary-bg ">
      {isAuthenticated ? (
        <>
          <Lottie animationData={KoalaBear} loop={true} className="w-[150px] h-[150px]" />
          <button
            onClick={handleAuthenticateAndPostUser}
            disabled={bLoading}
            className="bg-button-color font-Nohemi text-text-color p-5 rounded-md"
          >
            {bLoading ? "Loading..." : "Get Started"}
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center gap-4 flex-col w-full">
          <Lottie animationData={Friends} loop={true} className="w-[150px] h-[150px]" />
          <p className="text-text-color font-Nohemi text-2xl mb-3">
            Welcome to Sloth🦥
          </p>
          <button
            onClick={handleAuthenticateAndPostUser}
            className="bg-button-color font-Nohemi text-text-color p-3 rounded-md"
          >
            Hello
          </button>
        </div>
      )}
    </div>
  );
}
