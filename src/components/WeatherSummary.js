import { convertToFahrenheit ,getWeatherType} from "../WeatherUtil";
const WeatherSummary = ({currentWeather: {temperature, weatherCode}, isCelsius}) => {
    return (
        <div>
            <h1>{isCelsius ? `${temperature} °C` : `${convertToFahrenheit(temperature)} °F`} | {getWeatherType(weatherCode)}</h1>
        </div>
    )
}
export default WeatherSummary;