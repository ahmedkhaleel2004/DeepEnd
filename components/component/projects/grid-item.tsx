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
import { text } from "stream/consumers";

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
	const [repos, setRepos] = useState<Repository>({
		name: title,
		description: description,
		points: points,
	});
	const MAX_CHARS = 20; // this is for checking the amount of characters in the bullet points
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
	useEffect(() => {
		if (isOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// TODO: uncomment when bandiwth issue is fixed
	// im sorry but can you please bring this back

	// this is for splitting the bullet points into chunks of 50 characters each so that it can fit in the image
	const splitIntoLines = (text: string) => {
		const lines = [];

		for (let i = 0; i < text.length; i += MAX_CHARS) {
			lines.push(text.substring(i, (i += MAX_CHARS)));
		}
		return lines.join("<br />");
	};

	return (
		<>
			<motion.div whileHover={{ scale: 1.05 }}>
				<Card
					className="cursor-pointer bg-clip-padding bg-opacity-10 bg-gradient-to-br from-zinc-950 to-zinc-900"
					// this css is for the background gradient
					onClick={handleOpen}
				>
					<CardHeader className="flex m-5">
						<CardTitle>{repos?.name || title}</CardTitle>
						<CardDescription>
							{repos?.description || description}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-row justify-between ">
						<ul className="ml-2 list-disc flex-grow [&>li]:mt-2 space-y-8">
							{repos?.points.map((point, index) => (
								<li
									key={index}
									dangerouslySetInnerHTML={{
										__html: splitIntoLines(point),
									}}
								/>
							))}
						</ul>
						<Image
							src={imageUrl || "/jbp.png"}
							alt="placeholder"
							priority
							width={300}
							height={300}
							className="rounded-3xl m-2 mn-[300px] md:[400px] lg:[500px] xl:[600px] 2xl:[700px]"
						/>
					</CardContent>
					<CardFooter className="space-x-4  ">
						<Languages languages={languages} />
					</CardFooter>
				</Card>
			</motion.div>
			<AnimatePresence>
				{isOpen && (
					<Modal isOpen={isOpen} handleClose={handleClose}>
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
