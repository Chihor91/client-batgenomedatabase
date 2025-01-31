import { Grid } from "@mui/material";
import Statistics from "./Statistics";
import SourceMap from "@/pages/SourceMapping";
import { Separator } from "@/components/ui/separator";

export default function Home() {
	return (
		<div className='h-[95vh]'>
			<div className="pl-10 flex flex-col bg-home bg-fixed text-white w-full lg:p-0 h-[60%] justify-center">
				<div className="text-[calc(5vw+10px)] font-extrabold">
					<h1 className="font-title text-nowrap">Cave Microbiome</h1>
					<h1 className="font-title mt-[calc(-4vw-5px)]">Database</h1>
				</div>
				<div className="text-[calc(1vw+20px)]">
					<h1 className="font-title-desc">
						Culture Collection Information System for Cave Microorganisms
					</h1>
				</div>
			</div>
			<div className="mx-[30px] md:mx-[100px] md:h-[35%] overflow-y-hidden mt-[50px] md:mt-[100px]">
				<div className="mx-20 mr-10 flex flex-col space-y-10 md:flex-row md:space-y-0 lg:mx-0">
					<div className="max-w-full md:max-w-[50%]">
						<span className="lg:mx-[50px] text-justify inline-block">
							The <span className="font-semibold">Cave Microbiome Database</span> is a culture collection information system developed 
							by the <span className="font-semibold">UPLB Museum of Natural History (UPLB-MNH)</span> for storage of microbiological and
							demographic information of cave microorganisms sampled from various caves in the Philippines under the
							<span className="font-semibold"> NICER CAVES</span> Program.
						</span>
					</div>
					<Separator orientation="vertical" className="hidden md:block mx-10 h-auto" />
					<Separator className="block md:hidden" />
					<Statistics />
				</div>
			</div>
			<div className="bg-[#e1ebd6] flex flex-col py-10 pl-20 pr-[calc(5vw+10px)]">
				<label className="text-left font-title text-3xl">Source Mapping</label>
				<SourceMap />
			</div>
			{/* <Grid container spacing={3}>
				<Grid item xs={12}>
					<h1 className='text-6xl font-bold'>Cave Microbiome Database</h1>
				</Grid>
				<Grid item xs={12}>
					<Statistics />
				</Grid>
				<Grid item xs={12}>
					<SourceMap />
				</Grid>
			</Grid> */}
		</div>
	)
}
