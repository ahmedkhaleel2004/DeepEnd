import { access } from "fs";

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
export async function getLanguages(url: string, accessToken: string) {
	// returns an object of all languages and their %'s in a repo
	const response = await fetch(url, {
		headers: {
			Authorization: `token ${accessToken}`,
		},
	});
	const data = await response.json();

	const totalBytes: any = Object.values(data).reduce(
		(a: any, b: any) => a + b,
		0
	);

	const percentages = Object.entries(data).reduce(
		(result: { [key: string]: string }, [language, bytes]) => {
			result[language] =
				(((bytes as number) / totalBytes) * 100).toFixed(1) + "%";
			return result;
		},
		{}
	);

	return percentages;
}
