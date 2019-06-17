import React, { useEffect } from "react"
import { connect } from "react-redux"
import { State } from "../../../../reducers"
import { RouteComponentProps } from "react-router-dom"
import { getCitiesList } from "../../../../actions/listActions"
import { City } from "../../types"
import "./index.css"

type Props = RouteComponentProps & {
    userCities: City[],
    getCitiesList: () => void
}

function CitiesList(props: Props) {
    useEffect(() => {
        if (props.userCities.length === 0) {
            props.getCitiesList()
        }
    }, [props.userCities])

    const onAddNewCity = () => {
        props.history.push(`${props.match.url}/select`)
    }

    const onSelectCity = (cityId: number | null) => () => {
        console.log("mathc", props.match)
        props.history.push(`${props.match.path}/weather/${cityId}`)
    }

    const renderCities = () => {
        return props.userCities.map(userCity => {
            return (
                <li
                    className="cities__city-name"
                    key={userCity.geonameid as number}
                    onClick={onSelectCity(userCity.geonameid)}
                >
                    {userCity.name}
                </li>
            )
        })
    }

    return (
        <ul className="cities__list">
            {renderCities()}
            <li
                className="cities__add-city"
                key="plus"
                onClick={onAddNewCity}
            >
                +
            </li>
        </ul>
    )
}

const mapStateToProps = (store: State) => {
    return {
        userCities: store.citiesList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCitiesList: () => {
            dispatch(getCitiesList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList)