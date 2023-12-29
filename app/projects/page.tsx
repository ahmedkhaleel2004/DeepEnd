"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import GridContainer from "@/components/component/projects/grid-container";
import GridItem from "@/components/component/projects/grid-item";

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

async function fetchUserRepositories(accessToken: string) {
	return fetch("https://api.github.com/user/repos", {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	})
		.then((response) => response.json())
		.then((repositories) => {
			if (repositories.message) {
				throw new Error(repositories.message);
			}
			return repositories;
		});
}

const Projects = () => {
	const router = useRouter();

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (!docSnap.data()?.doneSurvey) {
						router.push("/survey");
					}
					if (docSnap.data()?.accessToken) {
						const accessToken = docSnap.data()?.accessToken;
						const repositories = await fetchUserRepositories(
							accessToken
						);
						console.log("THE REPOSITORIES ARE: ", repositories);
					}
				} else {
					router.push("/");
				}
			});

			// Cleanup subscription on unmount
			return () => unsubscribe();
		};

		checkAuthState();
	}, [router]);

	return (
		<>
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
