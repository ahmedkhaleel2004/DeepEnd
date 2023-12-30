"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";
import { useAuth } from "@/lib/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import ListItem from "@/components/component/projects/list-item";
import { getLanguages } from "@/lib/get-repos";

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
	const [languages, setLanguages] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		const fetchLanguages = async () => {
			if (userData && userData.repositories) {
				const fetchPromises = userData.repositories
					.map((repo: { languages_url: string; name: any }) =>
						repo.languages_url
							? getLanguages(
									repo.languages_url,
									userData.accessToken
							  ).then((langData) => ({
									name: repo.name,
									langData,
							  }))
							: null
					)
					.filter((p: null) => p !== null); // filters out null promises

				const results = await Promise.all(fetchPromises);
				const newLanguages = results.reduce(
					// reduces the array of objects into a single object
					(acc, { name, langData }) => {
						acc[name] = langData;
						return acc;
					},
					{}
				);

				setLanguages(newLanguages);
			}
		};

		fetchLanguages();
	}, [userData]);

	console.log(languages);

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
							{userData?.repositories.map(
								(repository: any, index: number) => (
									<GridItem
										key={index}
										title={repository.name}
										description={repository.description}
										points={["", "", ""]}
										languages={
											languages[repository.name] || {}
										}
									/>
								)
							)}
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
