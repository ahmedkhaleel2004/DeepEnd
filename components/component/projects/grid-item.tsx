import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface GridItemProps {
	title: string;
	description: string;
}

const GridItem = ({ title, description }: GridItemProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Image
					src="/jbp.png"
					alt="placeholder"
					width={200}
					height={200}
				/>
			</CardContent>
		</Card>
	);
};

export default GridItem;
