import React from "react"
import { City } from "../../../../types";

interface Props {
    cities: City[]
    currName: string
    onCitySelected: (selected: City) => () => void
}

function FilteredCityList(props: Props) {
    return (
        <ul className="selector__filtered-list">
            {props.cities.map(city => {
                const cutName = city.name.length > 20 ? `${city.name.substring(0, 17)}...` : city.name
                return (
                    <li
                        className="selector__list-element"
                        key={city.geonameid as number}
                        onClick={props.onCitySelected(city)}
                    >
                        {cutName}
                    </li>
                )
            })}
        </ul>
    )
}
export default FilteredCityList