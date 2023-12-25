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
import Navbar from "@/components/component/navbar";
import { Textarea } from "@/components/ui/textarea";

interface Message {
	role: string;
	content: string;
}

const Chatbot = () => {
	const router = useRouter();
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat();
	const [username, setUsername] = useState("");

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
		<main className="max-w-4xl h-screen p-4 mx-auto flex flex-col justify-between">
			<Navbar mainPage={false} />
			<div>
				<header className="mb-4">
					<h1 className="text-3xl font-bold">Chatbot</h1>
					<Label>Interact with Linus!</Label>
				</header>
				<ScrollArea className="rounded-lg h-[70vh]">
					<div>
						{messages.map((m, index) => (
							<div key={index} className="mb-4">
								<Message
									role={
										m.role === "user" ? username : "Linus"
									}
									content={m.content}
								/>
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
			<div className="">
				<form onSubmit={handleSubmit}>
					<div className="flex items-center space-x-2">
						<Textarea
							className="flex-grow"
							placeholder="Type your message here..."
							value={input}
							onChange={handleInputChange}
						/>
						<Button type="submit" disabled={isLoading}>
							Send
						</Button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Chatbot;
