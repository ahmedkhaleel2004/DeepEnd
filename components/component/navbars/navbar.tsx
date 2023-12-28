"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "./profile-icon";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
	NavigationMenu,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

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
		id: string
	) => {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<NavigationMenu
			className={`items-center justify-between max-w-full mb-2 px-2 border-b border-border/40 py-2 backdrop-blur-lg transition-colors duration-300 ${
				scrolled ? "bg-black bg-opacity-[0.15]" : "bg-transparent"
			}`}
		>
			<div className="group list-none items-center space-x-1 flex justify-end ml-auto">
				{mainPage &&
					mainNavItems.map((item, index) => (
						<NavigationMenuLink key={index} asChild>
							<Link
								href={`#${item.toLowerCase()}`}
								className="px-2 py-1"
								onClick={(event) =>
									handleNavClick(event, item.toLowerCase())
								}
							>
								{item}
							</Link>
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