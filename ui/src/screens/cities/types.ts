export interface City {
    geonameid: number | null
    name: string
    timezone: string
}

export const defaultCity: City = {
    geonameid: null,
    name: "",
    timezone: ""
}