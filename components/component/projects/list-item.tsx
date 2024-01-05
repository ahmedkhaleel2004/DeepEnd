import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Modal from "@/components/component/projects/modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ListItemProps {
	title: string;
	description: string;
}

const ListItem = ({ title, description }: ListItemProps) => {
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
						Try this out!
					</CardContent>
				</Card>
			</motion.div>
			{isOpen && (
				<Modal isOpen={isOpen} handleClose={handleClose}>
					<Card>
						<CardHeader>
							<CardTitle>Modal: (Recommended) {title}</CardTitle>
							<CardDescription>
								Modal: (Recommended) {description}
							</CardDescription>
						</CardHeader>
						<CardContent>(Recommended) Modal!</CardContent>
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

export default ListItem;
