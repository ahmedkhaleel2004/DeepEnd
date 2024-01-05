"use client";

import Sidebar from "@/components/component/sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/component/navbars/mode-toggle";
import ProfileIcon from "@/components/component/navbars/profile-icon";
import { useAuth } from "@/lib/hooks/use-auth";

interface ChatLayoutProps {
	children: React.ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
	const [loggedIn, setLoggedIn] = useState(false);
	const router = useRouter();
	const userData = useAuth(router, true);

	useEffect(() => {
		setLoggedIn(!!userData?.uid);
	}, [userData?.uid]);

	return (
		<div className="flex h-screen">
			<div className="hidden lg:block">
				<Sidebar userId={userData?.uid} loggedIn={loggedIn} />
			</div>
			<div className="flex grow overflow-hidden pl-0">
				<div className="flex flex-col w-full h-full overflow-auto">
					{children}
				</div>
			</div>
			<div className="flex top-5 right-8 fixed space-x-4">
				<ModeToggle />
				<ProfileIcon />
			</div>
			<div className="w-full h-60 bg-gradient-to-t from-zinc-900 fixed bottom-0" />
		</div>
	);
}

export default ChatLayout;
