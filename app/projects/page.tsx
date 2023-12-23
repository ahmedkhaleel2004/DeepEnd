"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const Projects = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoading(false);
			} else {
				router.push("/");
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
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
