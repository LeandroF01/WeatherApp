import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faCloud,
  faArrowsDownToLine,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const CardWeather = ({ lon, lat }) => {
  const [weather, setWeather] = useState();
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [iconName, seticonName] = useState(null);
  const [renderBackground, setRenderBackground] = useState(null);

  useEffect(() => {
    if (lon) {
      const APIKey = "33287d2047917202340a1c32864cceae";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
            farenheit: `${Math.round(
              ((res.data.main.temp - 273.15) * 9) / 5 + 32
            )} ºF`,
          };
          seticonName(res.data.weather[0].icon);
          if (iconName !== null) {
            const dayClear = ["01d"];
            const dayClouds = ["02d", "03d", "03n", "10d", "04d"];
            const dayThunderstorm = ["10d", "11d", "11n"];
            const daySnowMist = ["13d", "13n", "50d", "50n"];
            const nightDay = ["01n", "02n", "04n", "09n", "10n"];

            dayClear.forEach((e) => {
              if (e === iconName) {
                setRenderBackground("day-clear");
              }
            });
            dayClouds.forEach((e) => {
              if (e === iconName) {
                setRenderBackground("day-clouds");
              }
            });
            dayThunderstorm.forEach((e) => {
              if (e === iconName) {
                setRenderBackground("day-thunderstorm");
              }
            });
            daySnowMist.forEach((e) => {
              if (e === iconName) {
                setRenderBackground("day-snow-mist");
              }
            });
            nightDay.forEach((e) => {
              if (e == iconName) {
                setRenderBackground("night-day");
              }
            });
          }
          setTemperture(temp);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [lon, lat, iconName]);

  const toggleCLick = () => setIsCelsius(!isCelsius);
  console.log(weather);
  console.log(renderBackground);
  console.log(iconName);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section className={`section-main ${renderBackground}`}>
        <article className={`article__cointainer-card ${renderBackground}`}>
          <h1 className="card__title">Weather App</h1>
          <h3 className="card__text-description">{`${weather?.name}, ${weather?.sys.country}`}</h3>
          <div className="card__container-image">
            <img
              src={
                weather &&
                `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
          <h4 className="card__description-text-clim">
            &#34;{weather?.weather[0].description}&#34;
          </h4>
          <ul className="card__container-list">
            <li>
              <FontAwesomeIcon icon={faWind} />
              <span className="span-card">Pressure </span>
              <span>Wind Speed </span>
              {weather?.wind.speed} m/s
            </li>
            <li>
              <FontAwesomeIcon icon={faCloud} />
              <span className="span-card">Clouds </span>
              {weather?.clouds.all} %
            </li>
            <li>
              <FontAwesomeIcon icon={faArrowsDownToLine} />
              <span className="span-card">Pressure </span>
              {weather?.main.pressure} hPa
            </li>
          </ul>
          <h3 className="card__text-temp">
            {isCelsius ? temperture?.celsius : temperture?.farenheit}
          </h3>
          <button className="card__button-temp" onClick={toggleCLick}>
            <span>{isCelsius ? "Change to ºF" : "Change to ºC"}</span>
          </button>
          <div className="wave w1"></div>
          <div className="wave w2"></div>
        </article>
      </section>
    );
  }
};

export default CardWeather;
