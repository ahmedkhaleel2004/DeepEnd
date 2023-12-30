import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface MainCardProps {
	title: string;
	description: string;
}

const MainCard = ({ title, description }: MainCardProps) => {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			onHoverStart={(e) => {}}
			onHoverEnd={(e) => {}}
		>
			<Card className="rounded-2xl">
				<Image
					src={`/${title.toLowerCase()}.png`}
					priority
					alt={title}
					width={500}
					height={70}
					className="rounded-t-2xl object-cover h-60"
				/>
				<CardContent className="h-auto p-5 rounded-b-xl">
					<CardTitle className="mb-2">{title}</CardTitle>
					<p>{description}</p>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default MainCard;
