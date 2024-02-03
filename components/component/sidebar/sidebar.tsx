"use client";

import React, { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import SidebarContent from "./sidebar-content";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  loggedIn: boolean;
  userId: string;
}

const Sidebar = ({ userId, loggedIn }: SidebarProps) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isLargeScreen ? (
        <SidebarContent
          loggedIn={loggedIn}
          userId={userId}
          isLargeScreen={isLargeScreen}
        />
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed right-8 top-5 border-0 bg-transparent dark:hover:bg-foreground/50"
            >
              <HamburgerMenuIcon
                style={{
                  width: "19.2px",
                  height: "19.2px",
                }}
              />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="h-full">
            <SidebarContent
              loggedIn={loggedIn}
              userId={userId}
              isLargeScreen={isLargeScreen}
            />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Sidebar;
