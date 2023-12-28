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
import { Separator } from "@/components/ui/separator";
import { IconGitHub } from "@/components/ui/icons";
import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
	const router = useRouter();
	const { resolvedTheme } = useTheme();
	const [loading, setLoading] = useState(true);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	useEffect(() => {
		if (resolvedTheme) {
			setLoading(false);
		}
	}, [resolvedTheme]);

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
			<Navbar mainPage={true} />
			<main className="px-12 mx-auto max-w-[80rem]">
				<div className="grid sm:grid-cols-1 mt-16 md:grid-cols-2">
					<div>
						<h1 className="text-5xl font-bold pt-24 pb-6">
							Your Personal Project Partner
						</h1>
						<h2 className="text-base font-normal">
							Linus is the self-learning copilot for aspiring
							software engineers
						</h2>
						<div className="mt-5">
							<Button
								className="hover:text-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-950 dark:hover:text-zinc-50"
								onClick={handleSignIn}
							>
								<IconGitHub className="w-5 h-5 mr-2" />
								Sign in with GitHub
							</Button>
						</div>
					</div>
					<Card className="shadow-xl rounded-3xl bg-background/80">
						<CardHeader>
							<CardTitle>Try it out!</CardTitle>
						</CardHeader>
						<CardContent>
							<h1>Demo here</h1>
						</CardContent>
					</Card>
				</div>
				<Separator className="my-16 bg-white dark:bg-zinc-700" />
				{/* I was trying to add framer motion 💀
				<motion.div
					layoutId={"chatbot"}
					onClick={() => setSelectedId("chatbot")}
				>
					<motion.h5>{"Subtitle"}</motion.h5>
					<motion.h2>{"Title"}</motion.h2>
				</motion.div>
				<AnimatePresence>
					{selectedId && (
						<motion.div layoutId={selectedId}>
							<motion.h5>{"New subtitle"}</motion.h5>
							<motion.h2>{"New title"}</motion.h2>
							<motion.button
								onClick={() => setSelectedId(null)}
							/>
						</motion.div>
					)}
				</AnimatePresence> */}
				<Card className="rounded-3xl pb-8 bg-background/80">
					<CardHeader className="text-center my-4">
						<CardTitle className="text-3xl">
							An end-to-end solution
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex space-x-16 mx-8">
							<Card className="rounded-2xl">
								<Image
									src="/chatbot.png"
									alt="Chatbot"
									width={500}
									height={300}
									className="rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 rounded-b-xl">
									<CardTitle className="mb-2">
										Chatbot
									</CardTitle>
									<p>
										Get personally curated advice on your
										career in the tech industry.
									</p>
								</CardContent>
							</Card>
							<Card className="rounded-2xl">
								<Image
									src="/recommendation.png"
									alt="Recommendation"
									width={500}
									height={300}
									className="rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 rounded-b-xl">
									<CardTitle className="mb-2">
										Recommendation
									</CardTitle>
									<p>
										Receive project ideas based on your own
										experience and goals.
									</p>
								</CardContent>
							</Card>
							<Card className="rounded-2xl">
								<Image
									src="/timeline.png"
									alt="Timeline"
									width={500}
									height={300}
									className="rounded-t-2xl"
								/>
								<CardContent className="h-auto p-5 rounded-b-xl">
									<CardTitle className="mb-2">
										Timeline
									</CardTitle>
									<p>
										Generate specific timelines including
										technical guidance.
									</p>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
				<Separator className="mt-16 mb-16 bg-white dark:bg-zinc-700" />
				<div>
					<h1 className="text-3xl font-bold pb-6">
						How could I interest you
					</h1>
					<h2>In Jean Paul Baptiste?</h2>
				</div>
				<Separator className="mt-16 mb-16 bg-white dark:bg-zinc-700" />
				<div>
					<h1 className="text-3xl font-bold pb-6">
						Another section here...
					</h1>
					<h2>That describes our amazing product.</h2>
				</div>
				<Separator className="mt-16 mb-16 bg-white dark:bg-zinc-700" />
				<div id="contact">
					<h1 className="text-3xl font-bold pb-6">Contact</h1>
					<a
						className="hover:underline"
						href="mailto:zakamm@gmail.com?subject = Feedback&body = Message"
					>
						Send Us Feedback
					</a>
				</div>
				<footer className="mt-5 pt-5 text-center">
					© LinusCorp 2023
				</footer>
			</main>
		</div>
	);
}
