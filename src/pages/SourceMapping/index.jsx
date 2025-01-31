import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from "react"
import axios from "axios"
import ProvinceMapLayer from "@/pages/SourceMapping/ProvinceMapLayer"
import MunicitiesMapLayer from "@/pages/SourceMapping/MunicitiesMapLayer"
import SourcesMapLayer from "@/pages/SourceMapping/SourcesMapLayer"
import CavePositionLayer from "@/pages/SourceMapping/CavePositionLayer"

export default function SourceMap() {
	const [data, setData] = useState([])
	const [selectedLocation, setSelectedLocation] = useState('')
	const [selectedLocSourceCount, setSelectedLocSourceCount] = useState('')

	useEffect(() => {
		axios.get(axios.defaults.baseURL + '/source/view/all/').then((res) => {
			setData(res.data)
		})
	}, [])

	return (
		<div className="bg-white p-5 rounded-md">
			<div className=' items-center rounded-sm justify-center'>
				{
					selectedLocation ? 
						<>
							<span className='text-base font-semibold text-foreground'>{selectedLocation}</span>
							<span className='text-base text-foreground ml-2'> {selectedLocSourceCount} sample sources</span>
						</>
					:
					<span className='text-base font-semibold text-foreground'>Click an area</span>
				}
			</div>
			<MapContainer center={[14.1651, 121.2402]} zoom={8} zoomControl className='rounded-sm'>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<LayersControl position="topright">
					<LayersControl.Overlay name='Center'>
					<Marker position={[14.1651, 121.2402]} >
							<Popup>
								Center
							</Popup>
						</Marker>
					</LayersControl.Overlay>
					<LayersControl.Overlay name='Province Heat Map'>
						<LayerGroup>
							<ProvinceMapLayer 
								checked
								sources={data} 
								setSelectedLocation={setSelectedLocation} 
								setSelectedLocSourceCount={setSelectedLocSourceCount} 
							/>
						</LayerGroup>
					</LayersControl.Overlay>
					
					<LayersControl.Overlay checked name='Muncities Heat Map'>
						<LayerGroup>
							<MunicitiesMapLayer sources={data} setSelectedLocation={setSelectedLocation} setSelectedLocSourceCount={setSelectedLocSourceCount} />
						</LayerGroup>	
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name='Cave Positions'>
						<LayerGroup>
							<CavePositionLayer />
						</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name='Sources'>
						<LayerGroup>
							<SourcesMapLayer sources={data} />
						</LayerGroup>
					</LayersControl.Overlay>
				</LayersControl>
			</MapContainer>
		</div>
	)
}
