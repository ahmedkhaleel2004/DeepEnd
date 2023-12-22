import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileIcon = () => {
	return (
		<Avatar className="align-right">
			<AvatarImage src="https://github.com/shadcn.png" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default ProfileIcon;
