"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function Navbar() {
  const { data: session } = useSession();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="w-full flex justify-between items-center p-6 bg-white">
      <div><Image src={Logo} alt="" width={70} height={70}/></div>
      <div className="text-gray-600 font-mono">{time}</div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
          <Avatar className="h-8 w-8">
            <Avatar className="h-8 w-8">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt="profile" />
              ) : (
                <AvatarFallback>
                  {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              )}
            </Avatar>
          </Avatar>
          <span key={session?.user?.name} className="text-sm text-black hidden sm:inline">
            {session?.user?.name}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuItem asChild>
            <a href="/profile">Lihat Profil</a>
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            Role: {session?.user?.role}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
