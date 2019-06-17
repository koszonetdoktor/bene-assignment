import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import axios from "../../../../utils/axios"
import { City, defaultCity } from "../../types"
import FilteredCityList from "./components/filteredCityList"
import { connect } from "react-redux"
import { addCityToList } from "../../../../actions/listActions"
import withBackNavigation from "../withBackNavigation"
import "./index.css"

type Props = RouteComponentProps & {
    addCity: (city: City) => void
}

function CitySelector(props: Props) {
    const [city, setCity] = useState<City>(defaultCity)
    const [filteredCities, setFilteredCities] = useState<City[]>([])

    useEffect(() => {
        if (city.name !== "") {
            axios.get(`/city/${city.name}`)
                .then((resp) => {
                    setFilteredCities(resp.data)
                })
        } else {
            setFilteredCities([])
        }
    }, [city])

    const onCityNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity({
            geonameid: null,
            timezone: "",
            name: event.target.value
        })
    }

    const onSave = () => {
        props.addCity(city)
        props.history.goBack()
    }

    const onCitySelected = (selected: City) => () => {
        setCity(selected)
    }

    return (
        <div className="form__container">
            <div className="form__input-form">
                <input
                    className="form__text-input"
                    type="text"
                    autoFocus={true}
                    value={city.name}
                    onChange={onCityNameChanged}
                />
            </div>
            <FilteredCityList
                cities={filteredCities}
                onCitySelected={onCitySelected}
                currName={city.name}
            />
            <button
                className="btn "
                disabled={city.geonameid === null}
                onClick={onSave}
            >
                Save
            </button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCity: (city: City) => dispatch(addCityToList(city))
    }
}

export default connect(null, mapDispatchToProps)(withBackNavigation(CitySelector))