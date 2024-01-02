"use client";

import React, { useEffect, useState } from "react";
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
import Languages from "./languages";
import { auth } from "@/lib/firebase";
import ModalContent from "./modal-content";
import {
	fetchImageUrl,
	findRepoIndex,
	updateRepository,
} from "@/lib/edit-projects";

interface GridItemProps {
	title: string;
	description: string;
	points: string[];
	languages: { [key: string]: string } | {};
	userData: any;
}

interface Repository {
	name: string;
	description: string;
	points: string[];
}

const GridItem = ({
	title,
	description,
	points,
	languages,
	userData,
}: GridItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [editedPoints, setEditedPoints] = useState(points);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedDesc, setEditedDesc] = useState(description);
	const [repos, setRepos] = useState<Repository>();
	const [imageUrl, setImageUrl] = useState("");
	const [isUpdatingImage, setIsUpdatingImage] = useState(false);

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
		setIsUpdatingImage(true);
		if (auth.currentUser && userData) {
			const repositories = userData.repositories || [];
			const repoIndex = findRepoIndex(repositories, title);
			const url = await fetchImageUrl(userData.uid, repoIndex);
			setImageUrl(url?.toString() || "");
		}
		setIsUpdatingImage(false);
	};

	const handleSave = async () => {
		// updates title, description, points
		if (auth.currentUser && userData) {
			const repositories = userData.repositories || [];
			const repoIndex = findRepoIndex(repositories, repos?.name || title);

			if (repoIndex !== -1) {
				const updatedRepositories = await updateRepository(
					repositories,
					repoIndex,
					editedTitle,
					editedDesc,
					editedPoints,
					auth.currentUser.uid
				);
				setRepos(updatedRepositories);
			} else {
				console.error("repo not found");
			}
		} else {
			console.error("user not found");
		}

		handleClose();
	};

	/* 	useEffect(() => { 
		const fetchImage = async () => {
			if (auth.currentUser && userData) {
				const repositories = userData.repositories || [];
				const repoIndex = findRepoIndex(repositories, title);
				const url = await fetchImageUrl(userData.uid, repoIndex);
				setImageUrl(url?.toString() || "");
			}
		};

		fetchImage();
	}, [title, description, points]); */

	// TODO: uncomment when bandiwth issue is fixed

	return (
		<>
			<motion.div whileHover={{ scale: 1.05 }}>
				<Card className="cursor-pointer" onClick={handleOpen}>
					<CardHeader>
						<CardTitle>{repos?.name || title}</CardTitle>
						<CardDescription>
							{repos?.description || description}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-between">
						<ul className="ml-6 list-disc flex-grow [&>li]:mt-2">
							<li>{points[0]}</li>{" "}
							{/* still need to update these values */}
							<li>{points[1]}</li>
							<li>{points[2]}</li>
						</ul>
						<Image
							src={imageUrl || "/jbp.png"}
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
						<ModalContent
							editedTitle={editedTitle}
							editedDesc={editedDesc}
							editedPoints={editedPoints}
							imageUrl={imageUrl}
							isUpdatingImage={isUpdatingImage}
							handleTitleChange={handleTitleChange}
							handleDescChange={handleDescChange}
							handlePointChange={handlePointChange}
							handleRegenerateImg={handleRegenerateImg}
							handleClose={handleClose}
							handleSave={handleSave}
						/>
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
};

export default GridItem;
