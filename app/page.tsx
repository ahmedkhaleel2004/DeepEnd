"use client";

import React from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

const signInWithGithub = () => {
	signOut(auth)
		.then((result) => {
			console.log("working");
		})
		.catch((error) => {
			console.log(`not working`);
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GithubAuthProvider.credentialFromError(error);
			// ...
		});
};
const signout = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			console.log("working");
			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			const credential = GithubAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;

			// The signed-in user info.
			const user = result.user;
			// ...
		})
		.catch((error) => {
			console.log(`not working`);
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GithubAuthProvider.credentialFromError(error);
			// ...
		});
};

export default function Home() {
	return (
		<main>
			Hello benji!
			<br />
			<button onClick={signInWithGithub}>Sign in with GitHub</button>
			<br />
			<button onClick={signout}>Sign out</button>
		</main>
	);
}
