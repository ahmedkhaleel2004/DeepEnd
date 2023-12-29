"use client";

import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PanelGroup } from "@/components/component/projects/panel-group";
import GridProjects from "@/components/component/projects/grid-projects";
import NavbarLarge from "@/components/component/navbars/navbar-large";
import { Panel } from "react-resizable-panels";

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
		<main>
			<div className="border flex flex-row w-full max-w-full">
				<NavbarLarge projects={true} />
			</div>
			<div>
				<h1 className="text-3xl font-bold">Projects</h1>
				<p>Choose a project to view </p>
			</div>
			<div className="flex flex-row">
				<GridProjects />
			</div>
		</main>
	);
};

export default Projects;
