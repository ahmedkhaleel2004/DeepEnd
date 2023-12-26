import React from "react";
import { useChat, type Message } from "ai/react";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import ChatScrollAnchor from "@/components/component/chat-scroll-anchor";

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[];
	id?: string;
}

const Chat = ({ id, initialMessages }: ChatProps) => {
	const { messages, append, input, setInput, stop, reload, isLoading } =
		useChat({ initialMessages, id }); // i dont even know if id is needed
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
			<div className="fixed bottom-0 mb-6 max-4xl">
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
