"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "./profile-icon";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
// import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavbarProps {
  mainPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const mainNavItems = ["About", "Features", "Demo", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    (event.target as HTMLAnchorElement).blur();
  };

  return (
    <NavigationMenu
      className={`sticky top-0 mb-2 w-full max-w-none items-center bg-transparent px-4 py-4 backdrop-blur-lg transition-colors duration-300 ${
        scrolled && "border-b border-border/80 bg-black bg-opacity-[0.2] "
      }`}
    >
      <div className="flex w-full max-w-[80rem] items-center justify-between px-12">
        <Link className="text-2xl font-bold" href="/">
          <div className="flex  align-bottom">
            <p className="pt-0.5">Linus</p>
            {/*<Image
							src="/LinusLogoSVG.svg"
							width={40}
							height={40}
							alt="Linus Logo"
		/>*/}
          </div>
        </Link>
        <NavigationMenuList className="space-x-4">
          {mainNavItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={`#${item.toLowerCase()}`} legacyBehavior passHref>
                <NavigationMenuLink
                  className={` bg-transparent hover:text-foreground dark:hover:bg-foreground/20 ${navigationMenuTriggerStyle()}`}
                  onClick={(event) => handleNavClick(event, item.toLowerCase())}
                >
                  {item}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <ModeToggle />
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
