"use client";

import React from "react";
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuItem,
	navigationMenuTriggerStyle,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "./profile-icon";
import Image from "next/image";

const NavbarLarge = ({ projects = true }) => {
	const navbarItems = ["Projects", "Chatbot", "Timeline"];

	return (
		<>
			<NavigationMenu className="flex justify-between w-full max-w-full px-4 py-4">
				<Image
					src="/jbp.png"
					width={500}
					height={300} // had to include this for some reason
					alt="logo"
					className="w-40 h-10 mr-4"
				/>
				<div className="flex flex-row items-center justify-start grow mr-4">
					<NavigationMenuList className="space-x-4">
						{projects &&
							navbarItems.map((item, index) => (
								<NavigationMenuItem key={index}>
									<Link
										href={`/${item.toLowerCase()}`}
										legacyBehavior
										passHref
									>
										<NavigationMenuLink
											className={` bg-transparent dark:hover:bg-foreground/20 hover:text-foreground ${navigationMenuTriggerStyle()}`}
										>
											{item}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							))}
					</NavigationMenuList>
				</div>
				<div className="flex space-x-4">
					<ModeToggle />
					<ProfileIcon />
				</div>
			</NavigationMenu>
		</>
	);
};

export default NavbarLarge;
