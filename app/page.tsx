"use client";

import React from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebase";

const signInWithGithub = () => {
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
		<div className="flex flex-col h-screen justify-center items-center">
			<div
				id="container"
				className="w-1/4 h-1/4 border-zinc-800 border-4 rounded-xl flex flex-col justify-center items-center gap-10"
			>
				<p className="text-3xl font-extrabold italic text-center">
					Welcome to Linus
				</p>
				<button
					onClick={signInWithGithub}
					className="w-1/2 h-1/4 border-zinc-800 border-2 rounded-xl hover:bg-zinc-800 hover:text-white transition duration-500 ease-in-out"
				>
					Sign in with GitHub
				</button>
			</div>
		</div>
	);
}
