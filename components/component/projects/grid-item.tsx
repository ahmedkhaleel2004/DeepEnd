"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Modal from "@/components/component/projects/modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Languages from "./languages";

interface GridItemProps {
	title: string;
	description: string;
	points: string[];
	languages: { [key: string]: string } | {};
}

const GridItem = ({ title, description, points, languages }: GridItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<motion.div whileHover={{ scale: 1.05 }}>
				<Card className="cursor-pointer" onClick={handleOpen}>
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-between">
						<ul className="ml-6 list-disc [&>li]:mt-2">
							<li>{points[0]}</li>
							<li>{points[1]}</li>
							<li>{points[2]}</li>
						</ul>
						<Image
							src="/jbp.png"
							alt="placeholder"
							priority
							width={200}
							height={200}
							className="rounded-3xl"
						/>
					</CardContent>
					<CardFooter className="space-x-4">
						<Languages languages={languages} />
					</CardFooter>
				</Card>
			</motion.div>
			{isOpen && (
				<Modal>
					<Card>
						<CardHeader>
							<CardTitle>{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</CardHeader>
						<CardContent>Modal!</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button onClick={handleClose}>Done</Button>
						</CardFooter>
					</Card>
				</Modal>
			)}
		</>
	);
};

export default GridItem;
