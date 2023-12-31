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
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Languages from "./languages";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
						<ul className="ml-6 list-disc flex-grow [&>li]:mt-2">
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
							className="rounded-3xl m-4 h-64 w-64"
						/>
					</CardContent>
					<CardFooter className="space-x-4">
						<Languages languages={languages} />
					</CardFooter>
				</Card>
			</motion.div>
			<AnimatePresence>
				{isOpen && (
					<Modal>
						<Card className="w-[80vh]">
							<CardHeader>
								<CardTitle>{title}</CardTitle>
								<CardDescription>{description}</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-between">
								<div className="w-full">
									<div className="mb-2">
										<Label htmlFor="bullet-points">
											Bullet Points
										</Label>
									</div>
									<div className="space-y-4">
										{points.map((point, index) => (
											<Input
												key={index}
												id={`point-${index}`}
												value={point}
												onChange={() => {}}
											/>
										))}
									</div>
								</div>
								<Image
									src="/jbp.png"
									alt="placeholder"
									priority
									width={200}
									height={200}
									className="rounded-3xl m-4 h-64 w-64"
								/>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" onClick={handleClose}>
									Cancel
								</Button>
								<Button onClick={handleClose}>Save</Button>
							</CardFooter>
						</Card>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default GridItem;
