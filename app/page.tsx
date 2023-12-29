"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useState } from "react";
import { signInWithGithub } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/component/navbars/navbar";
import { getAdditionalUserInfo } from "firebase/auth";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { ExternalLinkIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { AnimatePresence, motion } from "framer-motion";

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
			// if they is signed in
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
			<Navbar />
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
								className="hover:text-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
								onClick={handleSignIn}
							>
								<IconGitHub className="w-5 h-5 mr-2" />
								Sign in with GitHub
							</Button>
						</div>
					</div>
					<Card className="shadow-lg rounded-3xl bg-background/80">
						<CardHeader>
							<CardTitle>Try it out!</CardTitle>
						</CardHeader>
						<CardContent>
							<h1>Demo here</h1>
						</CardContent>
					</Card>
				</div>
				<div id="features">
					<Separator className="my-16 bg-white dark:bg-zinc-700" />

					<Card className="rounded-3xl pb-8 bg-background/80">
						<CardHeader className="text-center my-4">
							<CardTitle className="text-3xl">
								An end-to-end solution
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex space-x-16 mx-8">
								<motion.a
									whileHover={{ scale: 1.05 }}
									onHoverStart={(e) => {}}
									onHoverEnd={(e) => {}}
								>
									<Card className="rounded-2xl">
										<Image
											src="/chatbot.png"
											alt="Chatbot"
											width={500}
											height={70}
											className="rounded-t-2xl object-cover h-60"
										/>
										<CardContent className="h-auto p-5 rounded-b-xl">
											<CardTitle className="mb-2">
												Chatbot
											</CardTitle>
											<p>
												Get personally curated advice on
												your career in the tech
												industry.
											</p>
										</CardContent>
									</Card>
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.05 }}
									onHoverStart={(e) => {}}
									onHoverEnd={(e) => {}}
								>
									<Card className="rounded-2xl">
										<Image
											src="/recommendation.png"
											alt="Recommendation"
											width={500}
											height={70}
											className="rounded-t-2xl object-cover h-60"
										/>

										<CardContent className="h-auto p-5 rounded-b-xl">
											<CardTitle className="mb-2">
												Recommendation
											</CardTitle>
											<p>
												Receive project ideas based on
												your own experience and goals.
											</p>
										</CardContent>
									</Card>
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.05 }}
									onHoverStart={(e) => {}}
									onHoverEnd={(e) => {}}
								>
									<Card className="rounded-2xl">
										<Image
											src="/timeline.png"
											alt="Timeline"
											width={500}
											height={70}
											className="rounded-t-2xl object-cover h-60"
										/>
										<CardContent className="h-auto p-5 rounded-b-xl">
											<CardTitle className="mb-2">
												Timeline
											</CardTitle>
											<p>
												Generate specific timelines
												including technical guidance.
											</p>
										</CardContent>
									</Card>
								</motion.a>
							</div>
						</CardContent>
					</Card>
				</div>
				<Separator className="mt-16 mb-16 bg-white dark:bg-zinc-700" />{" "}
				{/* this is the about section */}
				<Card
					className="bg-white dark:bg-black"
					style={{ height: "32rem" }}
				>
					<div className="h-96 pt-10">
						<h1 className="text-center text-3xl font-bold pb-9">
							About Us
						</h1>
						<div className="flex justify-between space-x-5">
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Card className="w-64 cursor-pointer h-12 ml-10 ">
											<CardContent className="flex items-center gap-4">
												<Avatar className="h-11 w-11 pt-1">
													<AvatarImage
														alt="User's avatar"
														src="/placeholder-avatar.jpg"
													/>
													<AvatarFallback>
														NA
													</AvatarFallback>
												</Avatar>
												<div className="space-y-2">
													<div className="font-semibold">
														User Name
													</div>
												</div>
											</CardContent>
										</Card>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-72  pt-2 space-y-1 text-sm max-h-[100px]">
										<p className="p-2 text-gray-800 dark:text-gray-200">
											Hello my name is Benmain Avdullahu I
											like to spend time doing fun stuff
											ydayda bru ok ima let let it do let
											it be ima come to the tea mess with
											me
										</p>
									</DropdownMenuContent>
								</DropdownMenu>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Card className="w-64 cursor-pointer h-12 ml-10 mt-28">
											<CardContent className="flex items-center gap-4">
												<Avatar className="h-11 w-11 pt-1">
													<AvatarImage
														alt="User's avatar"
														src="/placeholder-avatar.jpg"
													/>
													<AvatarFallback>
														NA
													</AvatarFallback>
												</Avatar>
												<div className="space-y-2">
													<div className="font-semibold">
														User Name
													</div>
												</div>
											</CardContent>
										</Card>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-72  pt-2 space-y-1 text-sm max-h-[100px]">
										<p className="p-2 text-gray-800 dark:text-gray-200">
											Hello my name is Benmain Avdullahu I
											like to spend time doing fun stuff
											ydayda bru ok ima let let it do let
											it be ima come to the tea mess with
											me
										</p>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Card className="w-64 cursor-pointer h-12 mt-20">
											<CardContent className="flex items-center gap-4">
												<Avatar className="h-11 w-11 pt-1">
													<AvatarImage
														alt="User's avatar"
														src="/placeholder-avatar.jpg"
													/>
													<AvatarFallback>
														NA
													</AvatarFallback>
												</Avatar>
												<div className="space-y-2">
													<div className="font-semibold">
														User Name
													</div>
												</div>
											</CardContent>
										</Card>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-72 pt-2 space-y-1 text-sm max-h-[100px]">
										<p className="p-2 text-gray-800 dark:text-gray-200">
											Hello my name is Benmain Avdullahu I
											like to spend time doing fun stuff
											ydayda bru ok ima let let it do let
											it be ima come to the tea mess with
											me
										</p>
									</DropdownMenuContent>
								</DropdownMenu>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Card className="w-64 cursor-pointer h-12 mt-28">
											<CardContent className="flex items-center gap-4">
												<Avatar className="h-11 w-11 pt-1">
													<AvatarImage
														alt="User's avatar"
														src="/placeholder-avatar.jpg"
													/>
													<AvatarFallback>
														NA
													</AvatarFallback>
												</Avatar>
												<div className="space-y-2">
													<div className="font-semibold">
														User Name
													</div>
												</div>
											</CardContent>
										</Card>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-72 pt-2 space-y-1 text-sm max-h-[100px]">
										<p className="p-2 text-gray-800 dark:text-gray-200">
											Hello my name is Benmain Avdullahu I
											like to spend time doing fun stuff
											ydayda bru ok ima let let it do let
											it be ima come to the tea mess with
											me
										</p>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<div className="w-2/5">
								<div>
									<p className="break-words">
										Our team members are new and aspiring
										young software developers who are going
										through the same process as you. We are
										here to help you through your journey
										and provide you with the best resources
										to help you succeed. That is why we
										created Linus, a personal project
										partner that will help you through your
										journey.
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card>
				<Separator className="mt-12 mb-12 bg-white dark:bg-zinc-700" />
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
