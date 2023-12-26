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
		<div className="flex flex-col items-end">
			{isLoading ? (
				<Button
					className="mb-4"
					variant="outline"
					onClick={() => stop()}
				>
					<IconStop className="mr-2" />
					Stop generating
				</Button>
			) : (
				messages?.length >= 2 && (
					<Button
						className="mb-4"
						variant="outline"
						onClick={() => reload()}
					>
						<IconRefresh className="mr-2" />
						Regenerate response
					</Button>
				)
			)}
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
		</div>
	);
};

export default ChatPanel;
