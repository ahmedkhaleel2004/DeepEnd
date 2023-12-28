"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/component/navbars/navbar-large";
import SurveyQuestions from "@/components/component/survey/survey-questions";
import SurveyComplete from "@/components/component/survey/survey-complete";

const Survey = () => {
	const router = useRouter();
	const [surveyCompleted, setSurveyCompleted] = useState(false);

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
		<main className="max-w-2xl mx-auto">
			<Navbar projects={false} />
			{!surveyCompleted ? (
				<div className="mb-4 px-4">
					<h1 className="text-3xl font-bold">Survey</h1>
					<p>Please answer the following questions</p>
					<SurveyQuestions
						onSurveyComplete={() => setSurveyCompleted(true)}
					/>
				</div>
			) : (
				<SurveyComplete />
			)}
		</main>
	);
};

export default Survey;
