"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";
import { useAuth } from "@/lib/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import ListItem from "@/components/component/projects/list-item";

const recommended_projects = [
	{
		id: 1,
		title: "Project 1",
		description: "Description 1",
	},
	{
		id: 2,
		title: "Project 2",
		description: "Description 2",
	},
	{
		id: 3,
		title: "Project 3",
		description: "Description 3",
	},
	{
		id: 4,
		title: "Project 4",
		description: "Description 4",
	},
];

const projects = [
	{
		id: 1,
		title: "Py-Kemon GO!",
		description:
			"A Python command line recreation of the popular mobile game, Pokemon GO!",
		points: [
			"Python based",
			"Command line interface",
			"Recreation of Pokemon GO",
		],
		technology: ["Python", "CLI"],
	},
	{
		id: 2,
		title: "ParkFinder",
		description:
			"Scans parking lots with YOLOv8 and finds shortest routes using A* pathfinding.",
		points: ["Uses YOLOv8", "A* pathfinding", "Scans parking lots"],
		technology: ["YOLOv8", "A* pathfinding"],
	},
	{
		id: 3,
		title: "ShipSafe",
		description:
			"Ship navigation system simulating and presenting data from a buoy network at a glance.",
		points: [
			"Ship navigation system",
			"Simulates buoy network",
			"Presents data at a glance",
		],
		technology: ["Navigation Systems", "Data Simulation"],
	},
	{
		id: 4,
		title: "Dexterity-Dash",
		description:
			"A custom physical therapy solution for MS patients to improve hand mobility and remain active.",
		points: [
			"Physical therapy solution",
			"Improves hand mobility",
			"Helps MS patients remain active",
		],
		technology: ["Physical Therapy", "Mobility Improvement"],
	},
];

async function generateImageFromDescription(description: string) {
	const response = await fetch("/api/image", {
		method: "POST",
		body: JSON.stringify({ description: description }),
	});
	const url = await response.json();

	return url;
}

const Projects = () => {
	const router = useRouter();
	const userData = useAuth(router);

	return (
		<>
			<div className="border flex flex-row w-full max-w-full">
				<NavbarLarge projects={true} />
			</div>
			<main className="flex p-12">
				<div className="flex-col flex">
					<div className="mb-6">
						<h1 className="text-3xl font-bold">Projects</h1>
						<p>Choose a project to view</p>
					</div>
					<div className="max-w-full">
						<GridContainer>
							{projects.map((project, index) => (
								<GridItem
									key={index}
									title={project.title}
									description={project.description}
									points={project.points}
									technology={project.technology}
								/>
							))}
						</GridContainer>
					</div>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-12 bg-white dark:bg-zinc-700"
				/>
				<div className="flex-col flex min-w-max flex-grow">
					<div className="mb-6">
						<h1 className="text-3xl font-bold">
							Recommended Projects
						</h1>
						<p>Choose a project to view</p>
					</div>
					<div className="space-y-8">
						{recommended_projects.map((project, index) => (
							<ListItem
								key={index}
								title={project.title}
								description={project.description}
							/>
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Projects;
