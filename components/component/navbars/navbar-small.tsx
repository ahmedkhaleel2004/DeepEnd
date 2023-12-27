"use client";

import React from "react";
import {
	NavigationMenu,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const NavbarSmall = () => {
	const navbarItems = ["Projects", "Chatbot", "Timeline"];

	return (
		<NavigationMenu>
			<div>
				{navbarItems.map((item, index) => (
					<NavigationMenuLink key={index}>
						<a
							href={`/${item.toLowerCase()}`}
							className="px-2 py-1"
						>
							{item}
						</a>
					</NavigationMenuLink>
				))}
			</div>
		</NavigationMenu>
	);
};

export default NavbarSmall;
