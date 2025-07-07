import { convertToFahrenheit ,getWeatherType} from "../WeatherUtil";
const dateFormat = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
});
const formatDate = (date) => dateFormat.format(date);
const WeatherRow = ({ weather: {date, maxTemperature, minTemperature, weatherCode } ,isCelsius}) => {
    return (
        <tr>
            <td>{formatDate(date)}</td>
            <td>H: {isCelsius ? `${maxTemperature} °C` : `${convertToFahrenheit(maxTemperature)} °F`} {" "}- L: {isCelsius ? `${minTemperature} °C` : `${convertToFahrenheit(minTemperature)} °F`}</td>
            <td>{getWeatherType(weatherCode)}</td>
        </tr>
    );
};

export default WeatherRow;
