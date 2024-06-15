"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // for incoming searches
import React, { useState, useEffect, useCallback } from "react";
import seo_config from "@/_data/seo";

import Loading from "@/app/loading";
import JobDisplay from "@/app/Components/(Misc)/Object Displays/JobDisplay";
import AuthModal from "@/app/Components/(Misc)/Interactive/AuthModal";

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

// export const metadata = {
//   title: seo_config.search.title,
//   description: seo_config.search.description,
//   keywords: seo_config.search.keywords,
//   author: seo_config.search.author,
// };

export default function GuestSearch() {
  //states
  const router = useRouter();
  const searchParams = useSearchParams();
  const [routeTrigger, setRouteTrigger] = useState(false);

  const [searchValue, setSearchValue] = useState();
  const [searchError, setSearchError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [jobTitles, setJobTitles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);

  const [modalTrigger, setModalTrigger] = useState(true);

  //utility functions
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
  const closeModal = () => {
    setModalTrigger(!modalTrigger);
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

    // Check if the search query is empty
    if (searchValue === "") {
      setSearchError("Please Enter a search");
      setIsLoading(false); // Stop loading due to error (empty search query)
      return; // Early return to prevent further execution
    }

    // Prepare API request
    const apiEndpoint =
      "https://jobbunnyapi.com/jobbunnyapi/v1/public_job_search";

    // set request body here
    const requestBody = {
      job_title: searchValue,
      filters: {},
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
        setResults(responseData.data);
        setIsLoading(false); // Stop loading after successfully fetching jobs
      } else {
        setIsLoading(false); // Stop loading when no data is returned
      }
    } else {
      setSearchError("Error fetching jobs please try again");
      setIsLoading(false);
    }
  };

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
      {modalTrigger && (
        <AuthModal close={closeModal} push_search={searchValue} />
      )}

      {/* SEARCH BOX  */}
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
        </span>
      </section>

      {/* DISPLAY JOBS */}
      {isLoading && <Loading />}

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
        <div className={styles.listings}>
          {results.map((job, index) => (
            <JobDisplay job={job} index={index} key={index} />
          ))}
        </div>
      )}
    </main>
  );
}
