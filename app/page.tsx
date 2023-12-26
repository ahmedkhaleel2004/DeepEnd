"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { signInWithGithub } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/component/navbar";
import { getAdditionalUserInfo } from "firebase/auth";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.data()?.doneSurvey) {
						router.push("/projects");
					} else if (!docSnap.data()?.doneSurvey) {
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

	const handleSignIn = async () => {
		if (auth.currentUser) {
			// if he is signed in
			const docRef = doc(db, "users", auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.data()?.doneSurvey) {
				router.push("/projects");
			} else if (!docSnap.data()?.doneSurvey) {
				router.push("/survey");
			}
		} else {
			await signInWithGithub().then(async (result) => {
				if (auth.currentUser) {
					// should always be true
					const docRef = doc(db, "users", auth.currentUser.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						if (docSnap.data()?.doneSurvey) {
							router.push("/projects");
						} else if (!docSnap.data()?.doneSurvey) {
							router.push("/survey");
						}
					} else {
						const additionalUserInfo =
							getAdditionalUserInfo(result);
						setDoc(doc(db, "users", auth.currentUser.uid), {
							doneSurvey: false,
							photoURL: auth.currentUser.photoURL,
							email: auth.currentUser.email,
							name: auth.currentUser.displayName
								? auth.currentUser.displayName
								: additionalUserInfo?.username,
						});
						router.push("/survey");
					}
				}
			});
		}
	};

	return (
		<>
			<Navbar mainPage={true} />
			<main className="mx-6">
				<div>
					<h1 className="text-3xl font-bold"> Welcome to Linus</h1>
				</div>
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
			</main>
		</>
	);
}
