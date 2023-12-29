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
import Image from "next/image";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

interface Conversation {
	id: string;
	name: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	const [conversations, setConversations] = React.useState<Conversation[]>(
		[]
	);
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
							const general = docSnapshot.data()?.general ?? {};
							const conversationData: Conversation[] =
								Object.entries(general).map(([id, value]) => ({
									id,
									name: (value as Conversation).name,
								}));
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
				conversations.filter(
					(conversation) => conversation.id !== conversationId
				)
			);
		} catch (error) {
			console.error("Error deleting conversation: ", error);
		}
	};

	return (
		<div className="p-6 w-full max-w-xs h-screen border-r">
			<NavbarSmall />
			<Separator />
			{loggedIn && userId && (
				<>
					<Button className="w-full my-4">
						<Image
							src="/jbp.png"
							width={500}
							height={300} // had to include this for some reason
							alt="logo"
							className="w-6 h-6 rounded-full mr-2"
						/>
						<Link href="/chatbot">New conversation</Link>
					</Button>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger className="text-2xl font-bold">
								General
							</AccordionTrigger>
							{conversations.map(({ id, name }) => (
								<AccordionContent
									key={id}
									className="pb-0 pt-0 p-2 mb-2 flex items-center hover:bg-zinc-300 dark:hover:bg-zinc-700  rounded-md duration-200"
								>
									<Link
										href={`/chatbot/${id}`}
										className=" flex grow items-center"
									>
										<div className="flex items-center gap-2">
											<ChatBubbleIcon />
											{name}
										</div>
									</Link>
									<div
										className="hover:bg-zinc-50 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1"
										onClick={() => deleteConversation(id)}
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
