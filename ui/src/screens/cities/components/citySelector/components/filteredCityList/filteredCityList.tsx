import React from "react"
import { City } from "../../types";

interface Props {
    cities: City[]
    onCitySelected: (selected: City) => () => void
}

function FilteredCityList(props: Props) {
    return (
        <ul>
            {props.cities.map(city => {
                return (
                    <li key={city.geonameid as number} onClick={props.onCitySelected(city)}>
                        {city.name}
                    </li>
                )
            })}
        </ul>
    )
}
export default FilteredCityList