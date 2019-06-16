import React, { Fragment } from "react"
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom"
import CitiesList from "./components/citiesList"
import CitySelector from "./components/citySelector"
import CityWeather from "./components/cityWeather"

function Cities(props: RouteComponentProps) {
    return (
        <Fragment>
            <Route exact path={props.match.path} component={CitiesList} />

            <Route path={`${props.match.path}/select`} component={CitySelector} />
            <Route path={`${props.match.path}/weather/:id`} component={CityWeather} />
        </Fragment>
    )
}
export default Cities