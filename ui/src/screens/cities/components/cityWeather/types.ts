export interface WeatherInfo {
    sunriseTime: number
    sunsetTime: number
    temperature: number
    stateIconId: number
}

export const defaultWeatherInfo: WeatherInfo = {
    sunriseTime: 0,
    sunsetTime: 0,
    temperature: 0,
    stateIconId: 0
}