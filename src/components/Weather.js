import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import CurrentWeather from "./currentWeather/CurrentWeather";
import DailyWeather from "./DailyWeather/DailyWeather";
import HourlyWeather from "./HourlyWeather/HourlyWeather"
import Search from "./Search/Search";
import Spinner from "./UI/Spinner/Spinner";

const openWeatherApi = {
  key: "d35e402b048cb2663404ed86638280ac",
  base: "https://api.openweathermap.org/data/2.5/",
};

const googleApi = {
  key: "AIzaSyBlM9D82-QKQbZ4bsxkfxs7ygX48Qhp2jM",
};

function Weather() {
  const initialCoordinates = {
    latitude: "",
    longitude: "",
  };

  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (coordinates.latitude !== "" && coordinates.longitude !== "") {
      axios
        .get(
          `${openWeatherApi.base}onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude={minutely}&units=metric&appid=${openWeatherApi.key}
      `
        )
        .then((res) => {
          console.log(res);
          setWeather(res.data);
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&result_type=locality&key=${googleApi.key}`
            )
            .then((result) => {
              console.log(result);
              setCity(result.data.results[0].address_components[0].long_name);
            })
            .catch((error) => console.log(error));
        });
    }
  }, [coordinates.longitude, coordinates.latitude]);

  const convertCity = async (city) => {
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleApi.key}`
      )
      .then((res) => {
        setCoordinates({
          latitude: res.data.results[0].geometry.location.lat,
          longitude: res.data.results[0].geometry.location.lng,
        });
      });
  };
  

  let weatherComponent = <Spinner />;

  if (weather) {
    weatherComponent = (
      <Fragment>
        <CurrentWeather
          city={city}
          temp={Math.round(weather.current.temp)}
          description={weather.current.weather[0].main}
        />
        <HourlyWeather timestamp={weather.current.dt} offset={weather.timezone_offset} hourlyArray={weather.hourly}/>
        <DailyWeather dailyArray={weather.daily}/>
      </Fragment>
    );
  }

  return (
    <div>
      <Search searchHandler={convertCity} />
      {weatherComponent}
    </div>
  );
}

export default Weather;
