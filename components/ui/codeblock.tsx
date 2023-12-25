// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx

"use client";

import { FC, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	materialDark,
	materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { IconCheck, IconCopy } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
	language: string;
	value: string;
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkTheme(mediaQuery.matches);

		const handler = (e: any) => {
			setIsDarkTheme(e.matches);
		};

		mediaQuery.addEventListener("change", handler);
		console.log(isDarkTheme);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	const onCopy = () => {
		if (isCopied) return;
		copyToClipboard(value);
	};

	return (
		<div className="">
			<div className="relative w-full font-sans codeblock dark:bg-zinc-950 bg-zinc-100 rounded-xl mb-4">
				<div className="flex items-center justify-between w-full px-6 pr-4 dark:bg-zinc-800 bg-zinc-600 dark:text-zinc-100 text-white rounded-t-xl">
					<span className="text-xs lowercase font-mono">
						{language}
					</span>
					<div className=" items-center">
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
					style={isDarkTheme ? materialDark : materialLight}
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
						},
					}}
				>
					{value}
				</SyntaxHighlighter>
			</div>
		</div>
	);
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
