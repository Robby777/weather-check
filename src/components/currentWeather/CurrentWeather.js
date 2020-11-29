import React from "react";
import classes from "./CurrentWeather.module.css";
import DateBuilder from "../Date/DateBuilder";

function CurrentWeather(props) {
  return (
    <div className={classes.MainWeather}>
      <div className={classes.City}>{props.city}</div>
      <DateBuilder />
      <div className={classes.WeatherBox}>
        <div className={classes.Temprature}>{props.temp}°c</div>
        <div className={classes.Description}>{props.description}</div>
      </div>
    </div>
  );
}

export default CurrentWeather;
