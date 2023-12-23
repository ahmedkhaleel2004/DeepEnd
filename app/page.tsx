"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { signInWithGithub } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Home() {
	const router = useRouter();

	const handleSignIn = async () => {
		console.log("onclick sign in: ", auth.currentUser);
		if (auth.currentUser) {
			const docRef = doc(db, "users", auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.data()?.doneSurvey) {
				router.push("/projects");
			} else if (!docSnap.data()?.doneSurvey) {
				router.push("/survey");
			} else {
				console.log("error");
			}
		} else {
			await signInWithGithub().then(() => {
				if (auth.currentUser) {
					setDoc(doc(db, "users", auth.currentUser.uid), {
						doneSurvey: false,
						photoURL: auth.currentUser.photoURL,
					});
				}
				router.push("/survey");
			});
			// if no errors then push to survey page
		}
	};

	return (
		<>
			<div className="h-screen max-w-screen flex flex-col justify-center items-center">
				<Card className="flex flex-col items-center">
					<CardHeader>
						<CardTitle>Welcome to Linus</CardTitle>
					</CardHeader>
					<CardContent>
						<Button onClick={handleSignIn}>
							Sign in with GitHub
						</Button>
					</CardContent>
				</Card>
			</div>
			{/* 			
			<div className="flex flex-col h-screen justify-center items-center">
				<div
					id="container"
					className="w-1/4 h-1/4 border-zinc-800 border-4 rounded-xl flex flex-col justify-center items-center gap-10 bg-zinc-900"
				>
					<p className="text-3xl font-extrabold italic text-center">
						Welcome to Linus
					</p>
					<button
						onClick={signInWithGithub}
						className="w-1/2 h-1/4 border-zinc-800 border-2 rounded-xl hover:bg-zinc-800 hover:text-white transition duration-500 ease-in-out"
					>
						Sign in with GitHub
					</button>
				</div>
			</div> 
			*/}
		</>
	);
}
