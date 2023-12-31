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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { uploadUserRepoImg } from "@/lib/upload-user-repo-img";

interface GridItemProps {
	title: string;
	description: string;
	points: string[];
	languages: { [key: string]: string } | {};
}

const GridItem = ({ title, description, points, languages }: GridItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [editedPoints, setEditedPoints] = useState(points);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedDesc, setEditedDesc] = useState(description);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handlePointChange = (index: number, newValue: string) => {
		const updatedPoints = [...editedPoints];
		updatedPoints[index] = newValue;
		setEditedPoints(updatedPoints);
	};
	const handleTitleChange = (newTitle: string) => setEditedTitle(newTitle);
	const handleDescChange = (newDesc: string) => setEditedDesc(newDesc);

	const handleRegenerateImg = async () => {
		if (auth.currentUser) {
			const docRef = doc(db, "users", auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const userData = docSnap.data();
				const repositories = userData.repositories || [];
				const repoIndex = repositories.findIndex(
					(repo: { name: string }) => repo.name === title
				);

				await uploadUserRepoImg(
					repositories[repoIndex].name,
					repositories[repoIndex].description,
					repositories[repoIndex].points,
					auth.currentUser.uid,
					repoIndex
				);
			}
		}
	};

	const handleSave = async () => {
		// updates title, description, points
		if (auth.currentUser) {
			const docRef = doc(db, "users", auth.currentUser.uid);

			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const userData = docSnap.data();
					const repositories = userData.repositories || [];
					const repoIndex = repositories.findIndex(
						(repo: { name: string }) => repo.name === title
					);
					if (repoIndex !== -1) {
						const pointsString = JSON.stringify({
							bullet_points: editedPoints,
						});

						repositories[repoIndex].points = pointsString;
						repositories[repoIndex].name = editedTitle;
						repositories[repoIndex].description = editedDesc;
					} else {
						console.error("Specific repository not found");
					}

					await updateDoc(docRef, { repositories });
					console.log("Points updated successfully");
				} else {
					console.error("Document does not exist");
				}
			} catch (error) {
				console.error("Error updating points:", error);
			}
		}
		handleClose();
	};

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
								<div className="mb-2">
									<Label htmlFor="title">Title</Label>
									<Input
										value={editedTitle}
										onChange={(e) =>
											handleTitleChange(e.target.value)
										}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="description">
										Description
									</Label>
									<Input
										value={editedDesc}
										onChange={(e) =>
											handleDescChange(e.target.value)
										}
									/>
								</div>
							</CardHeader>
							<CardContent className="flex justify-between">
								<div className="w-full">
									<div className="mb-2">
										<Label htmlFor="bullet-points">
											Bullet Points
										</Label>
									</div>
									<div className="space-y-4">
										{editedPoints.map((point, index) => (
											<Input
												key={index}
												id={`point-${index}`}
												value={point}
												onChange={(e) => {
													handlePointChange(
														index,
														e.target.value
													);
												}}
											/>
										))}
									</div>
								</div>
								<div className="w-full flex flex-col items-center">
									<Image
										src="/jbp.png"
										alt="placeholder"
										priority
										width={200}
										height={200}
										className="rounded-3xl m-4 h-64 w-64"
									/>
									<Button onClick={handleRegenerateImg}>
										Regenerate image
									</Button>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Button variant="outline" onClick={handleClose}>
									Cancel
								</Button>
								<Button onClick={handleSave}>Save</Button>
							</CardFooter>
						</Card>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default GridItem;
