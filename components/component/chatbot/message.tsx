import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "@/components/ui/codeblock";

interface MessageProps {
	content: string;
	role: string;
}

const ChatMessage: React.FC<MessageProps> = ({ role, content }) => {
	const [photoURL, setPhotoURL] = useState<string | null>("");

	useEffect(() => {
		if (role !== "Linus") {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				if (user && user.photoURL) {
					setPhotoURL(user.photoURL);
				}
			});

			// Cleanup subscription on unmount
			return () => unsubscribe();
		}
	}, [role]);

	const avatarSrc = role === "Linus" ? "/linus.png" : photoURL;

	return (
		<div className="flex items-start space-x-3 mb-4">
			<Avatar>
				{avatarSrc ? (
					<AvatarImage
						className="scale-[.77] rounded-3xl"
						src={avatarSrc}
					/>
				) : (
					<AvatarFallback></AvatarFallback>
				)}
			</Avatar>
			<div className="mt-2">
				<strong>{role}</strong>
				<MemoizedReactMarkdown
					className="max-w-xs sm:max-w-xl md:max-w-2xl mr-[2rem] lg:max-w-screen prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
					remarkPlugins={[remarkGfm, remarkMath]}
					components={{
						p({ children }) {
							return (
								<p className="mb-4 w-[80%] last:mb-0 text-zinc-950 dark:text-zinc-50">
									{children}
								</p>
							);
						},
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(
								className || ""
							);
							if (inline) {
								return (
									<code
										className={`font-mono relative rounded bg-muted px-[0.3rem] py-[0.2rem] mx-[0.2rem] text-sm font-semibold ${className}`}
										{...props}
									>
										{children}
									</code>
								);
							}

							return (
								<CodeBlock
									key={Math.random()}
									language={(match && match[1]) || ""}
									value={String(children).replace(/\n$/, "")}
									{...props}
								/>
							);
						},
					}}
				>
					{content}
				</MemoizedReactMarkdown>
			</div>
		</div>
	);
};

export default ChatMessage;
