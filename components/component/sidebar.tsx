"use client";

import React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import NavbarSmall from "./navbars/navbar-small";

interface SidebarProps {
	loggedIn: boolean;
	userId: string;
}

const Sidebar = ({ loggedIn, userId }: SidebarProps) => {
	return (
		<div className="p-6 w-full max-w-xs h-screen border-r">
			<NavbarSmall />
			{loggedIn && userId && (
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger className="text-2xl font-bold">
							General
						</AccordionTrigger>
						<AccordionContent>Conversation 1</AccordionContent>
						<AccordionContent>Conversation 2</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="text-2xl font-bold">
							Projects
						</AccordionTrigger>
						<AccordionContent>Project 1</AccordionContent>
						<AccordionContent>Project 2</AccordionContent>
					</AccordionItem>
				</Accordion>
			)}
		</div>
	);
};

export default Sidebar;
