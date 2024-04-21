"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState, useEffect, useCallback } from "react";

import FilterBox from "./FilterBox";
import DisplayJobs from "../(Main)/DisplayJobs";
import InifiniteScroll from "@/app/Components/(Misc)/Interactive/InifiniteScroll";
import Loading from "@/app/loading";
import styles from "./search.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faList,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default function Search() {
  //search params from other page
  const searchParams = useSearchParams();
  const [routeTrigger, setRouteTrigger] = useState(false); //trigger search for redirect

  //init states
  const router = useRouter(); // incase users are not logged in
  const { data } = useSession(); // getting user information
  const [searchValue, setSearchValue] = useState(""); //the search value
  const [jobTitles, setJobTitles] = useState([]); //suggested job titles
  const [start, setStart] = useState(0); //index for searching
  const [searchError, setSearchError] = useState(); //dealing with search issues
  const [isLoading, setIsLoading] = useState(false); // for suspense loading
  const [filters, setFilters] = useState({}); //managed by the filterbox component
  const [filterToggle, setFilterToggle] = useState(false); //toggle filter box showing
  const [showDropdown, setShowDropdown] = useState(false); // To control the visibility of the dropdown
  const [results, setResults] = useState([]); //result list for job search
  const [count, setCount] = useState(0);

  //Utilitiy functions
  const toggleFilter = () => {
    setFilterToggle(!filterToggle);
  };
  const setFilter = useCallback(({ name, value }) => {
    setFilters((currentFilters) => {
      const updatedFilters = { ...currentFilters };

      // Mark the filter for removal instead of deleting it
      if (value === null || value === undefined) {
        updatedFilters[name] = "remove";
      } else {
        updatedFilters[name] = value;
      }

      return updatedFilters;
    });
  }, []);
  const setSearch = (value) => {
    const search = typeof value === "string" ? value : value.target.value;
    setSearchValue(search); // This is the correct usage
    setSearchError("");

    if (search.length > 1) {
      debouncedApiCall(search); // Pass the correct variable to debouncedApiCall
    } else {
      setJobTitles([]);
      setShowDropdown(false);
    }
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getResults();
    }
  };
  const selectSuggestion = (suggestion) => {
    setSearchValue(suggestion); // Update the search state
    setJobTitles([]); // remove suggestions
    setShowDropdown(false); // Close the dropdown
    getResults();
  };

  //Debounce calls
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
        setJobTitles(data.data);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error fetching job title suggestions:", error);
    }
  }, 30);

  //Results display logic
  const getResults = async (e) => {
    //set states
    setShowDropdown(false);
    setSearchError("");
    setJobTitles([]);
    setResults([]);
    setIsLoading(true);
    setStart(0);

    if (!data) {
      router.push("/login");
    }

    // Check if the search query is empty
    if (searchValue === "") {
      setSearchError("Please Enter a search");
      setIsLoading(false); // Stop loading due to error (empty search query)
      return; // Early return to prevent further execution
    }

    // Prepare API request
    const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/job_search";

    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        // Check if the value is an object and if it's empty
        const isObject = typeof value === "object" && value !== null;
        const isEmptyObject = isObject && Object.keys(value).length === 0;

        // Exclude filters marked as "remove" or empty objects
        if (value !== "remove" && !isEmptyObject) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    // set request body here
    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      job_title: searchValue,
      start: 0,
      count: 30,
      filters: activeFilters,
    };

    console.log(requestBody);

    //execute request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    //process response
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.status === 200 && responseData.data.length > 0) {
        // Set jobs to the newly fetched jobs
        setCount(responseData.count);
        setResults(responseData.data);
        setStart(start + responseData.data.length); // set start for next Api call
        setIsLoading(false); // Stop loading after successfully fetching jobs
      } else {
        setIsLoading(false); // Stop loading when no data is returned
      }
    } else {
      setSearchError("Error fetching jobs please try again");
      setIsLoading(false);
    }
  };
  const updateResults = async () => {
    //this function updates the list of results with new entries it is triggered by the child component.
    // the child component has both the results state and this function

    const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/job_search";

    const activeFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        // Check if the value is an object and if it's empty
        const isObject = typeof value === "object" && value !== null;
        const isEmptyObject = isObject && Object.keys(value).length === 0;

        // Exclude filters marked as "remove" or empty objects
        if (value !== "remove" && !isEmptyObject) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      job_title: searchValue,
      start: start, //the start state holds the length of the previous search so we can keep the same index
      count: 30,
      filters: activeFilters,
    };

    //execute request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    //process response
    if (response.ok) {
      const responseData = await response.json();
      if (responseData.status === 200 && responseData.data.length > 0) {
        // Set jobs to the newly fetched jobs
        setResults((prevResults) => [...prevResults, ...responseData.data]);
        setStart(start + responseData.data.length); // set start for next Api call
      }
    } else {
      setSearchError("Error fetching jobs please try again");
    }
  };

  //redirect search use effects
  useEffect(() => {
    //set route search to search params
    const redirectSearch = async () => {
      const query = searchParams.get("search") || "";
      setSearchValue(query);
      if (query) {
        setRouteTrigger(true);
      }
    };
    redirectSearch();
  }, [searchParams]);
  useEffect(() => {
    const routeSearch = async () => {
      if (routeTrigger && searchValue) {
        getResults();
        setRouteTrigger(false);
      }
    };
    routeSearch();
  }, [routeTrigger, searchValue]);

  return (
    <main className={styles.main}>
      {/* SEARCH BOX */}
      <section className={styles.container}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            width: "100%",
          }}
        >
          <div style={{ position: "relative" }} className="inputbox">
            <span>
              <input
                type="text"
                required
                placeholder="Search..."
                value={searchValue}
                onKeyDown={checkKey}
                onChange={setSearch}
              />
              {searchError && <small className="error">{searchError}</small>}
            </span>
            <button style={{ border: "none" }} onClick={getResults}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {showDropdown && jobTitles.length > 0 && (
              <div className={styles.dropdown}>
                {jobTitles.map((suggestion, index) => (
                  <button
                    className={styles.item}
                    key={index}
                    type="button"
                    onClick={(e) => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className={styles.toggleButton} onClick={toggleFilter}>
            {filterToggle ? (
              <FontAwesomeIcon icon={faCircleXmark} />
            ) : (
              <FontAwesomeIcon icon={faList} />
            )}
          </button>
        </span>

        {filterToggle && <FilterBox filter={filters} update={setFilter} />}
      </section>

      {/* DISPLAY STORIES */}
      {isLoading && <Loading />}
      {!isLoading && searchValue === "" && results.length === 0 && (
        <DisplayJobs />
      )}
      {!isLoading && searchValue !== "" && results.length === 0 && (
        <section className={styles.noJobs}>
          <p>
            <FontAwesomeIcon icon={faMagnifyingGlass} /> Please enter a search
            in our premium search engine.
          </p>
          <small>
            There are {results.length} results for your search &quot;
            {searchValue}
            &quot;.
          </small>
        </section>
      )}
      {!isLoading && results.length > 0 && (
        <InifiniteScroll
          listings={results}
          update={updateResults}
          count={count}
        />
      )}
    </main>
  );
}
