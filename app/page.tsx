"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/component/navbars/navbar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconGitHub } from "@/components/ui/icons";

import MainCard from "@/components/component/home/main-card";
import ProfileCard from "@/components/component/home/profile-card";
import AccordianQuestions from "@/components/component/home/accordian-questions";
import { signInFunc } from "@/lib/sign-in-or-create";
import Modal from "@/components/component/projects/modal";
import { BiPhone } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Home() {
	const router = useRouter();
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);

	const handleSignIn = async () => {
		await signInFunc(
			router,
			() => setIsCreatingAccount(true),
			() => setIsCreatingAccount(false)
		);
	};

	return (
		<div>
			<Navbar />
			<main className="px-12 mx-auto max-w-[80rem]">
				<div className="grid sm:grid-cols-1 mt-16 md:grid-cols-2 ">
					<div>
						<motion.div
							initial={{
								opacity: 0,
								y: -20,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.3,
							}}
						>
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
									onClick={() => setIsCreatingAccount(true)}
								>
									Get Started
								</Button>
								{isCreatingAccount && (
									<Modal>
										<Card className="flex flex-col items-center justify-center">
											<CardHeader>
												<Image
													src="/LinusLogoSVG.svg"
													width={50}
													height={50}
													alt="Linus Logo"
													className="justify-center"
												/>
												<CardTitle>
													Get started for free
												</CardTitle>
											</CardHeader>
											<CardContent className="flex flex-col items-center justify-center">
												<Button
													className="hover:text-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
													onClick={handleSignIn}
												>
													<IconGitHub className="w-5 h-5 mr-2" />
													Sign in with GitHub
												</Button>
												<CardDescription className="mt-4">
													By signing up, you agree
													with our terms and
													conditions.
												</CardDescription>
											</CardContent>
										</Card>
									</Modal>
								)}
							</div>
						</motion.div>
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
				<div className=" " id="about">
					<Separator className="my-16 bg-white dark:bg-zinc-700" />
					<h1 className="text-center text-3xl font-bold">About</h1>
				</div>
				<div id="features">
					<Separator className="my-16 bg-white dark:bg-zinc-700" />
					<Card className="rounded-3xl pb-8 bg-background/80">
						<CardHeader className="text-center my-4">
							<CardTitle className="text-3xl">
								End-to-end project guidance
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex space-x-16 mx-8">
								<MainCard
									title="Chatbot"
									description="Get personally curated advice on
												your career in the tech
												industry."
								/>
								<MainCard
									title="Recommendation"
									description="Receive project ideas based on
												your own experience and goals."
								/>
								<MainCard
									title="Timeline"
									description="Generate specific timelines
												including technical guidance."
								/>
							</div>
						</CardContent>
					</Card>
				</div>
				<Separator className="mt-12 mb-12 bg-white dark:bg-zinc-700" />
				<div>
					<div>
						<h1 className="text-center text-2xl font-bold pb-5">
							Frequently Asked Questions
						</h1>
					</div>
					<AccordianQuestions
						question={"How does it work?"}
						answer={
							"This is sample text. This is sample text. This is sampletext"
						}
						valueItem={"item-1"}
					/>
					<AccordianQuestions
						question={"Can i Trust Linus with my Information?"}
						answer={
							"You can trust us. You can trust us. You can trust us. You can trust us. we are not facebook........"
						}
						valueItem={"item-2"}
					/>
					<AccordianQuestions
						question={
							"What sets this AI tool different from ones in the market?"
						}
						answer={"Its just better. Its just better. and better."}
						valueItem={"item-3"}
					/>
				</div>
				<Separator className="mt-12 mb-4 bg-white dark:bg-zinc-700" />
				{/*about us*/}
				<div className="h-80 pt-10">
					<h1 className="text-center text-2xl font-bold pb-9">
						About Us
					</h1>
					<div>
						<div className="flex flex-wrap justify-between space-x-auto">
							<div className="flex align-center m-4">
								<ProfileCard
									username="Ahmed Khaleel"
									description="This is just sample text. (add your text to this)"
									link="https://www.linkedin.com/in/benjaminavdullahu/"
								/>
							</div>
							<div className="flex flex-col align-center m-4">
								<ProfileCard
									username="Shaaf Shahzad"
									description="This is just sample text. (add your text to this)"
									link="https://www.linkedin.com/in/benjaminavdullahu/"
								/>
							</div>
							<div className="flex flex-col align-center m-4 pb-20">
								<ProfileCard
									username="Omar Ramadan"
									description="This is just sample text. (add your text to this)"
									link="https://www.linkedin.com/in/benjaminavdullahu/"
								/>
							</div>
							<div className="flex flex-col align-center m-4 relative">
								<ProfileCard
									username="Benjamin Avdullahu"
									description={
										"One of the four developers of Linus.Currently a student in software development and interested in web development and front-end design. Hobbies are watching shows and movies, enjoying hangouts with friends and family, and making videos on YouTube."
									}
									link="https://www.linkedin.com/in/benjaminavdullahu/"
								/>
							</div>
						</div>
					</div>
				</div>
				<Separator className="mt-16 mb-6 bg-white dark:bg-zinc-700" />
				<div>
					<p className="text-center font-bold text-lg">Contact Us</p>
					<div id="contact" className="grid grid-cols-2 items-center">
						<div className="col-span-1 flex align-middle">
							<p className="align-middle pt-3">Linus</p>
							<Image
								src="/LinusLogoSVG.svg"
								width={50}
								height={50}
								alt="Linus Logo"
							/>
						</div>
						<div className="col-span-1">
							<div className="flex pt-4 justify-center">
								<a
									href="tel:123123123"
									className="text-blue-500 hover:text-blue-800 flex items-center "
								>
									<BiPhone />
									123-456-7890
								</a>
							</div>
							<div className="flex pt-4 justify-center">
								<a
									href="mailto:zakamm@gmail.com?subject=Feedback&body=Message"
									className="flex "
								>
									<CgMail className="w-9 h-9" />
								</a>
							</div>
						</div>
					</div>
				</div>
				<footer className=" pt-5 text-center">© fwd//</footer>
			</main>
		</div>
	);
}
