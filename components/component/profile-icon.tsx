import React from "react";
import { signOutFunc } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";

const ProfileIcon = ({ onSignOut }: { onSignOut: () => void }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="align-right h-9 w-9">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={onSignOut}>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileIcon;
