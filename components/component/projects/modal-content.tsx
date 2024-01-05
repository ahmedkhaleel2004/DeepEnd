import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import Modal from "./modal";

interface ModalContentProps {
	editedTitle: string;
	editedDesc: string;
	editedPoints: string[];
	imageUrl: string;
	isUpdatingImage: boolean;
	handleTitleChange: (newTitle: string) => void;
	handleDescChange: (newDesc: string) => void;
	handlePointChange: (index: number, newValue: string) => void;
	handleRegenerateImg: () => void;
	handleClose: () => void;
	handleSave: () => void;
}

const ModalContent = ({
	editedTitle,
	editedDesc,
	editedPoints,
	imageUrl,
	isUpdatingImage,
	handleTitleChange,
	handleDescChange,
	handlePointChange,
	handleRegenerateImg,
	handleClose,
	handleSave,
}: ModalContentProps) => {
	// making viewport smaller to fit the modal
	return (
		<Card className="w-[80vh] h-[90vh] overflow-y-auto">
			<CardHeader>
				<div className="mb-2">
					<Label htmlFor="title" className="font-style">
						Title
					</Label>
					<Input
						value={editedTitle}
						onChange={(e) => handleTitleChange(e.target.value)}
					/>
				</div>
				<div className="mb-2">
					<Label htmlFor="description">Description</Label>
					<Input
						value={editedDesc}
						onChange={(e) => handleDescChange(e.target.value)}
					/>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col md:flex-row justify-between md:h-[60vh] md:overflow-y-auto">
				{/* making the modal scrollable */}
				<div className="w-full">
					<div className="w-full md:w-1/2">
						<Label htmlFor="bullet-points">Bullet Points</Label>
					</div>
					<div className="space-y-8 list-disc ">
						{editedPoints.map((point, index) => (
							<Input
								key={index}
								id={`point-${index}`}
								value={point}
								onChange={(e) => {
									handlePointChange(index, e.target.value);
								}}
							/>
						))}
					</div>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-center">
					<Image
						src={imageUrl || "/jbp.png"}
						alt="placeholder"
						priority
						width={200}
						height={200}
						className="rounded-3xl m-4 h-64 w-64 "
					/>
					<Button onClick={handleRegenerateImg}>
						Regenerate image
					</Button>
					{isUpdatingImage && (
						<Modal
							isOpen={isUpdatingImage}
							handleClose={handleClose}
						>
							<Card className="flex flex-col items-center justify-center">
								<CardHeader>
									<CardTitle>Regenerating Image</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col items-center justify-center">
									<CardDescription>
										Your repos image is being regenerated.
										This will take a few seconds.
									</CardDescription>
									<div className="mt-8 w-16 h-16 border-t-2  border-foreground rounded-full animate-spin" />
								</CardContent>
							</Card>
						</Modal>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleSave}>Save</Button>
			</CardFooter>
		</Card>
	);
};

export default ModalContent;
