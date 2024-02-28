"use client";
import React, { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Skills({ userSkills, onUpdate }) {
  const [inputValue, setInputValue] = useState("");
  const [skillList, setSkillList] = useState([]); //max 20
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const addSkills = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChange();
      const skill = e.target.value.trim(); // Trim whitespace from the input value

      if (!skill) {
        // Check if the input is empty
        alert("Please enter a skill");
      } else if (skillList.includes(skill)) {
        // Check if the job is already in the list
        alert("This skill is already added");
      } else if (skillList.length >= 20) {
        // Check if the job list already has 3 jobs
        alert("Maximum of 20 skills can be added");
      } else {
        // Add the new job to the list
        setSkillList((prevSkillList) => [...prevSkillList, skill]);
        setInputValue(""); // Clear the input field after adding the job
        setShowDropdown(false);
        setAutocompleteSuggestions([]);
      }
    }
  };

  const selectSuggestion = (suggestion) => {
    setSkillList((prevSkillList) => [...prevSkillList, suggestion]);
    setShowDropdown(false);
    setAutocompleteSuggestions([]);
    setInputValue("");
  };

  const removeSkills = (skillToRemove) => {
    setSkillList((prevSkillList) =>
      prevSkillList.filter((skill) => skill !== skillToRemove)
    );
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
        "https://jobbunnyapi.com/jobbunnyapi/v1/skill_autocomplete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skill_prefix: input }),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        setAutocompleteSuggestions(data.data);
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  }, 10);

  const handleChange = () => {
    if (skillList.length <= 1) {
      setSkillsError("");
    }
  };

  const handleInputChange = async (e) => {
    const input = e.target.value;

    if (input.length > 1) {
      debouncedApiCall(input);
      setShowDropdown(true);
    } else {
      setAutocompleteSuggestions([]);
      setShowDropdown(false);
    }
  };

  //use effects
  useEffect(() => {
    const fetchSKills = async () => {
      if (userSkills) {
        setSkillList(userSkills);
      }
    };
    fetchSKills();
  }, [userSkills]);

  useEffect(() => {
    // Call the callback function whenever skillList changes
    onUpdate(skillList);
  }, [skillList, onUpdate]);

  return (
    <>
      <div style={{ gridColumn: "1 / -1" }} className={styles.inputBox}>
        <span>
          <small>Skills Titles (20 Maximum) </small>
          <input
            name="skills"
            className={styles.autocompleteInput}
            type="text"
            placeholder={"Enter a skill and press enter"}
            onKeyDown={addSkills}
            onChange={(e) => {
              setInputValue(e.target.value); // Update the state based on input
              handleInputChange(e); // Your existing logic for handling input change
            }}
            value={inputValue}
            maxLength="25"
          />
          <small className="error"></small>
        </span>
        <FontAwesomeIcon icon={faEnvelope} />
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

      {skillList && (
        <div className={styles.skillsDisplay}>
          <p>Click to remove:</p>
          {skillList.map((skill, index) => (
            <small
              key={`${skill}-${index}`}
              onClick={() => removeSkills(skill)}
            >
              {skill}
            </small>
          ))}
        </div>
      )}
    </>
  );
}
