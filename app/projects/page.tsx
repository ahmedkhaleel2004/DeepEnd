"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

async function generateImageFromDescription(description: string) {
	const response = await fetch("/api/image", {
		method: "POST",
		body: JSON.stringify({ description: description }),
	});
	const url = await response.json();
	console.log(url);
	return url;
}

const Projects = () => {
	const router = useRouter();
	const userData = useAuth(router);

	console.log(userData?.repositories);

	return (
		<>
			<Button
				onClick={() =>
					generateImageFromDescription(
						userData?.repositories[2].description
					)
				}
			>
				Generate Image
			</Button>
			<div className="border flex flex-row w-full max-w-full">
				<NavbarLarge projects={true} />
			</div>
			<main className="p-12">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Projects</h1>
					<p>Choose a project to view</p>
				</div>
				<div className="max-w-[60%]">
					<GridContainer>
						{userData?.repositories?.map(
							(
								repository: {
									name: string;
									description: string;
								},
								index: React.Key | null | undefined
							) => (
								<GridItem
									key={index}
									title={repository.name}
									description={repository.description}
								/>
							)
						)}
					</GridContainer>
				</div>
			</main>
		</>
	);
};

export default Projects;
