import axios from "../utils/axios"
import * as types from "./actionTypes"
import { City } from "../screens/cities/components/citySelector/types";

export const getCitiesList = () => (dispatch) => {
    axios.get("/users/cities")
        .then((resp) => {
            dispatch({
                type: types.GET_CITIES_SUCCESS,
                payload: resp.data
            })
        }).catch(err => {
            dispatch({
                type: types.GET_CITIES_FAIL
            })
        })
}

export const addCityToList = (city: City) => (dispatch) => {
    axios.post("/users/cities", {
        cityId: city.geonameid
    })
        .then(() => {
            dispatch({
                type: types.ADD_CITY_TO_LIST_SUCCESS,
                payload: city
            })
        }).catch(err => {
            dispatch({
                type: types.ADD_CITY_TO_LIST_FAIL
            })
        })
}