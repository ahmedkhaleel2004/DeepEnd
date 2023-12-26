import React, { useState, useEffect } from "react";
import ChatMessage from "./message";
import { type Message } from "ai";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatList {
	messages: Message[];
}

const ChatList = ({ messages }: ChatList) => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				setUsername(docSnap.data()?.name);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

	if (!messages.length) {
		return null;
	}

	return (
		<div className="mb-40">
			{messages.map((m, index) => (
				<div key={index}>
					<ChatMessage
						role={m.role === "user" ? username : "Linus"}
						content={m.content}
					/>
				</div>
			))}
		</div>
	);
};

export default ChatList;
