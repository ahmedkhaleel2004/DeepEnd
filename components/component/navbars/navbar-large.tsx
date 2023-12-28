"use client";

import React from "react";
import {
	NavigationMenu,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "./profile-icon";

const NavbarLarge = ({ projects = true }) => {
	const navbarItems = ["Projects", "Chatbot", "Timeline"];

	return (
		<>
			<NavigationMenu className="flex justify-between w-full max-w-full px-4 py-4">
				<img src="/jbp.png" alt="logo" className="w-40 h-10 mr-4" />
				<div className="flex flex-row items-center justify-start grow mr-4 space-x-4">
					{projects &&
						navbarItems.map((item, index) => (
							<NavigationMenuLink key={index} asChild>
								<Link
									href={`/${item.toLowerCase()}`}
									className="px-2 py-1 hover:underline"
								>
									{item}
								</Link>
							</NavigationMenuLink>
						))}
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
