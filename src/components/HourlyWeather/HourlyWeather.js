import React from "react";
import classes from "./HourlyWeather.module.css";

function HourlyWeather(props) {
  const { offset, hourlyArray } = props;

  const formattedDailyArray = hourlyArray.slice(0, 24);
  console.log(formattedDailyArray);

  //calculate entered location time
  const getHour = (timestamp, timeDifference) => {
    const d = new Date(timestamp * 1000);
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const locationTime = utc + timeDifference * 1000;
    const locationDate = new Date(locationTime);
    const hour = locationDate.getHours();
    return hour;
  };

  let hourlyData = <p>Waiting...</p>;
  if (formattedDailyArray) {
    hourlyData = formattedDailyArray.map((element, index) => {
      return (
        <div className={classes.SingleHour} key={index}>
          <div className={classes.Time}>{getHour(element.dt, offset)}</div>
          <div>
            <img
              className={classes.Icon}
              src={` http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
              alt={element.weather[0].description}
            />
          </div>
          <div className={classes.Temprature}>{Math.round(element.temp)}°c</div>
          <div className={classes.FeelsLike}>
            Feels {Math.round(element.feels_like)}
          </div>
        </div>
      );
    });
  }

  return <div className={classes.Hourly}>{hourlyData}</div>;
}

export default HourlyWeather;
