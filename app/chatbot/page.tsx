"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/component/message";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chatbot = () => {
	const router = useRouter();
	const [userInput, setUserInput] = React.useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = async () => {
		console.log(userInput);
		const response = await fetch("/api/gpt", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});

		const responseData = await response.json();
		console.log(responseData);
	};

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
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
		<main className="max-w-5xl p-8 mx-auto">
			<header className="mb-4">
				<h1 className="text-3xl font-bold">Chatbot</h1>
				<Label>Interact with Linus!</Label>
			</header>
			<ScrollArea className="rounded-lg h-[70vh] border border-zinc-200 dark:border-zinc-800">
				<div className="p-4">
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
					<Message />
				</div>
			</ScrollArea>
			<div className="my-8">
				<div className="flex items-center space-x-2">
					<Input
						className="flex-grow"
						placeholder="Type your message here..."
						type="text"
						value={userInput}
						onChange={handleChange}
					/>
					<Button onClick={handleSubmit}>Send</Button>
				</div>
			</div>
		</main>
	);
};

export default Chatbot;
