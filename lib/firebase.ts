import { initializeApp, getApps, getApp } from "firebase/app";
import {
	signInWithPopup,
	GithubAuthProvider,
	getAuth,
	signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// import { getAdditionalUserInfo } from "@firebase/auth";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// github provider
const provider = new GithubAuthProvider();

export const auth = getAuth();

provider.addScope("repo"); // add more scopes here

export const signOutFunc = () => {
	return new Promise<void>((resolve, reject) => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				resolve();
			})
			.catch((error) => {
				// An error happened.
				reject(error);
			});
	});
};

export const signInWithGithub = () => {
	return new Promise<any>((resolve, reject) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// Sign in successful.
				// This gives you a GitHub Access Token. You can use it to access the GitHub API.
				const credential =
					GithubAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;

				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// getAdditionalUserInfo(result)
				// ...

				// Resolve the promise with the result object
				resolve(result);
			})
			.catch((error) => {
				// Sign in failed.
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential =
					GithubAuthProvider.credentialFromError(error);
				// ...

				// Reject the promise with the error
				reject(error);
			});
	});
};

export const db = getFirestore(app);
export const storage = getStorage();
