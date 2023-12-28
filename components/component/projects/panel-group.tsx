import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import axios from "axios";

export function PanelGroup() {
	interface Repo {
		id: number;
		name: string;
		// include other properties as needed
	}

	const [repos, setRepos] = useState([]);

	const getRepos = async () => {
		try {
			const response = await axios.get(
				"https://api.github.com/users/linusromland/repos"
			);
			setRepos(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	console.log(repos);

	useEffect(() => {
		getRepos();
	}, []);

	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="min-h-[200px] max-w-md rounded-lg border"
		>
			<ResizablePanel defaultSize={75}>
				<div className="flex h-full items-center justify-center p-6">
					{repos.map((repo: Repo) => (
						<span key={repo.id} className="font-semibold">
							{repo.name}
						</span>
					))}
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
