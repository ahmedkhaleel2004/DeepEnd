"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "../component/profile-icon";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
	NavigationMenu,
	NavigationMenuLink,
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

	const handleNavClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		id: string
	) => {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<NavigationMenu
			className=" items-center justify-between max-w-full mb-2 px-2 border-b border-border/40 py-2"
			style={{ backgroundColor: "hsl(var(--background))" }}
		>
			<div className="group list-none items-center space-x-1 flex justify-end ml-auto">
				{mainPage &&
					mainNavItems.map((item, index) => (
						<NavigationMenuLink key={index} asChild>
							<a
								href={`#${item.toLowerCase()}`}
								className="px-2 py-1"
								onClick={(event) =>
									handleNavClick(event, item.toLowerCase())
								}
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
