"use client";
import React, { useState, useEffect } from "react";
import styles from "./interactive.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomLocationSearch({ update }) {
  const [locationInput, setLocationInput] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Debounce function similar to the provided example
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  // Function to call the API
  const fetchLocations = async (query) => {
    try {
      const response = await fetch(
        "https://virtue-engine.vercel.app/getlocations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }
      );
      const data = await response.json();

      if (data && data.data.length > 0) {
        setDropdown(data.data);
        setDropdownVisible(true);
      } else {
        setDropdown([]);
        setDropdownVisible(false);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      setDropdownVisible(false);
    }
  };

  // Debounced version of fetchLocations
  const debouncedFetchLocations = debounce(fetchLocations, 50);

  const handleLocationInputChange = (e) => {
    const input = e.target.value;
    setLocationInput(input);
    if (input.length > 1) {
      debouncedFetchLocations(input);
    } else {
      setDropdown([]);
      setDropdownVisible(false);
    }
  };

  const selectLocation = (location) => {
    // Construct the display string with city, state (if available), and country
    const displayString = `${location.city}${
      location.state?.full ? `, ${location.state.full}` : ""
    }, ${location.country}`;
    setLocationInput(displayString);

    // Construct the object to pass to the update method
    const updateObject = {
      city: location.city,
      country: location.country,
    };

    // Conditionally add state and state_short if they exist
    if (location.state) {
      updateObject.state = location.state.full;
      updateObject.state_short = location.state.short;
    }

    update(updateObject);
    setDropdownVisible(false); // Optionally hide the dropdown after selection
  };

  return (
    <>
      <div className={styles.dropcontainer}>
        <input
          type="text"
          placeholder="Enter preferred city.."
          value={locationInput}
          onChange={handleLocationInputChange}
        />

        {dropdownVisible && dropdown.length > 0 && (
          <div className={styles.locdropdown}>
            {dropdown.map((loc, index) => (
              <button
                className={styles.locationItem}
                key={index}
                onClick={() => selectLocation(loc)}
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <p>
                  {loc.city}
                  {loc.state?.full ? `, ${loc.state.full}` : ""}, {loc.country}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
