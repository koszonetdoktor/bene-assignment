import * as types from "../actions/actionTypes"

export interface State {
    citiesList: any[]
}

const defaultState: State = {
    citiesList: ["alam"]
};

export default function citiesListReducer(state: State = defaultState, action: any): State {
    console.log("update", action)
    switch (action.type) {
        case types.GET_CITIES_SUCCESS:
            return {
                citiesList: action.payload
            }
        default:
            return state
    }
}