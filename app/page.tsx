"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/component/navbars/navbar";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainCard from "@/components/component/home/main-card";
import { useAuth } from "@/lib/hooks/use-auth";
import { signInFunc } from "@/lib/sign-in-or-create";

export default function Home() {
	const router = useRouter();
	const userData = useAuth(router);

	const handleSignIn = async () => {
		await signInFunc(router);
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
														src="/jbp.png"
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
														src="/jbp.png"
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
														src="/jbp.png"
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
														src="/jbp.png"
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
				<footer className="mt-5 pt-5 text-center">© fwd//</footer>
			</main>
		</div>
	);
}
