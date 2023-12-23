import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const ProfileIcon = () => {
	return (
		<Avatar className="align-right">
			<AvatarImage src="" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};

export default ProfileIcon;
