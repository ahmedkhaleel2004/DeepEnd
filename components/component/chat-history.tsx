"use client";

import React from "react";

interface ChatHistoryProps {
	loggedIn: boolean;
	userId: string;
	isGeneral?: boolean;
}

const ChatHistory = ({ loggedIn, userId, isGeneral }: ChatHistoryProps) => {
	return <div>ChatHistory</div>;
};

export default ChatHistory;
