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
import { doc, onSnapshot, deleteField, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChatBubbleIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	const [conversations, setConversations] = React.useState<string[]>([]);
	const router = useRouter();
	const pathname = usePathname();

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

	const deleteConversation = async (conversationId: string) => {
		try {
			const userDocRef = doc(db, "conversations", userId);

			await updateDoc(userDocRef, {
				[`general.${conversationId}`]: deleteField(),
			});

			if (pathname === `/chatbot/${conversationId}`) {
				router.push("/chatbot");
			}

			setConversations(
				conversations.filter((id) => id !== conversationId)
			);
		} catch (error) {
			console.error("Error deleting conversation: ", error);
		}
	};

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
									className="pb-0 pt-0 p-2 mb-2 flex items-center hover:bg-zinc-800 rounded-md duration-200"
								>
									<Link
										href={`/chatbot/${conversationId}`}
										className=" flex grow items-center"
									>
										<div className="flex items-center gap-2">
											<ChatBubbleIcon />
											{conversationId}
										</div>
									</Link>
									<div
										className="hover:bg-zinc-700 rounded-md duration-200 cursor-pointer p-1"
										onClick={() =>
											deleteConversation(conversationId)
										}
									>
										<TrashIcon />
									</div>
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
