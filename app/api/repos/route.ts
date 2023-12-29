import type { NextApiRequest, NextApiResponse } from "next";
import { createGitHubClient } from "@/lib/create-github-client";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	if (!req.query) {
		return res.status(400).json({ error: "Bad Request" });
	}
	const accessToken = req.query.accessToken;

	console.log("MY FRIEND!!! THE ACCESS TOKEN I GOT IS: ", accessToken);

	if (!accessToken || typeof accessToken !== "string") {
		return res
			.status(401)
			.json({ error: "No access token provided or it's not a string" });
	}

	try {
		const githubClient = createGitHubClient(accessToken); // Ensure accessToken is of type string
		const response = await githubClient.repos.listForAuthenticatedUser();
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch repositories" });
	}
}
