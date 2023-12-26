import * as React from "react";
import { UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useRouter } from "next/navigation";
import Textarea from "react-textarea-autosize";
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
			<div className="items-center rounded-2xl flex w-screen max-w-4xl gap-2 relative overflow-hidden max-h-60 border px-6">
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					value={input}
					onChange={(e: any) => setInput(e.target.value)}
					placeholder="Send a message."
					spellCheck={false}
					className="min-h-[60px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none"
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
