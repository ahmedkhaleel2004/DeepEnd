import { signInWithGithub } from "./firebase";
import { getAdditionalUserInfo, GithubAuthProvider } from "@firebase/auth";
import { getUserData } from "./get-user-data";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { fetchUserRepositories } from "./get-repos";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function signInFunc(router: AppRouterInstance) {
	await signInWithGithub().then(async (result) => {
		if (result.user.uid) {
			// should always be true
			const user = await getUserData(result.user.uid);
			const additionalUserInfo = getAdditionalUserInfo(result);
			if (user) {
				if (user.doneSurvey) {
					router.push("/projects");
				} else {
					router.push("/survey");
				}
			} else {
				const accessToken =
					GithubAuthProvider.credentialFromResult(
						result
					)?.accessToken;
				setDoc(doc(db, "users", result.user.uid), {
					uid: result.user.uid,
					doneSurvey: false,
					photoURL: result.user.photoURL,
					email: result.user.email,
					name: result.user.displayName
						? result.user.displayName
						: additionalUserInfo?.username,
					accessToken: accessToken,
					repositories: await fetchUserRepositories(
						accessToken || ""
					),
				});
				router.push("/survey");
			}
		} else {
			throw new Error("User not signed in");
		}
	});
}
