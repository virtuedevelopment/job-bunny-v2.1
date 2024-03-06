"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser } from "@fortawesome/free-solid-svg-icons";

export default function Jobs({ userJobs, onUpdate }) {
  const [jobList, setJobList] = useState([]); //max 3
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    input(e.target.name, e.target.value);

    if (e.target.name === "job_type") {
      setJobTypeError(""); //clear state error
    } else if (e.target.name === "job_type_cat") {
      setPositionError(""); // Clear state error
    } else if (e.target.name == "experience") {
      setExperienceError(""); //clear experience error
    } else if (jobList.length <= 1) {
      setSkillsError("");
    }
  };

  const addJobs = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const job = e.target.value.trim(); // Trim whitespace from the input value

      if (!job) {
        // Check if the input is empty
        alert("Please enter a job title");
      } else if (jobList.includes(job)) {
        // Check if the job is already in the list
        alert("This job is already added");
      } else if (jobList.length >= 3) {
        // Check if the job list already has 3 jobs
        alert("Maximum of 3 jobs can be added");
      } else {
        // Add the new job to the list
        setJobList((prevJobList) => [...prevJobList, job]);
        setInputValue(""); // Clear the input field after adding the job
        setShowDropdown(true);
      }
    }
    e.target.value = "";
    setAutocompleteSuggestions([]);
    setShowDropdown(true);
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
  }, 10);

  const handleJobInputChange = (e) => {
    const input = e.target.value;
    if (input.length > 1) {
      debouncedApiCall(input);
    } else {
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    if (!jobList.includes(suggestion) && jobList.length < 3) {
      setJobList((prevJobList) => [...prevJobList, suggestion]);
      setInputValue("");
    }
    setAutocompleteSuggestions([]);
    setShowDropdown(false);
    // Optionally clear the input field if required
  };

  const removeJobs = (jobToRemove) => {
    setJobList((prevJobList) =>
      prevJobList.filter((job) => job !== jobToRemove)
    );
  };

  //use effects
  useEffect(() => {
    if (userJobs) {
      setJobList(userJobs);
    }
  }, [userJobs]);
  
  useEffect(() => {
    onUpdate(jobList);
  }, [jobList, onUpdate]);

  return (
    <>
      <div style={{ gridColumn: "1 / -1" }} className={styles.inputBox}>
        <span>
          <small>Job Titles (3 Maximum) </small>
          <input
            maxLength="50"
            name="jobs"
            type="text"
            placeholder="Enter a job title and press enter"
            onKeyDown={addJobs}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleJobInputChange(e);
            }}
            value={inputValue}
          />
          <small className="error"></small>
        </span>
        <FontAwesomeIcon icon={faClipboardUser} />
      </div>

      {showDropdown && autocompleteSuggestions.length > 0 && (
        <div style={{ gridColumn: "1/-1" }} className={styles.dropdown}>
          {autocompleteSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {jobList && (
        <div className={styles.jobTitleDisplay}>
          <p style={{ gridColumn: "1 / -1" }}>Click to remove:</p>
          {jobList.map((job, index) => (
            <small key={`${job}-${index}`} onClick={() => removeJobs(job)}>
              {job}
            </small>
          ))}
        </div>
      )}
    </>
  );
}
