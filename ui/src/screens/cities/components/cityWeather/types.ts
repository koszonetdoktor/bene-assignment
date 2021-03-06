export interface WeatherInfo {
    sunriseTime: number
    sunsetTime: number
    temperature: number
    weather: {
        stateIconId: number
        description: string
    }
}

export const defaultWeatherInfo: WeatherInfo = {
    sunriseTime: 0,
    sunsetTime: 0,
    temperature: 0,
    weather: {
        stateIconId: 0,
        description: ""
    }
}