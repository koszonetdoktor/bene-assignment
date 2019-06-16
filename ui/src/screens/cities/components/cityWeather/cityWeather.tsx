import React from "react"
import withBackNavigation from "../withBackNavigation";

function CityWeather(props) {
    return (
        <h1>{JSON.stringify(props)}</h1>
    )
}
export default withBackNavigation(CityWeather)