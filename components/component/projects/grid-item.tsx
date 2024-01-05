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
	const [repos, setRepos] = useState<Repository>({
		name: title,
		description: description,
		points: points,
	});
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

	return (
		<>
			<motion.div whileHover={{ scale: 1.05 }}>
				<Card
					className="cursor-pointer bg-clip-padding bg-opacity-10 bg-gradient-to-br from-zinc-900 to-zinc-950"
					onClick={handleOpen}
				>
					<CardHeader className="flex m-10 ">
						<CardTitle>{repos?.name || title}</CardTitle>
						<CardDescription>
							{repos?.description || description}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row justify-between ">
						<ul className="ml-6 list-decimal flex-grow [&>li]:mt-2 overflow-auto max-h-64 space-y-8 ">
							<li>{repos?.points[0]}</li>
							<li>{repos?.points[1]}</li>
							<li>{repos?.points[2]}</li>
						</ul>
						<Image
							src={imageUrl || "/jbp.png"}
							alt="placeholder"
							priority
							width={200}
							height={200}
							className=" rounded-3xl m-1"
						/>
					</CardContent>
					<CardFooter className="space-x-4 ">
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
