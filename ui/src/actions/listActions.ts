import axios from "../utils/axios"
import * as types from "./actionTypes"
import { Dispatch } from "redux";

export const getCitiesList = () => (dispatch: Dispatch) => {
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