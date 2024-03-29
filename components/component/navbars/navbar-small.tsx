"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";

const NavbarSmall = () => {
  const navbarItems = ["Projects", "Chatbot", "Timeline"];

  return (
    <div className="flex items-center justify-center pb-6">
      <NavigationMenu className="flex justify-end">
        <NavigationMenuList className="space-x-6">
          {navbarItems.map((item, index) => (
            <NavigationMenuItem key={index} className="">
              <Link href={`/${item.toLowerCase()}`} legacyBehavior passHref>
                <NavigationMenuLink
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                  className={`bg-transparent hover:bg-zinc-200 hover:text-foreground dark:hover:bg-foreground/20 ${navigationMenuTriggerStyle()}`}
                >
                  {item}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarSmall;
