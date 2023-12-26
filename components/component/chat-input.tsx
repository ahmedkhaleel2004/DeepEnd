import * as React from "react";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconArrowElbow } from "@/components/ui/icons";

export interface PromptProps
	extends Pick<UseChatHelpers, "input" | "setInput"> {
	onSubmit: (value: string) => void;
	isLoading: boolean;
}

const ChatInput = ({ onSubmit, input, setInput, isLoading }: PromptProps) => {
	const router = useRouter();
	const { formRef, onKeyDown } = useEnterSubmit();
	const inputRef = React.useRef<HTMLTextAreaElement>(null);
	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				if (!input?.trim()) {
					return;
				}
				setInput("");
				await onSubmit(input);
			}}
			ref={formRef}
		>
			<div className="flex w-screen max-w-4xl resize-none">
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					value={input}
					onChange={(e: any) => setInput(e.target.value)}
					placeholder="Send a message."
					spellCheck={false}
					className="resize-none"
				/>
				<Button
					type="submit"
					size="icon"
					disabled={isLoading || input === ""}
				>
					<IconArrowElbow />
					<span className="sr-only">Send message</span>
				</Button>
			</div>
		</form>
	);
};

export default ChatInput;
