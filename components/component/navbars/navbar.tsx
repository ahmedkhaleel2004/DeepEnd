"use client";
import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "./profile-icon";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
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
		id: string
	) => {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		(event.target as HTMLAnchorElement).blur();
	};

	return (
		<NavigationMenu
			className={`sticky top-0 w-full bg-transparent max-w-none items-center mb-2 px-4 py-4 backdrop-blur-lg transition-colors duration-300 ${
				scrolled &&
				"bg-black bg-opacity-[0.2] border-b border-border/80 "
			}`}
		>
			<div className="max-w-[80rem] px-12 items-center flex w-full justify-between">
				<Link className="font-bold text-2xl" href="/">
					Logo
				</Link>
				<NavigationMenuList className="space-x-4">
					{mainNavItems.map((item, index) => (
						<NavigationMenuItem key={index}>
							<Link
								href={`#${item.toLowerCase()}`}
								legacyBehavior
								passHref
							>
								<NavigationMenuLink
									className={` bg-transparent dark:hover:bg-foreground/20 hover:text-foreground ${navigationMenuTriggerStyle()}`}
									onClick={(event) =>
										handleNavClick(
											event,
											item.toLowerCase()
										)
									}
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
