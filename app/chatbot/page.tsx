"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ChatbotInput } from "@/components/component/chatbot-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/component/message";
import { Label } from "@radix-ui/react-dropdown-menu";

const Chatbot = () => {
	const router = useRouter();

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
		<main className="w-full h-full max-w-5xl flex flex-col justify-between p-8 min-h-screen mx-auto">
			<header className="mb-4">
				<h1 className="text-3xl font-bold">Chatbot</h1>
				<Label>Interact with Linus!</Label>
			</header>
			<section className="flex-grow overflow-y-auto rounded-lg p-6 shadow-md">
				<Message />
				<Message />
				<Message />
			</section>
			<div className="my-8">
				<div className="flex items-center space-x-2">
					<Input
						className="flex-grow"
						placeholder="Type your message here..."
						type="text"
					/>
					<Button>Send</Button>
				</div>
			</div>
		</main>
	);
};

export default Chatbot;
