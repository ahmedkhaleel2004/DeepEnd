"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/component/navbar";

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
			<Navbar mainPage={false} />
			<div>
				<h1>projects</h1>
			</div>
		</>
	);
};

export default Projects;
