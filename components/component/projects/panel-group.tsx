import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GitHubRepo } from "@/components/component/projects/grid-projects";

interface Props {
	repo: GitHubRepo;
}

export function PanelGroup(somethings: Props) {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="min-h-[200px] max-w-md rounded-lg border"
		>
			<ResizablePanel defaultSize={75}>
				<div className="flex h-full items-center justify-center p-6">
					{somethings.repo.description}
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
