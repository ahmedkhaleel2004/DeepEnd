// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

"use client";

import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface Props {
	language: string;
	value: string;
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

	const onCopy = () => {
		if (isCopied) return;
		copyToClipboard(value);
	};

	return (
		<div className="relative w-full font-sans codeblock bg-zinc-950">
			<div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
				<span className="text-xs lowercase">{language}</span>
				<div className="flex items-center space-x-1">
					<Button
						variant="ghost"
						size="icon"
						className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
						onClick={onCopy}
					>
						{isCopied ? <IconCheck /> : <IconCopy />}
						<span className="sr-only">Copy code</span>
					</Button>
				</div>
			</div>
			<SyntaxHighlighter
				language={language}
				style={coldarkDark}
				PreTag="div"
				showLineNumbers
				customStyle={{
					margin: 0,
					width: "100%",
					background: "transparent",
					padding: "1.5rem 1rem",
				}}
				lineNumberStyle={{
					userSelect: "none",
				}}
				codeTagProps={{
					style: {
						fontSize: "0.9rem",
						fontFamily: "var(--font-mono)",
						// i dont have a var font mono?
					},
				}}
			>
				{value}
			</SyntaxHighlighter>
		</div>
	);
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
