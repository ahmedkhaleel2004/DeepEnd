import React, { useEffect } from "react";
import { useChat, type Message } from "ai/react";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import ChatScrollAnchor from "@/components/component/chat-scroll-anchor";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[];
	id?: string;
}

const Chat = ({ id, initialMessages }: ChatProps) => {
	const { messages, append, input, setInput, stop, reload, isLoading } =
		useChat({ initialMessages, id }); // i dont even know if id is needed

	const updateConversation = async (messages: Message[]) => {
		// adds the messages to the chat
		const userId = auth.currentUser?.uid ?? "";
		if (!userId) return;
		const conversationRef = doc(db, "conversations", userId);

		const conversationData = {
			chats: {
				general: {
					[id?.toString() ?? ""]: messages, // id was clutch my dargg (:joy_cat:)
				},
			},
		};

		await setDoc(conversationRef, conversationData, { merge: true }); // add dat message
	};

	if (!isLoading) {
		updateConversation(messages);
	}

	return (
		<>
			<div>
				{messages.length ? (
					<>
						<ChatList messages={messages} />
						<ChatScrollAnchor trackVisibility={isLoading} />
					</>
				) : (
					<EmptyScreen setInput={setInput} />
				)}
			</div>
			<div className="fixed w-[92%] lg:max-w-4xl lg:w-screen  bottom-0 py-6 bg-gradient-to-t from-zinc-900">
				<ChatPanel
					id={id}
					isLoading={isLoading}
					stop={stop}
					append={append}
					reload={reload}
					messages={messages}
					input={input}
					setInput={setInput}
				/>
			</div>
		</>
	);
};

export default Chat;
