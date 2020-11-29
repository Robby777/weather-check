import React from 'react'
import classes from "./DateBuilder.module.css";

function DateBuilder() {

    const dateFormat = (d) => {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
      };

// let date = String(new window.Date());
// date= date.slice(3, 15);

// let today = new Date().toDateString();

    return (
        <div className={classes.Date}>
            {dateFormat(new Date())}
        </div>
    )
}

export default DateBuilder;
