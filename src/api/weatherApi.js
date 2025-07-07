import Axios from "axios";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

const convertDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
};

const getWeather = async ({ latitude, longitude, city }) => {
    // If city is provided, get coordinates first
    if (city) {
        const geoRes = await Axios.get(GEOCODING_API_URL, {
            params: { name: city, count: 1 }
        });
        if (
            geoRes.data &&
            geoRes.data.results &&
            geoRes.data.results.length > 0
        ) {
            latitude = geoRes.data.results[0].latitude;
            longitude = geoRes.data.results[0].longitude;
        } else {
            throw new Error("City not found");
        }
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const { data: weatherInfo } = await Axios.get(WEATHER_API_URL, {
        params: {
            latitude,
            longitude,
            current_weather: true,
            timezone: "Asia/Kolkata",
            daily: "temperature_2m_max,temperature_2m_min,weathercode",
            start_date: convertDate(startDate),
            end_date: convertDate(endDate),
        }
    });
    return weatherInfo;
};

export default getWeather;