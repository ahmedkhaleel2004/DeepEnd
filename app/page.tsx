"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { signInWithGithub } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/component/navbars/navbar";
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
		<div className="main-page-body">
			<div className="navbar sticky top-0 bg-dark">
				<Navbar mainPage={true} />
			</div>
			<main className="mx-11">
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
					<div
						id="about"
						className="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg"
					>
						<h1 className="text-3xl font-bold pt-20 pb-6 dark:text-white">
							What is Linus?
						</h1>
						<p className="text-gray-700 dark:text-gray-300 pb-6 ">
							Welcome to Linus, your companion, instructor, and
							copilot as you pursue programming expertise. Linus
							is more than just a platform; it&apos;s your clever
							partner made to assist you in honing your project
							and programming skills.
						</p>

						<h2 className="pb-4">
							Envision an environment where your goals are guided
							by a customized AI assistant and where your
							aspirations and expertise come together. Linus gives
							aspiring software engineers the tools they need to
							approach their coding projects with clarity and
							direction. Linus learns about you—your abilities,
							aspirations, and distinct goals—through
							a questionnaire.
						</h2>
						<h2 className="pb-4">
							After getting to know you, Linus evolves from a tool
							into a virtual partner that makes project
							recommendations that are precisely matched to your
							interests and skill level. Select a project, and
							watch as Linus fits in seamlessly with your
							workflow, providing guidance, suggestions, and
							assistance along the way.
						</h2>
						<h2 className="pb-4">
							Linus is by your side as you go on coding
							adventures, using AI to improve your skills and help
							you reach your objectives. Discover the endless
							possibilities with Linus, where software engineering
							and self-learning collide to elevate your coding
							journey to new heights. Welcome to a smarter, more
							efficient way to code—welcome to Linus.
						</h2>
					</div>
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
