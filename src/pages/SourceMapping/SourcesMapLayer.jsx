import { CircleMarker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { divIcon, point } from "leaflet"

// function printChild (cluster) {

// }

export default function SourcesMapLayer({sources}) {

  const createClusterCustomIcon = (cluster) => {

		return new divIcon({
			html: `<span class='cluster-icon font-extrabold text-black bg-white rounded-lg'>${cluster.getChildCount()}</span>`,
			className: 'cluster-custom-icon',
			iconSize: point(33, 33, true)
		})
	}


  return (
		<>
			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={createClusterCustomIcon}
				className='text-semibold'
			>
			{
				// strains?.strains.map( (strain) => (
				sources?.map( (source) => (
					// I add random number so the strain don't overlap with each other
					<CircleMarker
						center={[(parseFloat(source?.loc_latitude)) + (Math.random() * (0.00009 - 0.000001) + 0.000001), (parseFloat(source?.loc_longitude)) + (Math.random() * (0.00009 - 0.000001) + 0.000001)]}
						radius={1.5}
						pathOptions={{ color: 'yellow', fillColor: 'yellow' }}
						key={source.id}
					>
						<Popup className="font-inter italic">
							{source.human_readable_id}
						</Popup>
						{/* {
							user?.user_level === 'ADMIN' ?
							(
								<Popup className="font-inter italic">
									{strain?.strain_name}
								</Popup>
							) : (
								null
							)
						} */}	
					</CircleMarker>
				))
			}
			</MarkerClusterGroup>
		</>
	)
}
