"use client";

import React, { useState, useEffect } from "react";
import { InputForm } from "@/components/component/input-form";
import ProfileIcon from "@/components/component/profile-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { signOutFunc } from "@/lib/firebase";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Survey = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.data()?.doneSurvey) {
						router.push("/projects");
					} else if (!docSnap.data()?.doneSurvey) {
						setLoading(false);
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

	const handleSignOut = async () => {
		console.log("onclick sign out: ", auth.currentUser);
		await signOutFunc().then(() => {
			// if no errors then push to home page
			router.push("/");
		});
	};

	if (loading) {
		return <div>Loading...</div>; // Or replace with a loading spinner
	}

	return (
		<>
			<div className="flex justify-between items-center pr-4 pt-4">
				<div>Logo</div>
				<ProfileIcon onSignOut={handleSignOut} />
			</div>
			<Card className="p-4 flex w-[40vh]">
				<InputForm />
			</Card>
		</>
	);
};

export default Survey;
