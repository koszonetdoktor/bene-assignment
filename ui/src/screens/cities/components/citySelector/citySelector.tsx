import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import axios from "../../../../utils/axios"
import { FilterdCity } from "./types";
import FilteredCityList from "./components/filteredCityList";

function CitySelector(props: RouteComponentProps) {
    const [cityName, setCityName] = useState<string>("")
    const [filteredCities, setFilteredCities] = useState<FilterdCity[]>([])

    useEffect(() => {
        if (cityName !== "") {
            axios.get(`/city/${cityName}`)
                .then((resp) => {
                    setFilteredCities(resp.data)
                })
        } else {
            setFilteredCities([])
        }
    }, [cityName])

    const onNavigateBack = () => {
        props.history.goBack()
    }

    const onCityNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value)
    }

    const onSave = () => {
        console.log("save")
    }

    return (
        <div>
            <span onClick={onNavigateBack} >{"<"}</span>
            <form>
                <label>
                    <input
                        type="text"
                        autoFocus={true}
                        value={cityName}
                        onChange={onCityNameChanged}
                    />
                </label>
            </form>
            <FilteredCityList cities={filteredCities} />
            <button onClick={onSave}>Save</button>
        </div>
    )
}
export default CitySelector