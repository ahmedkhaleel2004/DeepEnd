export async function fetchUserRepositories(accessToken: string) {
	return fetch("https://api.github.com/user/repos", {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	})
		.then((response) => response.json())
		.then((repositories) => {
			if (repositories.message) {
				throw new Error(repositories.message);
			}
			return repositories
				.filter((repos: { size: number }) => repos.size > 5)
				.map(async (repo: any) => {
					return {
						...repo,
						readme: await getReadme(repo.contents_url, accessToken),
					};
				});
		});
}

async function getReadme(contents_url: string, accessToken: string) {
	try {
		const response = await fetch(
			contents_url.replace("{+path}", "README.md"),
			{
				headers: {
					Authorization: `token ${accessToken}`,
				},
			}
		);

		if (!response.ok) {
			return "No README available for this repository.";
		}

		const readme = await response.json();
		console.log("response from getReadme: ", readme);

		return readme;
	} catch (error) {
		console.error("Error fetching README: ", error);
		return "Error fetching README.";
	}
}
