"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { signInWithGithub } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/component/navbars/navbar";
import { getAdditionalUserInfo } from "firebase/auth";
import { useTheme } from "next-themes";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	const router = useRouter();
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (resolvedTheme) {
			setLoading(false);
		}
	}, [resolvedTheme]);

	const prefersDarkMode =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	const prefersLightMode =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: light)").matches;

	const isDarkTheme =
		theme === "dark" || (theme === "system" && prefersDarkMode);
	const isLightTheme =
		theme === "light" || (theme === "system" && prefersLightMode);

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

	if (loading) {
		return <div>Loading...</div>;
	}

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
		<div>
			<div className="sticky top-0 w-full bg-transparent">
				<Navbar mainPage={true} />
			</div>
			<main className="px-12 mx-auto max-w-[90rem]">
				<div className="grid sm:grid-cols-1 mt-16 md:grid-cols-2 gap-4">
					<div className="border-b border-border/40 pb-10">
						<h1 className="text-5xl font-bold pt-24 pb-6">
							Your Personal Project Partner
						</h1>
						<h2 className="text-base font-normal">
							Self-learning copilot for aspiring software
							engineers
						</h2>
						<div className="pt-5">
							<Button
								className="text-white"
								onClick={handleSignIn}
							>
								Sign in with GitHub
							</Button>
						</div>
					</div>
					<Card className="shadow-xl">
						<CardHeader>
							<CardTitle>Try it out!</CardTitle>
						</CardHeader>
						<CardContent>
							<h1>Demo here</h1>
						</CardContent>
					</Card>
				</div>
				<Card className="py-10 w-full text-center mt-10 bg-black bg-opacity-50">
					<CardHeader>
						<CardTitle>Features</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-around">
							<Card className="card border border-gray-300 rounded-2xl w-96 h-auto">
								<img
									src="/jbp.png"
									alt="Image 1"
									className="w-full h-5/5 object-cover rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 bg-zinc-800 rounded-b-xl">
									<h1>Description 1</h1>
									<p className="break-words ">hello</p>
								</CardContent>
							</Card>
							<Card className="card border border-gray-300 rounded-2xl w-96 h-auto">
								<img
									src="/jbp.png"
									alt="Image 1"
									className="w-full h-5/5 object-cover rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 bg-zinc-800 rounded-b-xl">
									<h1>Description 1</h1>
									<p className="break-words ">hello</p>
								</CardContent>
							</Card>
							<Card className="card border border-gray-300 rounded-xl w-96 h-auto">
								<img
									src="/jbp.png"
									alt="Image 1"
									className="w-full h-5/5 object-cover rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 bg-zinc-800 rounded-b-xl">
									<h1>Description 1</h1>
									<p className="break-words ">hello</p>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
				<div id="demo" className="border-b border-border/40 pb-10">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">Demo</h1>
					<h2>Demo is probably going to be big</h2>
				</div>
				<div className="border-b border-border/40 pb-10">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">
						this is just for space
					</h1>
					<h2>second last</h2>
				</div>
				<div className="border-b border-border/40 pb-10">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">
						this is just for space
					</h1>
					<h2>second last</h2>
				</div>
				<div className="border-b border-border/40 pb-10">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">
						this is just for space
					</h1>
					<h2>second last</h2>
				</div>
				<div id="contact">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">Contact</h1>
					<a href="mailto:zakamm@gmail.com?subject = Feedback&body = Message">
						Send Us Feedback
					</a>
					<a href="tel:365-883-2277">Click to call us</a>
				</div>
				<footer className="mt-5 pt-5 border-t border-border/40 text-center">
					© LinusCorp 2023
				</footer>
			</main>
		</div>
	);
}
