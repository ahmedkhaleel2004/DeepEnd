import { Button } from "@/components/ui/button";
import {
	navigationMenuTriggerStyle,
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { PanelGroup } from "./panel-group";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Card } from "@/components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
export interface GitHubRepo {
	id: string;
	name: string;
	description: string;
	title: string;
	// Add other properties as needed
}

export default function GridProjects() {
	interface Project {
		id: string;
		title: string;
		description: string;
		name: string;
		// include other properties as needed
	}

	// know which project is open
	// is there an error?
	// know which project is current
	const [open, setOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const [currentProject, setCurrentProject] = useState<Project>({
		title: "",
		description: "",
		id: "",
		name: "",
	});
	// fetch data from database and store it in repositories
	const [repositories, setRepositories] = useState<GitHubRepo[]>([]);

	// get data from database
	const fetchRepositories = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const db = getFirestore();
			const userDocRef = doc(db, "users", user.uid);
			try {
				const userDoc = await getDoc(userDocRef);
				if (userDoc.exists()) {
					const userData = userDoc.data();
					const userRepositories =
						userData.repositories as GitHubRepo[];
					setRepositories(userRepositories);
				} else {
					console.log("No such document!");
				}
			} catch (error) {
				console.error("Error fetching repositories:", error);
				setIsError(true);
			}
		}
	};

	useEffect(() => {
		fetchRepositories();
	});

	// update project
	const updateProject = async (project: Project) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const db = getFirestore();
			const userDocRef = doc(db, "users", user.uid);
			try {
				await updateDoc(userDocRef, {
					repositories: repositories.map((repo) => {
						if (repo.id === project.id) {
							return project;
						} else {
							return repo;
						}
					}),
				});
				fetchRepositories();
			} catch (error) {
				console.error("Error updating project:", error);
				setIsError(true);
			}
		}
	};

	const [user, loading, error] = useAuthState(getAuth());

	console.log("Loading: ", loading, "User: ", user, "Error: ", error);

	return <div>hello</div>;
}
