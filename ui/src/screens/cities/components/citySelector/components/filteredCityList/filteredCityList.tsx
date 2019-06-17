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
                // const splitter = new RegExp(props.currName, "gi")
                // const splitName = cutName.split(splitter)
                return (
                    <li
                        className="selector__list-element"
                        key={city.geonameid as number}
                        onClick={props.onCitySelected(city)}
                    >
                        {cutName}
                        {/* {splitName[0]}<span>{props.currName}</span>{splitNanew RegExp(replace,"g")me[1]} */}
                    </li>
                )
            })}
        </ul>
    )
}
export default FilteredCityList