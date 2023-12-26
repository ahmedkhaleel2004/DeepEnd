"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "../component/profile-icon";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

function useUser() {
	const [user, setUser] = useState(getAuth().currentUser);

	useEffect(() => {
		const unsubscribe = getAuth().onAuthStateChanged((user) => {
			setUser(user);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return user;
}

interface NavbarProps {
	mainPage?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ mainPage = false }) => {
	const mainNavItems = ["About", "Features", "Demo", "Contact"];
	const user = useUser();

	return (
		<NavigationMenu className="relative z-10 flex px-2 flex-1 items-center justify-between space-x-4 max-w-full border-b mb-2 border-border/40 py-2">
			<div className="group list-none items-center space-x-1 flex justify-end ml-auto">
				{mainPage &&
					mainNavItems.map((item, index) => (
						<NavigationMenuLink key={index} asChild>
							<a
								href={`#${item.toLowerCase()}`}
								className="px-2 py-1"
							>
								{item}
							</a>
						</NavigationMenuLink>
					))}
				<div className="flex space-x-4">
					<ModeToggle />
					{mainPage ? (
						<div className="w-5 h-8"></div>
					) : (
						!mainPage && user && <ProfileIcon />
					)}
				</div>
			</div>
		</NavigationMenu>
	);
};

export default Navbar;
