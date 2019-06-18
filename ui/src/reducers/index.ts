import * as types from "../actions/actionTypes"
import { City } from "../screens/cities/types";

export interface State {
    citiesList: City[]
}

const defaultState: State = {
    citiesList: []
};

export default function citiesListReducer(state: State = defaultState, action: any): State {
    switch (action.type) {
        case types.GET_CITIES_SUCCESS:
            return {
                citiesList: action.payload
            }
        case types.GET_CITIES_FAIL:
        //TODO
        case types.ADD_CITY_TO_LIST_FAIL:
        //TODO
        case types.ADD_CITY_TO_LIST_SUCCESS:
            return {
                ...state,
                citiesList: [...state.citiesList, action.payload]
            }
        default:
            return state
    }
}