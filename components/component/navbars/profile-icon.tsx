"use client";

import React, { useState, useEffect } from "react";
import { signOutFunc } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/firebase";

const ProfileIcon = () => {
	const [photoURL, setPhotoURL] = useState<string | null>("");
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user && user.photoURL) {
				setPhotoURL(user.photoURL);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

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
				<div className="w-9 h-9">
					<Avatar className="align-right h-full w-full cursor-pointer">
						{photoURL ? (
							<AvatarImage src={photoURL} />
						) : (
							<AvatarFallback>{"//"}</AvatarFallback>
							// N.P.^
						)}
					</Avatar>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={handleSignOut}
				>
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileIcon;
