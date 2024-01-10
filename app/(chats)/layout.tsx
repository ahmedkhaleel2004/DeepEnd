"use client";

import Sidebar from "@/components/component/sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/component/navbars/mode-toggle";
import ProfileIcon from "@/components/component/navbars/profile-icon";
import { useAuth } from "@/lib/hooks/use-auth";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface ChatLayoutProps {
	children: React.ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();
	const userData = useAuth(router, true);
	const divRef = React.useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setLoggedIn(!!userData?.uid);
	}, [userData?.uid]);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = (divRef.current?.scrollTop ?? 0) > 30;
			if (isScrolled !== scrolled) {
				setScrolled(!scrolled);
			}
		};

		divRef.current?.addEventListener("scroll", handleScroll);
		return () => {
			divRef.current?.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled, divRef.current]);

	return (
		<div className="flex h-screen">
			<Sidebar userId={userData?.uid} loggedIn={loggedIn} />
			<div className="flex grow overflow-hidden pl-0">
				<div
					className="flex flex-col w-full h-full overflow-scroll"
					ref={divRef}
				>
					{children}
				</div>
			</div>
			<div className="lg:flex lg:top-5 lg:right-8 lg:fixed space-x-4 hidden">
				<ModeToggle />
				<ProfileIcon />
			</div>
			<div className="w-full h-36 bg-gradient-to-t dark:from-zinc-900 from-zinc-300 fixed bottom-0" />
		</div>
	);
}

export default ChatLayout;
