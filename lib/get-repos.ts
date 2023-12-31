var base64 = require("base-64");
var utf8 = require("utf8");

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
			return Promise.all(
				repositories
					.filter((repos: { size: number }) => repos.size > 5)
					.map(async (repo: any) => {
						// this already runs in parallel by default
						const readme_data = await getReadme(
							repo.contents_url,
							accessToken
						);
						const points = await getPoints(readme_data);
						const newRepo = {
							...repo,
							readme_base64: readme_data,
							points: points,
						};
						return newRepo;
					})
			);
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
			return base64.encode("No README found.");
		}

		const readme = await response.json();

		return readme.content;
	} catch (error) {
		console.error("Error fetching README: ", error);
		return "Error fetching README.";
	}
}

async function getPoints(readme_base64: string) {
	const readmeBytes = base64.decode(readme_base64);
	const readme = utf8.decode(readmeBytes);
	const response = await fetch("/api/points", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ readme }),
	});
	const points = await response.json();
	return points;
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
