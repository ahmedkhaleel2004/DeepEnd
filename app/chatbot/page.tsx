"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/component/message";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";

interface Message {
	role: string;
	content: string;
}

const Chatbot = () => {
	const router = useRouter();
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	// const [userInput, setUserInput] = useState("");
	// const [conversation, setConversation] = useState<Message[]>([]);
	const [username, setUsername] = useState("");

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setUserInput(e.target.value);
	// };

	// const fetchResponse = async (userInput: any) => {
	// 	const response = await fetch("/api/gpt", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ userInput }),
	// 	});
	// 	return response.json();
	// };

	// const handleSubmit = async () => {
	// 	const userMessage = { role: username, content: userInput }; // Replace "User" from db
	// 	setConversation((prevConversation) => [
	// 		...prevConversation,
	// 		userMessage,
	// 	]);
	// 	setUserInput("");

	// 	const responseData = await fetchResponse(userInput);
	// 	const linusMessage = {
	// 		role: "Linus",
	// 		content: responseData.message.content,
	// 	};
	// 	console.log(linusMessage);

	// 	setConversation((prevConversation) => [
	// 		...prevConversation,
	// 		linusMessage,
	// 	]);
	// };

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					setUsername(docSnap.data()?.name);
					if (!docSnap.data()?.doneSurvey) {
						router.push("/survey");
					}
				} else {
					router.push("/");
				}
			});

			// Cleanup subscription on unmount
			return () => unsubscribe();
		};

		checkAuthState();
	}, [router]);

	return (
		<main className="max-w-5xl h-screen p-8 mx-auto flex flex-col justify-between">
			<div className="">
				<header className="mb-4">
					<h1 className="text-3xl font-bold">Chatbot</h1>
					<Label>Interact with Linus!</Label>
				</header>
				<ScrollArea className="rounded-lg h-[75vh]">
					<div className="p-4">
						{/* {conversation.map((message, index) => (
							<Message
								key={index}
								role={message.role}
								content={message.content}
							/>
						))} */}
						{messages.map((m: any) => (
							<Message
								key={m.id}
								role={m.role === "user" ? username : "Linus"}
								content={m.content}
							/>
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="">
				<form onSubmit={handleSubmit}>
					<div className="flex items-center space-x-2">
						<Input
							className="flex-grow"
							placeholder="Type your message here..."
							type="text"
							value={input}
							onChange={handleInputChange}
						/>
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Chatbot;
