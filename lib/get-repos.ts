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
			return repositories.filter((repos: { size: number; }) => repos.size > 5);
		});
}
