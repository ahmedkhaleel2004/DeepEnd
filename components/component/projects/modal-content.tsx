import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

interface ModalContentProps {
	editedTitle: string;
	editedDesc: string;
	editedPoints: string[];
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
	handleTitleChange,
	handleDescChange,
	handlePointChange,
	handleRegenerateImg,
	handleClose,
	handleSave,
}: ModalContentProps) => {
	return (
		<Card className="w-[80vh]">
			<CardHeader>
				<div className="mb-2">
					<Label htmlFor="title">Title</Label>
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
			<CardContent className="flex justify-between">
				<div className="w-full">
					<div className="mb-2">
						<Label htmlFor="bullet-points">Bullet Points</Label>
					</div>
					<div className="space-y-4">
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
	);
};

export default ModalContent;
