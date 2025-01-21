import { municities } from '@/constants/4AMunicitiesGeoJSON';
import { Polygon } from 'react-leaflet';
import { getColor } from '@/lib/utils';

export default function MunicitiesMapLayer({sources, handleSetFilter, setSelectedLocation, setSelectedLocSourceCount}) {
  return (
		<>
		{
			municities.features.map((municity) => {
				var coordinates;
				// Polygon
				if(municity.geometry.type === 'Polygon') coordinates = municity.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = municity.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				// const strainCount = strains?.filter( (item) => item.municity?.toLowerCase().includes(muncity.properties.ADM3_EN.toLowerCase()) && item.province?.toLowerCase().includes(muncity.properties.ADM2_EN.toLowerCase())).length
				const sourceCount = sources?.filter( (item) => municity.properties.ADM3_EN.toLowerCase().includes(item.loc_city?.toLowerCase()) && municity.properties.ADM2_EN.toLowerCase().includes(item.loc_province?.toLowerCase())).length

				return (<Polygon
					pathOptions={{
						fillColor: getColor(sourceCount),
						// fillColor: '#168b46',
						fillOpacity: 0.7,
						weight: 2,
						opacity: 1,
						dashArray: 3,
						color: 'green'
					}}
					positions={coordinates}
					eventHandlers={{
						click: (e) => {
							const layer = e.target;
							layer.setStyle({
								dashArray: '',
								weight: 2,
								opacity: 1,
								color: 'black',
							})
							setSelectedLocation(municity.properties.ADM3_EN)
							setSelectedLocSourceCount(sourceCount)
							handleSetFilter({
								id: 'municity',
								value: municity.properties.ADM3_EN.toLowerCase()
							})
						},
					}}
					key={municity.properties.ADM2_EN + municity.properties.ADM3_EN}
				/>)
			})
		}
		</>
	)
}
