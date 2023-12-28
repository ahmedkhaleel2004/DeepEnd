"use client";

import React, { useEffect } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import NavbarSmall from "./navbars/navbar-small";
import { Separator } from "../ui/separator";
import { db } from "@/lib/firebase";
import { Firestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	const [conversations, setConversations] = React.useState<string[]>([]);

	useEffect(() => {
		if (loggedIn && userId) {
			const fetchConversations = async () => {
				const conversationRef = doc(db, "conversations", userId);

				const unsubscribe = onSnapshot(
					conversationRef,
					(docSnapshot) => {
						if (docSnapshot.exists()) {
							const conversationData = Object.keys(
								docSnapshot.data()?.general ?? {}
							);
							setConversations(conversationData);
						} else {
							console.log("No such document!");
						}
					}
				);

				return () => unsubscribe();
			};

			fetchConversations();
		}
	}, [loggedIn, userId]);

	return (
		<div className="p-6 w-full max-w-xs h-screen border-r">
			<div className="pb-6 flex justify-between">
				<NavbarSmall />
			</div>
			<Separator />
			{loggedIn && userId && (
				<>
					<Button className="w-full my-4">
						<Link href="/chatbot">New conversation</Link>
					</Button>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger className="text-2xl font-bold">
								General
							</AccordionTrigger>
							{conversations.map((conversationId) => (
								<AccordionContent
									key={conversationId}
									className="pb-0 pt-0"
								>
									<Link
										href={`/chatbot/${conversationId}`}
										className="hover:bg-zinc-800 rounded-md flex p-2 mb-2"
									>
										<div className="w-full flex items-center gap-2">
											<ChatBubbleIcon />
											{conversationId}
										</div>
									</Link>
								</AccordionContent>
							))}
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger className="text-2xl font-bold">
								Projects
							</AccordionTrigger>
							<AccordionContent>Project 1</AccordionContent>
							<AccordionContent>Project 2</AccordionContent>
						</AccordionItem>
					</Accordion>
				</>
			)}
		</div>
	);
};

export default Sidebar;
function collection(db: Firestore, arg1: string, userId: string) {
	throw new Error("Function not implemented.");
}
