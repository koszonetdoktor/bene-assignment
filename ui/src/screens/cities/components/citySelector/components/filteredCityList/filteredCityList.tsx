import React from "react"
import { FilterdCity } from "../../types";

interface Props {
    cities: FilterdCity[]
}

function FilteredCityList(props: Props) {
    return (
        <ul>
            {props.cities.map(city => {
                return (
                    <li key={city.geonameid}>
                        {city.name}
                    </li>
                )
            })}
        </ul>
    )
}
export default FilteredCityList