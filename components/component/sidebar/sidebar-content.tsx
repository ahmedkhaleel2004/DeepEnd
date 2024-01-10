import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, deleteField, updateDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChatBubbleIcon, TrashIcon } from "@radix-ui/react-icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavbarSmall from "../navbars/navbar-small";
import { Separator } from "@/components/ui/separator";
import ConversationsList from "./conversations-list";
import { SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "../navbars/mode-toggle";
import ProfileIcon from "../navbars/profile-icon";

interface SidebarContentProps {
	loggedIn: boolean;
	userId: string;
	isLargeScreen: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
	loggedIn,
	userId,
	isLargeScreen,
}) => {
	return (
		<div
			className={`lg:p-6 py-6 w-full max-w-xs h-full lg:border-r relative z-10 lg:bg-background bg-transparent ${
				isLargeScreen ? "" : "flex flex-col"
			}`}
		>
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
					<ConversationsList loggedIn={loggedIn} userId={userId} />
				</>
			)}
			{!isLargeScreen && (
				<div className="flex h-full items-end justify-between">
					<ProfileIcon />
					<ModeToggle />
				</div>
			)}
		</div>
	);
};

export default SidebarContent;
