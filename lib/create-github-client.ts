import { Octokit } from "@octokit/rest";

export function createGitHubClient(accessToken: string) {
	return new Octokit({ auth: accessToken });
}
