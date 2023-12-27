"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Label } from "@radix-ui/react-dropdown-menu";
import Navbar from "@/components/component/navbar";
import { nanoid } from "@/lib/utils";
import Chat from "@/components/component/chat";
import Sidebar from "@/components/component/sidebar";

const Chatbot = () => {
	const id = nanoid();
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
		<>
			<main className="flex justify-start">
				<Sidebar />
				<div className="flex grow justify-center">
					<div className="flex flex-col max-w-4xl w-full">
						<header className="mb-4">
							<h1 className="text-3xl font-bold">Chatbot</h1>
							<Label>Interact with Linus!</Label>
						</header>
						<Chat id={id} />
					</div>
				</div>
			</main>
		</>
	);
};

export default Chatbot;
