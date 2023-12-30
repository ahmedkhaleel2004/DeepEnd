"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

const projects = [
	{
		id: 1,
		title: "Project 1",
		description: "This is a description of project 1",
	},
	{
		id: 2,
		title: "Project 2",
		description: "This is a description of project 2",
	},
	{
		id: 3,
		title: "Project 3",
		description: "This is a description of project 3",
	},
	{
		id: 4,
		title: "Project 4",
		description: "This is a description of project 4",
	},
];

async function generateImageFromDescription(description: string) {
	console.log("THE DESCRIPTION IS: ", description);
	const response = await fetch("/api/image", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ description }),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}

// if (docSnap.data()?.accessToken) {
// 	const accessToken = docSnap.data()?.accessToken;
// 	const repositories = await fetchUserRepositories(accessToken);
// 	console.log("THE REPOSITORIES ARE: ", repositories);
// 	const image = await generateImageFromDescription(
// 		repositories[5].description
// 	);
// 	console.log("THE IMAGE IS: ", image);
// }

const Projects = () => {
	const router = useRouter();
	const userData = useAuth(router);

	return (
		<>
			<Button onClick={() => generateImageFromDescription("a pizza")}>
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
						{projects.map((project, index) => (
							<GridItem
								key={index}
								title={project.title}
								description={project.description}
							/>
						))}
					</GridContainer>
				</div>
			</main>
		</>
	);
};

export default Projects;
