import { Grid } from "@mantine/core";
import { PanelGroup } from "@/components/component/panel-group";

export const ConstructGridLayout = () => {
	return (
		<Grid>
			<Grid.Col span={4}>
				<PanelGroup />
			</Grid.Col>
			<Grid.Col span={4}>2</Grid.Col>
			<Grid.Col span={4}>3</Grid.Col>
			<Grid.Col span={4}>4</Grid.Col>
		</Grid>
	);
};
