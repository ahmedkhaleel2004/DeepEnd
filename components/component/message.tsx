import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

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
	}, []);

	const avatarSrc =
		role === "Linus" ? "https://github.com/shadcn.png" : photoURL;

	return (
		<div className="flex items-start space-x-4 mb-4">
			<Avatar>
				{avatarSrc ? (
					<AvatarImage src={avatarSrc} />
				) : (
					<AvatarFallback>CN</AvatarFallback>
				)}
			</Avatar>

			<div>
				<Badge className="mb-2">{role}</Badge>
				<Card>
					<CardContent className="px-2 py-1">
						<p className="p-2">{content}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Message;
