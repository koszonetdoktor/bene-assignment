import * as types from "../actions/actionTypes"

export interface State {
    citiesList: any[] //TODO
}

const defaultState: State = {
    citiesList: []
};

export default function citiesListReducer(state: State = defaultState, action: any): State {
    console.log("update", action)
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