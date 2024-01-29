import { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = String(import.meta.env.VITE_API_KEY);

  const getWeather = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setWeatherData({
          temperature: data.main.temp,
          cityName: data.name,
          country: data.sys.country,
          icon: data.weather[0].icon,
          cloud: data.clouds.all,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          pressure: data.main.pressure,
        });
        setError("");
      } else {
        setError(`Error: ${data.message}`);
        setWeatherData(null);
      }
    } catch (error) {
      setError("Error while fetching weather data");
      setWeatherData(null);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim() === "") {
      setError("Please enter a city");
    } else {
      getWeather();
      setCity("");
    }
  };

  return (
    <div className=" w-full min-h-[100vh]">
      {/* body */}
      <div className="flex flex-col items-center px-10 py-12 font-mono rounded-md">
        {/* header and Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold text-center text-tertiary-color">
            React-Weather
          </h1>
          <TiWeatherPartlySunny size={100} className="text-tertiary-color/80" />
        </div>

        {/* form */}
        <div className="mt-8">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              value={city}
              type="text"
              placeholder="Enter City...."
              className="text-secondary-color placeholder:text-secondary-color border-[1px] border-tertiary-color/70 w-full outline-none rounded-sm px-5 py-2 "
              onChange={handleCityChange}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-tertiary-color to-secondary-color">
              submit
            </button>
          </form>
        </div>

        {/* output */}
        {/* error */}
        {error && (
          <p className="w-1/3 px-3 py-2 mx-auto mt-6 text-center text-white rounded-md bg-red-400/90 lg:w-1/4">
            {error}
          </p>
        )}
        {/* output data */}
        {weatherData && (
          <div className="w-2/3 px-10 mt-20 text-gray-800 rounded-lg bg-gradient-to-r to-primary-color from-tertiary-color lg:w-1/2 py-14 ">
            <div className="flex items-center justify-around text-xl ">
              <div>
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
                  className="w-20 h-20"
                  alt="Image"></img>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-xl tracking-wider">
                  {weatherData.country} &mdash;
                </p>
                <p className="text-xl tracking-wider">{weatherData.cityName}</p>
              </div>
            </div>
            <p className="mt-10 text-center text-8xl">
              {weatherData.temperature}&deg;c
            </p>

            <div className="flex flex-col gap-6 mt-20">
              <div className="flex items-center justify-around text-xl">
                <p>Clouds: {weatherData.cloud}%</p>
                <p>Humidity: {weatherData.humidity}%</p>
              </div>
              <div className="flex items-center justify-around text-xl">
                <p>Wind: {weatherData.wind}m/s</p>
                <p>Pressure: {weatherData.pressure}hpa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
