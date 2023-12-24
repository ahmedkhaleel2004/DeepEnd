import React from "react";
import { signOutFunc } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import router from "next/router";
import {
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";

const ProfileIcon = () => {
	const handleSignOut = async () => {
		try {
			await signOutFunc();
			// if no errors then push to home page
			router.push("/");
		} catch (error) {
			console.error("Failed to sign out:", error);
			// handle error, e.g. show a message to the user
		}
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="align-right h-9 w-9">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleSignOut}>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileIcon;
