import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavbarSmall from "../navbars/navbar-small";
import { Separator } from "@/components/ui/separator";
import ConversationsList from "./conversations-list";
import { ModeToggle } from "../navbars/mode-toggle";
import ProfileIcon from "../navbars/profile-icon";

interface SidebarContentProps {
  loggedIn: boolean;
  userId: string;
  isLargeScreen: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  loggedIn,
  userId,
  isLargeScreen,
}) => {
  return (
    <div
      className={`relative z-10 h-full w-full max-w-xs overflow-hidden bg-transparent py-6 lg:border-r lg:bg-background lg:p-6 ${
        isLargeScreen ? "" : "flex flex-col"
      }`}
    >
      <NavbarSmall />
      <Separator />
      {loggedIn && userId && (
        <>
          <Button className="my-4 w-full">
            <Image
              src="/jbp.png"
              width={500}
              height={300} // had to include this for some reason
              alt="logo"
              className="mr-2 h-6 w-6 rounded-full"
            />
            <Link href="/chatbot">New conversation</Link>
          </Button>
          <ConversationsList loggedIn={loggedIn} userId={userId} />
        </>
      )}
      {!isLargeScreen && (
        <div className="flex h-full items-end justify-between">
          <ProfileIcon />
          <ModeToggle />
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
