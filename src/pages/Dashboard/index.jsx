import { Grid } from "@mui/material";
import Statistics from "./Statistics";
import SourceMap from "@/pages/SourceMapping";

export default function Dashboard() {
	return (
		<div className='px-10 py-20'>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h1 className='text-6xl font-bold'>Cave Microbiome Database</h1>
				</Grid>
				<Grid item xs={12}>
					<Statistics />
				</Grid>
				<Grid item xs={12}>
					<SourceMap />
				</Grid>
			</Grid>
		</div>
	)
}
