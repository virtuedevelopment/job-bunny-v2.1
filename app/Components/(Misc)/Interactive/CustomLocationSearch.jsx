import React, { useState } from "react";
import styles from "./interactive.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default function CustomLocationSearch({ update }) {
  const [location, setLocation] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchPlaces = async (searchText) => {
    if (searchText.length > 2) {
      try {
        const params = new URLSearchParams({
          q: searchText,
          maxRows: 50,
          username: "virtuetechnologies",
          style: "FULL",
          featureClass: "P",
        });

        const response = await fetch(
          `http://api.geonames.org/searchJSON?${params}`
        );
        const data = await response.json();
        setDropdown(data.geonames || []);
        setDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching places:", error);
        setDropdown([]);
        setDropdownVisible(false);
      }
    } else {
      setDropdown([]);
      setDropdownVisible(false);
    }
  };

  // Wrapped fetchPlaces with debounce
  const debouncedFetchPlaces = debounce(fetchPlaces, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    debouncedFetchPlaces(value);
  };

  const setPreferredLocation = (loc) => {
    const state = loc.adminCodes1 ? loc.adminCodes1.ISO3166_2 : loc.adminName1;
    setLocation(`${loc.name}, ${state}, ${loc.countryName}`);
    update({ country: loc.countryName, state: state, city: loc.name });
    setDropdownVisible(false); // This ensures dropdown is not visible after selection
  };

  return (
    <>
      <div style={{ gridColumn: "1/-1" }} className={styles.container}>
        <div
          style={{ backgroundColor: "var(--main-white)" }}
          className="inputbox"
        >
          <span>
            <small>Enter preferred location</small>
            <input
              type="text"
              placeholder="Austin, TX, United States"
              value={location}
              onChange={handleChange}
            />
          </span>
          <FontAwesomeIcon icon={faLocationDot} />
        </div>

        {dropdownVisible && dropdown.length > 0 && (
          <div className={styles.dropdown}>
            {dropdown.map((qlocation) => (
              <button
                className={styles.locationItem}
                key={qlocation.geonameId}
                onClick={() => setPreferredLocation(qlocation)}
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{`${qlocation.name}, ${qlocation.adminName1}, ${qlocation.countryName}`}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
