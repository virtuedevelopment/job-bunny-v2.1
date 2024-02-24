"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "@/app/loading";
import styles from "./search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import JobDisplay from "@/app/Components/(Misc)/Object Displays/JobDisplay";

//set filter options
const boards = ["Indeed", "LinkedIn", "Glassdoor"];
const experience = [
  "Internship",
  "Entry level",
  "Associate",
  "Mid-Senior level",
  "Director",
  "Executive",
];
const job_type = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Volunteer",
  "Internship",
  "Other",
];
const job_type_cat = ["On-site", "Hybrid", "Remote"];
const salary = [
  20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000,
  120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000,
  210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000,
  300000,
];

export default function Search() {
  const { data, status } = useSession();
  const [jobs, setJobs] = useState([]); //job list
  const [filters, setFilters] = useState({
    job_site: null,
    experience: null,
    job_type: null,
    job_type_cat: null,
    visa_sponsored: null,
    date_range: null,
    min_salary: 0,
  });
  const [search, setSearch] = useState(""); //search value
  const [previousSearch, setPreviousSearch] = useState(""); // for research and adding more to the list
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const count = 30;

  const checkKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getResults();
    }
  };

  const getResults = async (e) => {
    setIsLoading(true); // Start loading state

    // Always treat the search as a new search
    setAutocompleteSuggestions([]);
    setShowDropdown(false);
    setJobs([]); // Clear current jobs list to start fresh
    setStart(0); // Reset pagination start index for the search

    // Check if the search query is empty
    if (search === "") {
      setError("Please Enter a search");
      setIsLoading(false); // Stop loading due to error (empty search query)
      return; // Early return to prevent further execution
    }

    // Prepare API request
    const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/job_search";

    // Filter out null or undefined values from filters
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && !Number.isNaN(value)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      job_title: search,
      start: 0, // Always start from the beginning for every search
      count: count,
      filters: activeFilters,
    };

    // Execute API request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // Process response from the API
    if (response.status === 200) {
      const responseData = await response.json();
      if (responseData.data.length > 0) {
        // Set jobs to the newly fetched jobs
        setJobs(responseData.data);
        setPreviousSearch(search); // Update the previous search state
        setIsLoading(false); // Stop loading after successfully fetching jobs
      } else {
        setIsLoading(false); // Stop loading when no data is returned
      }
    } else {
      setError("Failed to fetch jobs"); // Handle non-200 responses
      setIsLoading(false); // Ensure loading is stopped on error
    }
  };

  const addResults = async (e) => {
    setIsLoading(true);

    // Prepare API request

    setStart(jobs.length);
    const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/job_search";

    // Filter out null or undefined values from filters
    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && !Number.isNaN(value)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      job_title: search,
      start: start, //set to the length of the current list so it can add more to the list
      count: count,
      filters: activeFilters,
    };

    // Execute API request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // Process response from the API
    if (response.status === 200) {
      const responseData = await response.json();
      if (responseData.data.length > 0) {
        // Append new jobs to the existing list
        setJobs((prevJobs) => [...prevJobs, ...responseData.data]);
        setPreviousSearch(search); // Update the previous search state
        setIsLoading(false); // Stop loading after successfully fetching jobs
      } else {
        setIsLoading(false); // Stop loading when no data is returned
      }
    } else {
      setError("There was a problem getting more jobs"); // Handle non-200 responses
      setIsLoading(false); // Ensure loading is stopped on error
    }
  };

  const setFilterValue = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        name === "min_salary" || name === "date_range"
          ? value === "" || value === "null"
            ? null
            : parseInt(value, 10)
          : value === "null"
          ? null
          : value,
    }));
  };
  const setSearchValue = (value) => {
    const searchValue = typeof value === "string" ? value : value.target.value;
    setSearch(searchValue);
    setError("");

    if (searchValue.length > 1) {
      debouncedApiCall(searchValue);
    } else {
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
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
    console.log(search)
    setSearch(suggestion); // Update the search state
    setShowDropdown(false); // Close the dropdown
    getResults(); // Optionally trigger the search immediately
  };

  return (
    <main className={styles.main}>
      {/* SEARCH BAR NATIVE */}
      <section className={styles.searchBox}>
        <div style={{ animationDelay: "0.5s" }} className={styles.inputBox}>
          <span>
            <input
              onChange={setSearchValue}
              onBlur={() => getResults()}
              onKeyDown={checkKey}
              type="text"
              name="search"
              placeholder="Search..."
              value={search}
            />
            <small className="error">{error && error}</small>
          </span>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.icon}
            onClick={getResults}
          />
        </div>

        {/* Filters */}
        <div style={{ animationDelay: "0.75s" }} className={styles.inputBox}>
          <span className={styles.filterSpan}>
            <small>Filters</small>
            <div>
              <select name="job_site" onChange={setFilterValue}>
                <option value={null}>Select Job Board</option>
                {boards.map((board) => (
                  <option key={board} value={board}>
                    {board}
                  </option>
                ))}
              </select>

              <select name="experience" onChange={setFilterValue}>
                <option value={null}>Select Experience Level</option>
                {experience.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>

              <select name="job_type" onChange={setFilterValue}>
                <option value={null}>Select Employment Type</option>
                {job_type.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select name="job_type_cat" onChange={setFilterValue}>
                <option value={null}>Select Work Location</option>
                {job_type_cat.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select name="date_range" onChange={setFilterValue}>
                <option value={null}>Select Date Range</option>
                <option value={1}>Last 7 Days</option>
                <option value={2}>Last 14 Days</option>
                <option value={3}>Last 30 Days</option>
              </select>

              <select name="min_salary" onChange={setFilterValue}>
                <option value={0}>Select Minimum Salary</option>
                {salary.map((option) => (
                  <option key={option} value={option}>
                    ${option}/Year (USD)
                  </option>
                ))}
              </select>
            </div>
          </span>
        </div>

        {/* Dropdown */}
        {showDropdown && autocompleteSuggestions.length > 0 && (
          <div className={styles.dropdown}>
            {autocompleteSuggestions.map((suggestion, index) => (
              <div key={index} onClick={() => selectSuggestion(suggestion)}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CONDITIONALLY DISPLAYED JOB DISPLAY */}
      <section
        style={{ animationDelay: "1s" }}
        className={styles.searchDisplay}
      >
        {isLoading && <Loading />}
        {!isLoading && jobs.length === 0 && (
          <div className={styles.noJobs}>
            <p>
              <FontAwesomeIcon icon={faMagnifyingGlass} /> Please enter a search
              in our premium search engine.
            </p>
            <small>
              There are {jobs.length} results for your search &quot;{search}
              &quot;.
            </small>
          </div>
        )}
        {!isLoading && jobs.length > 0 && (
          <div className={styles.jobListing}>
            <div className="job-1x-display">
              {jobs.map((job, index) => (
                <JobDisplay job={job} index={index} key={index} />
              ))}
            </div>
          </div>
        )}
        {!isLoading && jobs.length > 0 && (
          <button
            style={{ display: "block", width: "100%" }}
            onClick={addResults}
            type="button"
            className="primary-button"
          >
            More results for &ldquo;{search}&rdquo;
          </button>
        )}
      </section>

      {/* NEXT BUTTON TO TRIGGER MORE SEARCHES */}
    </main>
  );
}
