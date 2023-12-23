import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";
import React from "react";

const Projects = () => {
	if (!auth.currentUser) {
		redirect("/");
	}

	return (
		<div>
			<h1>projects</h1>
		</div>
	);
};

export default Projects;
