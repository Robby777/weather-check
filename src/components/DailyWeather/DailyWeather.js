import React from "react";
import classes from "./DailyWeather.module.css";

function DailyWeather(props) {
  const { dailyArray } = props;

  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dailyData = <p>Waiting...</p>;

  if (props.dailyArray) {
    dailyData = dailyArray.map((element, index) => {
      let d = new Date(element.dt * 1000); // to get the DateTime.
      let dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
      
      return (
        <div className={classes.SingleDay} key={index}>
          <div>{dayName}</div>
          <div>
            <img
              className={classes.Icon}
              src={` http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
              alt={element.weather[0].description}
            />
          </div>
          <div className={classes.TempratureDay}>
            Day {Math.round(element.temp.day)}°c
          </div>
          <div className={classes.TempratureNight}>
            Night {Math.round(element.temp.night)}°c
          </div>
        </div>
      );
    });
  }

  return <div className={classes.Daily}>{dailyData}</div>;
}

export default DailyWeather;
