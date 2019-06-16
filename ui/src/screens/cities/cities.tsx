import React from "react"
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom"
import CitiesList from "./components/citiesList"
import CitySelector from "./components/citySelector"

function Cities(props: RouteComponentProps) {
    return (
        <Router>
            <Route exact path={props.match.path} component={CitiesList} />
            <Route path={`${props.match.path}/select`} component={CitySelector} />
        </Router>
    )
}
export default Cities