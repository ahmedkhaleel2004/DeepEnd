import * as React from "react";
import { type UseChatHelpers } from "ai/react";
import { Button } from "@/components/ui/button";
import { IconRefresh, IconStop } from "@/components/ui/icons";
import ChatInput from "./chat-input";

export interface ChatPanelProps
	extends Pick<
		UseChatHelpers,
		| "append"
		| "isLoading"
		| "reload"
		| "messages"
		| "stop"
		| "input"
		| "setInput"
	> {
	id?: string;
	title?: string;
}

const ChatPanel = ({
	id,
	title,
	isLoading,
	stop,
	append,
	reload,
	input,
	setInput,
	messages,
}: ChatPanelProps) => {
	return (
		<div className="flex">
			<ChatInput
				onSubmit={async (value) => {
					await append({
						id,
						content: value,
						role: "user",
					});
				}}
				input={input}
				setInput={setInput}
				isLoading={isLoading}
			/>
			{isLoading ? (
				<Button
					variant="outline"
					onClick={() => stop()}
					className="bg-background"
				>
					<IconStop className="mr-2" />
					Stop generating
				</Button>
			) : (
				messages?.length >= 2 && (
					<div className="flex space-x-2">
						<Button variant="outline" onClick={() => reload()}>
							<IconRefresh className="mr-2" />
							Regenerate response
						</Button>
					</div>
				)
			)}
		</div>
	);
};

export default ChatPanel;
