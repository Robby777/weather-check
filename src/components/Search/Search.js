import React, { useState, useEffect } from "react";
import classes from "./Search.module.css";
/* global google */

function Search(props) {
  const initialCity = "";
  const autocompleteInput = React.createRef();
  let autocomplete = null;

  const [city, setCity] = useState(initialCity);  
  useEffect(() => {
    autocomplete = new google.maps.places.Autocomplete(autocompleteInput.current,{ types: ["(cities)"] });

    autocomplete.addListener("place_changed", handlePlaceChanged);
  }, []);

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    setCity(place.formatted_address);
  };

  const handleKeyPress = (event, city) => {
      if (event.key === "Enter") {
        props.searchHandler(city);
      } 
  }
 
  return (
    <div className={classes.SearchBox}>
      <input
        ref={autocompleteInput}
        id="autocomplete"
        className={classes.SearchBar}
        type="search"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress ={(e, city) => handleKeyPress(e, e.target.value)}
      />
      <button
        className={classes.Button}
        onClick={() => props.searchHandler(city)}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
