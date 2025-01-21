import { provinces } from '@/constants/4AProvincesGeoJSON';
import { Polygon } from 'react-leaflet';
import { getColor } from '@/lib/utils';

export default function ProvinceMapLayer({sources, handleSetFilter, setSelectedLocation, setSelectedLocSourceCount}) {
  return (
		<>
		{
			provinces.features.map((province) => {
				var coordinates;
				// Polygon
				if(province.geometry.type === 'Polygon') coordinates = province.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = province.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				const sourceCount = sources?.filter( (item) => item.loc_province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())).length
				
				return (<Polygon
					pathOptions={{
						fillColor: getColor(sourceCount),
						// fillColor: '#168b46',
						fillOpacity: 0.7,
						weight: 2,
						opacity: 1,
						dashArray: 3,
						color: 'white'
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
							setSelectedLocation(province.properties.ADM2_EN)
							setSelectedLocSourceCount(sourceCount)
							handleSetFilter({
								id: 'province',
								value: province.properties.ADM2_EN.toLowerCase()
							})
						}
					}}
					key={province.properties.ADM2_EN}
				/>)
			})
		}
		</>
	)
}
