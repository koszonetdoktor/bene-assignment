import React, { useEffect, useState } from "react"
import withBackNavigation from "../withBackNavigation"
import { RouteComponentProps } from "react-router-dom"
import axios from "../../../../utils/axios"
import { WeatherInfo, defaultWeatherInfo } from "./types"
import moment from "moment-timezone"
import { connect } from "react-redux"
import { State } from "../../../../reducers";

type Props = RouteComponentProps<{ id: string }> & {
    timezone: string
    cityName: string
}

function CityWeather(props: Props) {

    const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)

    useEffect(() => {
        axios.get(`/weather/${props.match.params.id}`)
            .then((resp) => {
                setWeatherInfo(resp.data)
            }).catch(err => {
                console.error("ERROR", err)
            })
    }, [])

    return (
        <div>
            {weatherInfo &&
                <div>
                    <span>Rise: {moment.unix(weatherInfo.sunriseTime).tz(props.timezone).format("HH:mm")}</span>
                    <span>Set: {moment.unix(weatherInfo.sunsetTime).tz(props.timezone).format("HH:mm")}</span>
                    <span>Current: {moment.tz(props.timezone).format("HH:mm")}</span>
                    <span>Temperature: {weatherInfo.temperature}</span>
                    <span>Name: {props.cityName}</span>
                    <span>ICon: {weatherInfo.stateIconId}</span>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (store: State, ownProps: Props) => {
    const chosenCity = store.citiesList.find(city => city.geonameid === Number(ownProps.match.params.id))
    return {
        timezone: chosenCity ? chosenCity.timezone : "",
        cityName: chosenCity ? chosenCity.name : ""
    }
}

export default connect(mapStateToProps)(withBackNavigation(CityWeather))