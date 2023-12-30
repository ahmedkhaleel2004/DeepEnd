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

interface GridItemProps {
	title: string;
	description: string;
}

const GridItem = ({ title, description }: GridItemProps) => {
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
					<CardContent>
						<Image
							src="/jbp.png"
							alt="placeholder"
							priority
							width={200}
							height={200}
						/>
					</CardContent>
				</Card>
			</motion.div>
			{isOpen && (
				<Modal>
					<Card>
						<CardHeader>
							<CardTitle>Modal: {title}</CardTitle>
							<CardDescription>
								Modal: {description}
							</CardDescription>
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
