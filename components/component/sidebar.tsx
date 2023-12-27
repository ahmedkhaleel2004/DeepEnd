"use client";

import React, { useEffect } from "react";
import ChatHistory from "@/components/component/chat-history";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	return (
		<div className="max-w-xs w-full h-screen border">
			yurr
			<ChatHistory loggedIn={loggedIn} userId={userId} isGeneral={true} />
		</div>
	);
};

export default Sidebar;
