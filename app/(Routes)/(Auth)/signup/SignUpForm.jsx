"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

import {
  faIdCard,
  faEnvelope,
  faEye,
  faInbox,
  faGlobe,
  faCity,
  faFlag,
  faFileContract,
  faClipboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Loading from "@/app/loading";

//
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
  "Tempoarary",
  "Volunteer",
  "Internship",
  "Other",
];
const position = ["On-site", "Hybrid", "Remote"];

//set steps
const UserInformation = ({ user, next, input }) => {
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [toggleSeePassword, setToggleSeePassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name !== "confirmPassword") {
      input(e.target.name, e.target.value);
    }

    // Clear error messages when user starts typing
    switch (e.target.name) {
      case "firstname":
        setFirstNameError("");
        break;
      case "lastname":
        setLastNameError("");
        break;
      case "email":
        setEmailError("");
        break;
      case "password":
        setPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPasswordError("");
        setConfirmPassword(e.target.value);
      default:
        break;
    }
  };

  const checkFields = (e) => {
    e.preventDefault();

    //if div.inputBox input does not contain a data or properly formatted data error message will pop up
    let isValid = true;

    // Validate first name
    if (!user.firstname.trim()) {
      setFirstNameError("Please enter a first name");
      isValid = false;
    }

    // Validate last name
    if (!user.lastname.trim()) {
      setLastNameError("Please enter a last name");
      isValid = false;
    }

    // Validate email
    if (!user.username.trim() || !/\S+@\S+\.\S+/.test(user.username)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    // Validate password
    let passwordValid = true;
    if (!user.password) {
      setPasswordError("Please enter a password");
      passwordValid = false;
      isValid = false;
    } else {
      let passwordErrors = [];

      // Check for minimum length
      if (user.password.length < 8) {
        passwordErrors.push("at least 8 characters long");
      }

      if (!/[A-Z]/.test(user.password)) {
        passwordErrors.push("at least one capital letter");
      }

      if (!/\d/.test(user.password)) {
        passwordErrors.push("at least one number");
      }

      // Include checks for lowercase and special characters if needed

      if (passwordErrors.length > 0) {
        setPasswordError(`Password must be ${passwordErrors.join(", ")}`);
        passwordValid = false;
        isValid = false;
      }
    }

    // Validate confirm password
    if (passwordValid) {
      if (confirmPassword !== user.password) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }
    } else {
      setConfirmPasswordError(passwordError);
    }

    // If all fields are valid
    if (isValid) next();
  };

  const togglePassworView = () => {
    setToggleSeePassword(!toggleSeePassword);
  };

  return (
    <form>
      <div className={styles.inputBox}>
        <span>
          <small>First name</small>
          <input
            name="firstname"
            value={user.firstname}
            type="text"
            required
            placeholder="John"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <small className="error">{firstNameError}</small>
        </span>
        <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
      </div>

      <div className={styles.inputBox}>
        <span>
          <small>Last name</small>
          <input
            name="lastname"
            value={user.lastname}
            type="text"
            required
            placeholder="Doe"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <small className="error">{lastNameError}</small>
        </span>
        <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Email</small>
          <input
            name="username"
            value={user.username}
            type="email"
            required
            placeholder="johndoe@mail.com"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <small className="error">{emailError}</small>
        </span>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Password</small>
          <input
            name="password"
            type={toggleSeePassword ? "text" : "password"}
            value={user.password}
            required
            placeholder="**************"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <small className="error">{passwordError}</small>
        </span>
        <FontAwesomeIcon
          onClick={togglePassworView}
          icon={faEye}
          className={styles.icon}
        />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Confirm Password</small>
          <input
            name="confirmPassword"
            type={toggleSeePassword ? "text" : "password"}
            value={confirmPassword}
            required
            placeholder="**************"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <small className="error">{confirmPasswordError}</small>
        </span>
        <FontAwesomeIcon
          onClick={togglePassworView}
          icon={faEye}
          className={styles.icon}
        />
      </div>

      <button
        style={{ gridColumn: "span 2" }}
        type="button"
        onClick={checkFields}
        className="main-button"
      >
        Next
      </button>
    </form>
  );
};
const Location = ({ user, next, back, input }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");

  const checkFields = (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate country
    if (!selectedCountry || selectedCountry === null) {
      setCountryError("Please select a country");
      isValid = false;
    } else {
      setCountryError("");
    }

    // Validate state
    if (!selectedState || selectedState === null) {
      setStateError("Please select a state/province");
      isValid = false;
    } else {
      setStateError("");
    }

    // Proceed to next step if all validations pass
    if (isValid) next();
  };

  const handleChange = (e) => {
    input(e.target.name, e.target.value);
    // Reset error messages when the values change
    if (e.target.name === "country") {
      setSelectedCountry(e.target.value);
      setSelectedState(""); // Reset state when country changes
      setCountryError(""); // Clear country error
    } else if (e.target.name === "state") {
      setSelectedState(e.target.value);
      setStateError(""); // Clear state error
    }
  };

  //fetch APIs
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/capital"
      );
      const data = await response.json();
      if (data.error === false) {
        setCountries(data.data);
      } else {
        // Handle error here
        console.error("Error fetching countries:", data.msg);
      }
    } catch (error) {
      // Handle fetch error here
      console.error("Fetch error:", error);
    }
  };
  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: country }),
        }
      );

      const data = await response.json();
      if (data.error === false) {
        setStates(data.data.states);
      } else {
        // Handle error here
        console.error("Error fetching states:", data.msg);
      }
    } catch (error) {
      // Handle fetch error here
      console.error("Fetch error:", error);
    }
  };
  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: country, state: state }),
        }
      );

      const data = await response.json();
      if (data.error === false) {
        setCities(data.data);
      } else {
        // Handle error here
        console.error("Error fetching cities:", data.msg);
      }
    } catch (error) {
      // Handle fetch error here
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry); // Corrected function name
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState); // Corrected function name
    }
  }, [selectedCountry, selectedState]);

  return (
    <form>
      <div className={styles.inputBox} style={{ gridColumn: "span 2" }}>
        <span>
          <small>Country</small>
          <select
            name="country"
            value={user.location.country}
            onChange={handleChange}
            required
          >
            <option value={null}>Select Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <small className="error">{countryError}</small>
        </span>
        <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
      </div>

      <div className={styles.inputBox} style={{ gridColumn: "span 2" }}>
        <span>
          <small>State/Province</small>
          <select
            name="state"
            value={user.location.state}
            onChange={handleChange}
            required
          >
            <option value={null}>Select State / Province</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <small className="error">{stateError}</small>
        </span>
        <FontAwesomeIcon icon={faFlag} className={styles.icon} />
      </div>

      <div className={styles.inputBox} style={{ gridColumn: "span 2" }}>
        <span>
          <small>City</small>
          <select
            name="city"
            value={user.location.city}
            onChange={handleChange}
            required
          >
            <option value={null}>Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <small className="error">{cityError}</small>
        </span>
        <FontAwesomeIcon icon={faCity} className={styles.icon} />
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={checkFields} className="primary-button">
        Next
      </button>
    </form>
  );
};
const Welcome = ({ user, next, back }) => {
  return (
    <form>
      <h2 style={{ gridColumn: "span 2" }}>Welcome {user.firstname},</h2>
      <p style={{ gridColumn: "span 2" }}>
        Thank you for choosing Job Bunny to take your job search to the next
        level! We&apos;re excited to make your job search easier. Now that you
        have finished registering, you can upload your resume and set your
        custom preferences. Happy searching!
      </p>
      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
        Set up Profile
      </button>
    </form>
  );
};
const Jobs = ({ user, next, input }) => {
  const [jobList, setJobList] = useState([]); //max 3

  const [skillsError, setSkillsError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [jobTypeError, setJobTypeError] = useState("");
  const [positionError, setPositionError] = useState("");

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

  const checkFields = (e) => {
    e.preventDefault();

    let isValid = true;

    // Check if jobList has less than 1 entry
    if (jobList.length < 1) {
      setSkillsError("Not enough jobs added");
      isValid = false; // Set isValid to false if there's an error
    }

    // Check if experience is not selected
    if (user.experience === null || user.experience === "") {
      setExperienceError("Please select an Experience Level");
      isValid = false;
    }

    // Check if job_type is not selected
    if (user.job_types.job_type === null || user.job_types.job_type === "") {
      setJobTypeError("Please select a Contract Type");
      isValid = false;
    }

    // Check if job_type_cat is not selected
    if (
      user.job_types.job_type_cat === null ||
      user.job_types.job_type_cat === ""
    ) {
      setPositionError("Please select a Position Type");
      isValid = false;
    }

    if (isValid) {
      input("job_titles", jobList);
      next(); // Only proceed if all validations pass
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
        "https://jobbunny.co/jobbunnyapi/v1/title_autocomplete",
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

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Job Titles (3 Maximum) </small>
          <input
            maxLength="50"
            name="jobs"
            type="text"
            required
            placeholder="Enter a job title and press enter"
            onKeyDown={addJobs}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleJobInputChange(e);
            }}
            value={inputValue}
          />
          <small className="error">{skillsError}</small>
        </span>
        <FontAwesomeIcon icon={faClipboardUser} className={styles.icon} />
      </div>

      {showDropdown && autocompleteSuggestions.length > 0 && (
        <div style={{ gridColumn: "span 2" }} className={styles.dropdown}>
          {autocompleteSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <div className={styles.jobTitleDisplay}>
        <p style={{ gridColumn: "span 3" }}>Click to remove:</p>
        {jobList.map((job, index) => (
          <small key={`${job}-${index}`} onClick={() => removeJobs(job)}>
            {job}
          </small>
        ))}
      </div>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Job Experience</small>
          <select
            name="experience"
            value={user.experience}
            onChange={handleChange}
            required
          >
            <option value={null}>Select Experience Level</option>
            {experience.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          <small className="error">{experienceError}</small>
        </span>
        <FontAwesomeIcon icon={faClipboardUser} className={styles.icon} />
      </div>
      <div className={styles.inputBox}>
        <span>
          <small>Contract Type</small>
          <select
            name="job_type"
            value={user.job_types.job_type}
            onChange={handleChange}
            required
          >
            <option value={null}>Select Contract Type</option>
            {job_type.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          <small className="error">{jobTypeError}</small>
        </span>
        <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
      </div>
      <div className={styles.inputBox}>
        <span>
          <small>Position Type</small>
          <select
            name="job_type_cat"
            value={user.job_types.job_type_cat}
            onChange={handleChange}
          >
            <option value={null}>Select Position Type</option>
            {position.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          <small className="error">{positionError}</small>
        </span>
        <FontAwesomeIcon icon={faClipboardUser} className={styles.icon} />
      </div>
      <button
        style={{ gridColumn: "span 2" }}
        type="button"
        onClick={checkFields}
        className="primary-button"
      >
        Next
      </button>
    </form>
  );
};
const Skills = ({ user, next, back, input }) => {
  const [inputValue, setInputValue] = useState("");
  const [skillList, setSkillList] = useState([]); //max 20
  const [skillsError, setSkillsError] = useState("");
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

  const checkFields = (e) => {
    e.preventDefault();
    let isValid = true;

    if (skillList.length < 1) {
      setSkillsError("Not enough skills added");
      isValid = false;
    }

    if (isValid) {
      input("skills", skillList);
      next();
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
        "https://jobbunny.co/jobbunnyapi/v1/skill_autocomplete",
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

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Skills Titles (20 Maximum) </small>
          <input
            name="skills"
            className={styles.autocompleteInput}
            type="text"
            required
            placeholder={"Enter a skill and press enter"}
            onKeyDown={addSkills}
            onChange={(e) => {
              setInputValue(e.target.value); // Update the state based on input
              handleInputChange(e); // Your existing logic for handling input change
            }}
            value={inputValue}
            maxLength="25"
          />
          <small className="error">{skillsError}</small>
        </span>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </div>

      {showDropdown && autocompleteSuggestions.length > 0 && (
        <div style={{ gridColumn: "span 2" }} className={styles.dropdown}>
          {autocompleteSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <div className={styles.skillsDisplay}>
        <p>Click to remove:</p>
        {skillList.map((skill, index) => (
          <small key={`${skill}-${index}`} onClick={() => removeSkills(skill)}>
            {skill}
          </small>
        ))}
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={checkFields} className="primary-button">
        Next
      </button>
    </form>
  );
};
const Resume = ({ user, next, back }) => {
  return (
    <form>
      <div className={styles.inputBox}>
        <span>
          <small>Resume Upload</small>
          <input type="file" required />
        </span>
        <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
      </div>

      <div className={styles.inputBox}>
        <span>
          <small>Additonal Upload(s)</small>
          <input type="file" multiple />
        </span>
        <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
        Complete Signup
      </button>
    </form>
  );
};
const ProfileLoading = ({ user, next, submit }) => {
  // create a use effect where once this page is rendered it loads for 5 seconds then triggers the submit function
  useEffect(() => {
    // Set a timeout to trigger the submit function after 5 seconds
    const timer = setTimeout(() => {
      submit();
      next();
    }, 5000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [next]);

  return <Loading />;
};
const Verification = ({ user }) => {
  return (
    <form>
      <h2 style={{ gridColumn: "span 2" }}>Verification email sent.</h2>
      <p style={{ gridColumn: "span 2" }}>
        We&apos;ve sent a verification email to {user.username}. Please click on
        the link in that email to confirm your account. Can&apos;t find the
        email? It may take a few minutes to arrive, or it could be in your spam
        folder.
      </p>
    </form>
  );
};

export default function SignUpForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    location: { city: "", state: "", country: "" },
    job_titles: [], //max 3 entries
    skills: [], //max 20 skills
    experience: "", //experience list form
    job_types: { job_type: "", job_type_cat: "" },
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  //Helper Functions
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleInputChange = (fieldName, value) => {
    setUser((prevState) => {
      // Iterate over the keys of the prevState
      for (const key in prevState) {
        // Check if the key is an object and if it contains the fieldName
        if (
          typeof prevState[key] === "object" &&
          prevState[key] !== null &&
          fieldName in prevState[key]
        ) {
          return {
            ...prevState,
            [key]: {
              ...prevState[key],
              [fieldName]: value,
            },
          };
        }
      }

      // Default case for top-level fields
      return {
        ...prevState,
        [fieldName]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      // Adjust the success condition to match the actual API response
      if (response.ok) {
        // This checks for HTTP 200-299
        console.log("User signed up", responseData);
        // Proceed with success logic, e.g., redirecting to a success page
      } else {
        // Handle application-level errors based on responseData details
        console.error(
          "Signup failed:",
          responseData.message,
          responseData.details
        );
        router.push("/signup/failure");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      router.push("/signup/failure");
    }
  };

  return (
    <div className={styles.signUpFormBox}>
      <div className={styles.title}>
        <big>START YOUR JOURNEY</big>
        <h1>
          Create new account<span>.</span>
        </h1>
        <small>
          Already A Member? <Link href={"/login"}>Log in</Link>
        </small>
      </div>

      {step == 1 && (
        <UserInformation
          user={user}
          next={nextStep}
          input={handleInputChange}
        />
      )}
      {step == 2 && (
        <Location
          user={user}
          next={nextStep}
          back={previousStep}
          input={handleInputChange}
        />
      )}
      {step == 3 && <Welcome user={user} next={nextStep} back={previousStep} />}

      {step == 4 && (
        <Jobs
          user={user}
          next={nextStep}
          back={previousStep}
          input={handleInputChange}
        />
      )}
      {step == 5 && (
        <Skills
          user={user}
          next={nextStep}
          input={handleInputChange}
          back={previousStep}
        />
      )}
      {step == 6 && (
        <Resume
          user={user}
          next={nextStep}
          back={previousStep}
          input={handleInputChange}
        />
      )}
      {step == 7 && (
        <ProfileLoading user={user} next={nextStep} submit={onSubmit} />
      )}
      {step == 8 && <Verification user={user} />}
    </div>
  );
}
