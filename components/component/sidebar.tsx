"use client";

import React, { useEffect } from "react";
import ChatHistory from "@/components/component/chat-history";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	return (
		<div className="p-6 max-w-xs w-full h-screen border">
			<p className="text-3xl font-bold">General</p>
			<ChatHistory loggedIn={loggedIn} userId={userId} isGeneral={true} />
			<p className="text-3xl font-bold">Projects</p>
			<ChatHistory
				loggedIn={loggedIn}
				userId={userId}
				isGeneral={false}
			/>
		</div>
	);
};

export default Sidebar;
