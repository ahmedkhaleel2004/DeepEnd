"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { nanoid } from "@/lib/utils";
import Chat from "@/components/component/chatbot/chat";

const Chatbot = () => {
	const id = nanoid();

	return (
		<>
			<main className="flex justify-start">
				<div className="flex grow justify-center">
					<div className="flex flex-col max-w-4xl w-full">
						<header className="mb-4">
							<h1 className="text-3xl font-bold">Chatbot</h1>
							<Label>Interact with Linus!</Label>
						</header>
						<Chat id={id} />
					</div>
				</div>
			</main>
		</>
	);
};

export default Chatbot;
