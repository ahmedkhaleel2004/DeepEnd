import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from "@/components/ui/codeblock";

interface MessageProps {
	key: number;
	content: string;
	role: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
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
		<div className="flex items-start space-x-4 mb-4">
			<Avatar>
				{avatarSrc ? (
					<AvatarImage src={avatarSrc} />
				) : (
					<AvatarFallback></AvatarFallback>
				)}
			</Avatar>

			<div>
				<Badge className="mb-2">{role}</Badge>
				<MemoizedReactMarkdown
					className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
					remarkPlugins={[remarkGfm, remarkMath]}
					components={{
						p({ children }) {
							return <p className="mb-4 last:mb-0">{children}</p>;
						},
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(
								className || ""
							);
							if (inline) {
								return (
									<code
										className={`font-mono ${className}`}
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

export default Message;
