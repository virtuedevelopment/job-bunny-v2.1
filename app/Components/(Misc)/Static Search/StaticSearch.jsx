"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./staticS.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function StaticSearch() {
  const { data, status } = useSession();
  const [search, setSearch] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();
  const sendToRoute = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const effectiveSearch = encodeURIComponent(search);

    if (data && data.user) {
      router.push(`/dashboard/search?search=${effectiveSearch}`);
    } else {
      router.push("/signup");
    }
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  const debouncedApiCall = debounce(async (input) => {
    try {
      const response = await fetch(
        "https://jobbunnyapi.com/jobbunnyapi/v1/title_autocomplete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "yourEmail@example.com",
            title_prefix: input,
          }),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setAutocompleteSuggestions(data.data);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching job title suggestions:", error);
    }
  }, 30); // Adjust debounce time as needed
  const selectSuggestion = (suggestion) => {
    if (data && data.user) {
      router.push(`/dashboard/search?search=${suggestion}`);
    } else {
      router.push("/signup");
    }
  };
  const setSearchValue = (value) => {
    const searchValue = typeof value === "string" ? value : value.target.value;
    setSearch(searchValue);

    if (searchValue.length > 1) {
      debouncedApiCall(searchValue);
    } else if (search === "") {
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
    } else {
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
    }
  };

  return (
    <form onSubmit={sendToRoute} className={styles.inputbox}>
      <div className={styles.input}>
        <input
          onChange={setSearchValue}
          type="text"
          name="search"
          value={search}
          placeholder="Search.."
        />

        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {showDropdown && autocompleteSuggestions.length > 0 && (
        <div className={styles.dropdown}>
          {autocompleteSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => selectSuggestion(suggestion, e)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
