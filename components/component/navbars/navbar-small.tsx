"use client";

import React from "react";
import {
	NavigationMenu,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const NavbarSmall = () => {
	const navbarItems = ["Projects", "Chatbot", "Timeline"];

	return (
		<>
			<img src="/jbp.png" alt="logo" className="w-7 h-7 rounded-full" />
			<NavigationMenu className="flex justify-end">
				<div>
					{navbarItems.map((item, index) => (
						<NavigationMenuLink key={index} asChild>
							<Link
								href={`/${item.toLowerCase()}`}
								className="px-2 py-1"
							>
								{item}
							</Link>
						</NavigationMenuLink>
					))}
				</div>
			</NavigationMenu>
		</>
	);
};

export default NavbarSmall;
