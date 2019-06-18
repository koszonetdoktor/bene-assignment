import React, { useEffect, useState, Fragment } from "react"
import withBackNavigation from "../withBackNavigation"
import { RouteComponentProps } from "react-router-dom"
import axios from "../../../../utils/axios"
import { WeatherInfo } from "./types"
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
        <Fragment>
            {weatherInfo &&
                <div className="weather__container">
                    <div className="weather__info-block">
                        <i className="wi-day-sleet-storm">{weatherInfo.weather.stateIconId}</i>
                        <span>{weatherInfo.weather.description}</span>
                    </div>
                    <div className="weather__info-block weather__info-block--first-ordered">
                        <span className="weather__current-time">{moment.tz(props.timezone).format("HH")}</span>
                        <span className="weather__current-time">{moment.tz(props.timezone).format("mm")}</span>
                        <span className="waether__city-name">{props.cityName}</span>
                    </div>
                    <div className="weather__info-block">
                        <span className="weather__temp">{weatherInfo.temperature} &#8451;</span>
                        <span className="weather__end-time">{moment.unix(weatherInfo.sunriseTime).tz(props.timezone).format("HH:mm")}</span>
                        <span className="weather__end-time">{moment.unix(weatherInfo.sunsetTime).tz(props.timezone).format("HH:mm")}</span>
                    </div>
                </div>
            }
        </Fragment>
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