import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface MessageProps {
	key: number;
	content: string;
	role: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
	return (
		<div className="flex items-start space-x-4 mb-4">
			<Avatar>
				<AvatarImage
					src="https://github.com/shadcn.png"
					alt="@shadcn"
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<Badge className="mb-1">{role}</Badge>
				<Card>
					<CardContent>
						<p className="p-4">{content}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Message;
