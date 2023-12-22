"use client";

import React from "react";
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

const signInWithGithub = async () => {
	try {
		const result = await signInWithPopup(auth, provider);
		console.log("working");

		// This gives you a GitHub Access Token. You can use it to access the GitHub API.
		const credential = GithubAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;

		// user info
		const user = result.user;
	} catch (err) {
		console.error(err);
	}
};
const logout = async () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
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
