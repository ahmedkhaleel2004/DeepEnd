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
    <Card className="h-[90vh] w-[80vh] overflow-y-auto">
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
      <CardContent className="flex flex-col justify-between md:h-[60vh] md:flex-row md:overflow-y-auto">
        {/* making the modal scrollable */}
        <div className="w-full">
          <div className="w-full md:w-1/2">
            <Label htmlFor="bullet-points">Bullet Points</Label>
          </div>
          <div className="list-disc space-y-8 ">
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
        <div className="flex w-full flex-col items-center md:w-1/2">
          <Image
            src={imageUrl || "/jbp.png"}
            alt="placeholder"
            priority
            width={200}
            height={200}
            className="m-4 h-64 w-64 rounded-3xl "
          />
          <Button onClick={handleRegenerateImg}>Regenerate image</Button>
          {isUpdatingImage && (
            <Modal isOpen={isUpdatingImage} handleClose={handleClose}>
              <Card className="flex flex-col items-center justify-center">
                <CardHeader>
                  <CardTitle>Regenerating Image</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <CardDescription>
                    Your repos image is being regenerated. This will take a few
                    seconds.
                  </CardDescription>
                  <div className="mt-8 h-16 w-16 animate-spin  rounded-full border-t-2 border-foreground" />
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
