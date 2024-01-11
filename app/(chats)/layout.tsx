"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/component/navbars/mode-toggle";
import ProfileIcon from "@/components/component/navbars/profile-icon";
import { useAuth } from "@/lib/hooks/use-auth";
import SidebarContainer from "@/components/component/sidebar/sidebar-container";

interface ChatLayoutProps {
	children: React.ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [isHovered, setIsHovered] = useState(false);
	const router = useRouter();
	const userData = useAuth(router, true);
	const divRef = React.useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setLoggedIn(!!userData?.uid);
	}, [userData?.uid]);

	return (
		<div className="flex h-screen">
			<SidebarContainer
				userId={userData?.uid}
				loggedIn={loggedIn}
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
				isHovered={isHovered}
				setIsHovered={setIsHovered}
			/>
			<div className="flex grow overflow-hidden pl-0">
				<div
					className="flex flex-col w-full h-full overflow-y-auto"
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
