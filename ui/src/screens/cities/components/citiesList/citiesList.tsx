import React, { useEffect } from "react"
import { connect } from "react-redux"
import { State } from "../../../../reducers"
import { RouteComponentProps } from "react-router-dom"
import { getCitiesList } from "../../../../actions/listActions"
import { UserCity } from "./types"

type Props = RouteComponentProps & {
    userCities: UserCity[],
    getCitiesList: () => void
}

function CitiesList(props: Props) {
    useEffect(() => {
        props.getCitiesList()
    }, [])

    const onAddNewCity = () => {
        props.history.push(`${props.match.url}/select`)
    }

    const renderCities = () => {
        return props.userCities.map(userCity => {
            return (
                <li key={userCity.city_id}>
                    {userCity.city_id}
                </li>
            )
        })
    }

    return (
        <ul>
            {renderCities()}
            <li
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