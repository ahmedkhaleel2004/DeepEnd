"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
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
	const { theme, setTheme } = useTheme();

	const prefersDarkMode = useRef(false);
	const prefersLightMode = useRef(false);

	useEffect(() => {
		prefersDarkMode.current =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		prefersLightMode.current =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: light)").matches;
	}, []);

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
				<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
					<div className="border-b border-border/40 pb-10">
						<h1 className="text-5xl font-bold pt-24 pb-6">
							Your Personal Project Partner
						</h1>
						<h2 className="text-base font-normal">
							Self-learning copilot for aspiring software
							engineers
						</h2>
						<div className="pt-5">
							<Button onClick={handleSignIn}>
								Sign in with GitHub
							</Button>
						</div>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Try it out!</CardTitle>
						</CardHeader>
						<CardContent>
							<h1>Demo here</h1>
						</CardContent>
					</Card>
				</div>
				<div id="features" className="border-b border-border/40 pb-10">
					<h1 className="text-3xl font-bold pt-24 pb-6 ">Features</h1>
					<h2>chatbot, project recommendations, timeline.</h2>
				</div>
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
