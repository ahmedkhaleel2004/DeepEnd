import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // import your firebase auth instance
import { getUserData } from "@/lib/get-user-data"; // import your getUserData function
import type { DocumentData } from "firebase/firestore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useAuth(
	router: AppRouterInstance,
	forChatbot: boolean = false
) {
	const [userData, setUserData] = useState<DocumentData | undefined>(
		undefined
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userData = await getUserData(user.uid);
				setUserData(userData);
				if (userData && userData.doneSurvey && !forChatbot) {
					router.push("/projects");
				} else if (userData && !userData.doneSurvey) {
					router.push("/survey");
				}
			} else {
				setUserData(undefined);
				router.push("/");
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [router, forChatbot]);

	return userData;
}
