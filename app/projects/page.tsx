"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NavigationMenuDemo } from "@/components/component/navbar-projects";
import Navbar from "@/components/component/navbar";
import { Card } from "@/components/ui/card";
import { PanelGroup } from "@/components/component/panel-group";
import { ConstructGridLayout } from "@/components/component/grid-layout-projects";

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
		<>
			<main>
				<Navbar mainPage={false} />
			</main>

			<ConstructGridLayout />
		</>
	);
};

export default Projects;
