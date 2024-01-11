import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavbarSmall from "../navbars/navbar-small";
import { Separator } from "@/components/ui/separator";
import ConversationsList from "./conversations-list";
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
			className={`lg:p-6 py-6 w-full max-w-xs h-full lg:border-r relative z-10 lg:bg-background bg-transparent overflow-hidden ${
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
