"use client";

import React, { useEffect } from "react";
import { InputForm } from "@/components/component/input-form";
import ProfileIcon from "@/components/component/profile-icon";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { signOutFunc } from "@/lib/firebase";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/component/navbar";

const Survey = () => {
	const router = useRouter();

	useEffect(() => {
		const checkAuthState = async () => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.data()?.doneSurvey) {
						router.push("/projects");
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
			<>
				<Navbar mainPage={false} />
				<Card className="p-4 flex w-[40vh]">
					<InputForm />
				</Card>
			</>
		</>
	);
};

export default Survey;
