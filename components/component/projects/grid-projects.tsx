import { Button } from "@/components/ui/button";
import {
	Grid,
	Container,
	Modal,
	TextInput,
	MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { PanelGroup } from "./panel-group";

export default function GridProjects(props: any) {
	// know which project is open
	const [open, setOpen] = useState(false);
	interface Project {
		title: string;
		description: string;
		// include other properties as needed
	}
	// know which project is current
	const [currentProject, setCurrentProject] = useState<Project>({
		title: "",
		description: "",
	});
	// is there an error?
	const [isError, setIsError] = useState(false);

	const updateProject = (data: any) => {
		return null;
	};

	const deleteProject = (data: any) => {
		return null;
	};

	return (
		<MantineProvider>
			<Container>
				<Modal
					opened={open}
					onClose={() => setOpen(false)}
					title="Edit Project"
				>
					{/* these will be the project label */}
					<TextInput
						label="Project Name"
						value={currentProject.title}
						onChange={(event) =>
							setCurrentProject({
								...currentProject,
								title: event.target.value,
							})
						}
					/>
					{/* these will be the project details of prject */}
					<TextInput
						label="Description"
						value={currentProject.description}
						onChange={(event) =>
							setCurrentProject({
								...currentProject,
								description: event.target.value,
							})
						}
					/>
					{/* this will decide which project the user is looking at*/}
					<Button
						style={{
							margin: "auto",
							background: "linear-gradient(to right, teal, cyan)",
						}}
						variant="outline"
						onClick={() => {
							updateProject(currentProject);
							setOpen(false);
						}}
					>
						Update Project
					</Button>
				</Modal>
				<div
					style={{
						flexDirection: "row",
						width: "100%",
					}}
				>
					{isError ? (
						<Alert title="Error!" color="red">
							<p>There was an error with your request.</p>
						</Alert>
					) : null}

					{/* this will create projects of the user based on the data from the database */}
					<Grid mt={10} /* this needs to have one of the features*/>
						{props.projects && props.projects.length > 0
							? props.projects.map(function (project: any) {
									return (
										<MantineProvider>
											<Grid.Col
												key={project.id}
												span={{
													base: 12,
													xl: 4,
													lg: 4,
													md: 6,
													sm: 6,
													xs: 12,
												}}
												onClick={() =>
													setCurrentProject(project)
												}
											>
												<PanelGroup />
											</Grid.Col>
										</MantineProvider>
									);
							  })
							: null}
					</Grid>
				</div>
			</Container>
		</MantineProvider>
	);
}
