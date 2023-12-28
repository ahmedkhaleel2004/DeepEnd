"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { nanoid } from "@/lib/utils";
import Chat from "@/components/component/chatbot/chat";

const Chatbot = () => {
	const id = nanoid(); //creating an id

	return (
		<main className="w-full flex justify-center">
			<div className="flex flex-col max-w-4xl w-full">
				<header className="my-4">
					<h1 className="text-3xl font-bold">Chatbot</h1>
					<Label>Interact with Linus!</Label>
				</header>
				<Chat id={id} />
			</div>
		</main>
	);
};

export default Chatbot;
