import { useState, useEffect } from "react";
import WeatherSummary from "../components/WeatherSummary";
import WeatherRow from "../components/WeatherRow";
import getWeather from "../api/weatherApi";

const fetchCoardinates = (callback) => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        callback({ latitude, longitude });
    }, (err) => console.error(err));
};

const WeatherPage = () => {
    const [todayWeather, setTodayWeather] = useState({});
    const [weekWeather, setWeekWeather] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true);
    const [city, setCity] = useState(""); // New state for city input
    const isDay = todayWeather.isDay ?? true;

    useEffect(() => {
        fetchCoardinates(async ({ latitude, longitude }) => {
            const weatherInfo = await getWeather({ latitude, longitude });
            convertStateVariable(weatherInfo);
        });
    }, []);

    const fetchWeatherByCity = async () => {
        if (!city) return;
        const weatherInfo = await getWeather({ city });
        convertStateVariable(weatherInfo);
    };

    const convertStateVariable = (tempWeekWeather) => {
        let fetchedWeatherInfo = [];
        for (let i = 0; i < tempWeekWeather.daily.time.length; i++) {
            fetchedWeatherInfo.push({
                date: new Date(tempWeekWeather.daily.time[i]),
                maxTemperature: tempWeekWeather.daily.temperature_2m_max[i],
                minTemperature: tempWeekWeather.daily.temperature_2m_min[i],
                weatherCode: tempWeekWeather.daily.weathercode[i]
            });
        }
        setWeekWeather(fetchedWeatherInfo);
        let currentWeather = tempWeekWeather.current_weather;
        currentWeather.time = new Date(currentWeather.time);
        currentWeather.isDay = currentWeather.is_day === 1 ? true : false;
        delete currentWeather.is_day;
        currentWeather.weatherCode = currentWeather.weathercode;
        delete currentWeather.weathercode;
        setTodayWeather(currentWeather);
    };

    return (
        <div className={isDay ? "app" : "app dark"}>
            <h1 className="my-heading">Weather Page</h1>
            <div style={{ marginBottom: "2rem" }}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    style={{ marginRight: "1rem", padding: "0.5rem" }}
                />
                <button className="ui button primary" onClick={fetchWeatherByCity}>
                    Get Weather
                </button>
            </div>
            <button className="ui icon button" onClick={() => {
                setIsCelsius(!isCelsius);
            }}
                style={{ float: "right" }}>{isCelsius ? "°F" : "°C"}</button>
            <div>
                <WeatherSummary currentWeather={todayWeather} isCelsius={isCelsius} />
                <table className={`ui very basic table dark ${!isDay ? " dark" : ""}`}>
                    <thead className={`table-custom ${!isDay ? " dark" : ""}`}>
                        <tr>
                            <th>Date</th>
                            <th>Temperature</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody className="table-custom dark">
                        {weekWeather.map((weather) => (
                            <WeatherRow
                                weather={weather}
                                isCelsius={isCelsius}
                                key={weather.date}
                            />
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default WeatherPage;