import React, { useEffect, useState, useCallback } from "react";
import { useChat, type Message } from "ai/react";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import ChatScrollAnchor from "@/components/component/chatbot/chat-scroll-anchor";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[];
	id?: string;
}

const Chat = ({ id, initialMessages }: ChatProps) => {
	const { messages, append, input, setInput, stop, reload, isLoading } =
		useChat({ initialMessages });
	const router = useRouter();
	const [userId, setUserId] = useState<string | null>(null);

	// set messages in firestore
	const updateConversation = useCallback(
		async (messages: Message[]) => {
			// adds the messages to the chat
			if (!userId || messages.length === 0) return;
			const conversationRef = doc(db, "conversations", userId);

			const conversationData = {
				general: {
					[id?.toString() ?? ""]: messages, // id was clutch my dargg (:joy_cat:)
				},
			};

			await setDoc(conversationRef, conversationData, { merge: true }); // add dat message
		},
		[userId, id]
	);

	const checkAndRedirect = useCallback(async () => {
		if (!userId || !id) return;
		const conversationRef = doc(db, "conversations", userId);
		const conversationSnap = await getDoc(conversationRef);
		if (conversationSnap.exists()) {
			const conversationData = conversationSnap.data();
			if (conversationData?.general?.[id]) {
				router.push(`/chatbot/${id}`);
			}
		}
	}, [userId, id, router]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				setUserId(null);
			}
		});

		return () => unsubscribe(); // Clean up subscription on unmount
	}, []);

	useEffect(() => {
		if (!isLoading) {
			updateConversation(messages);
			checkAndRedirect();
		}
	}, [messages, isLoading, checkAndRedirect, updateConversation]);

	return (
		<>
			<div>
				{messages.length ? (
					<>
						<ChatList messages={messages} />
						<ChatScrollAnchor trackVisibility={isLoading} />
					</>
				) : (
					<div className="max-w-4xl w-full flex justify-center">
						<EmptyScreen setInput={setInput} />
					</div>
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
