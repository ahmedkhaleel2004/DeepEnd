import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Link {
	url: string;
	icon: JSX.Element;
}

interface ProfileCardProps {
	username: string;
	imageSrc: string;
	links: Link[];
}

const ProfileCard = ({ username, imageSrc, links }: ProfileCardProps) => {
	return (
		<div className="flex flex-col">
			<Image
				className="object-cover rounded-t-md"
				width={270}
				height={220}
				src={imageSrc}
				alt="User's image"
			/>
			<Card className="flex flex-col gap-2 p-4 rounded-none">
				<div className="font-semibold text-xl">{username}</div>
				<div className="h-14">
					{links.map((link, index) => (
						<a
							key={index}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							{React.cloneElement(link.icon, { size: "2em" })}
						</a>
					))}
				</div>
			</Card>
		</div>
	);
};

export default ProfileCard;
