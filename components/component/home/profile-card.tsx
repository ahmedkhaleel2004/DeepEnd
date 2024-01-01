import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
	username: string;
	description: string;
}

const ProfileCard = ({ username, description }: ProfileCardProps) => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Card className="w-64 cursor-pointer h-12 ">
					<CardContent className="flex items-center gap-4">
						<Avatar className="h-11 w-11 pt-1">
							<AvatarImage alt="User's avatar" src="/jbp.png" />
							<AvatarFallback>NA</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<div className="font-semibold">{username}</div>
						</div>
					</CardContent>
				</Card>
			</HoverCardTrigger>
			<HoverCardContent className="w-72 pt-2 text-sm max-h-[100px]">
				<p className="p-2 text-gray-800 dark:text-gray-200 break-words">
					{description}
				</p>
			</HoverCardContent>
		</HoverCard>
	);
};

export default ProfileCard;
