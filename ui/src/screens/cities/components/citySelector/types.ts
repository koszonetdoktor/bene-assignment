export interface City {
    geonameid: number | null
    name: string
}

export const defaultCity: City = {
    geonameid: null,
    name: ""
}