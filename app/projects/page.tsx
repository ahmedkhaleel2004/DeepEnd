"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Projects = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.data()?.doneSurvey) {
						setLoading(false);
					} else if (!docSnap.data()?.doneSurvey) {
						router.push("/survey");
					} else {
						console.log("error");
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

	if (loading) {
		return <div>Loading...</div>; // Or replace with a loading spinner
	}

	return (
		<div>
			<h1>projects</h1>
		</div>
	);
};

export default Projects;
