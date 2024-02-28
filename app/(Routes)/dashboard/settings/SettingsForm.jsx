"use client";
import React, { useState, useEffect } from "react";
import Skills from "./Skills";
import Jobs from "./Jobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
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
import styles from "./settings.module.css";
import Loading from "@/app/loading";

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

// first get user session x
// use the session to get the users information && set the vaules to the user information x

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
const getSettings = async (data) => {
  const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/get_settings";
  const requestBody = {
    username: data.user.email,
    jb_token: data.user.jb_token,
  };

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();

  if (responseData.status === 200) {
    return responseData;
  } else {
    return responseData;
  }
};

export default function SettingsForm() {
  //Used states
  const { data, status } = useSession();
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //countries from the API
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //Utility Functions
  const handleSkillsUpdate = (newSkills) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      skills: newSkills,
    }));
  };
  const handleJobTitlesUpdate = (newJobTitles) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      job_titles: newJobTitles,
    }));
  };


  const handleInputChange = (fieldName, value) => {}; //appends new state to updated user
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(updatedUser);
  }; // submits change to API endpoint




  //get user settings ->
  useEffect(() => {
    const fetchSettings = async () => {
      if (data && data.user) {
        const settings = await getSettings(data);

        if (settings && settings.data) {
          setUser(settings.data);
        }
      }
    };
    fetchSettings();
  }, [data]);

  return (
    <section className={styles.settings}>
      <form>

        <h3 style={{ gridColumn: "1 / -1" }}>Personal Information:</h3>
        <div className={styles.inputBox}>
          <span>
            <small>First name</small>
            <input
              name="firstname"
              type="text"
              placeholder={user ? user.firstname : ""}
              onChange={handleInputChange}
            />
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faIdCard} />
        </div>
        <div className={styles.inputBox}>
          <span>
            <small>Last name</small>
            <input
              name="lastname"
              type="text"
              placeholder={user ? user.lastname : ""}
              onChange={handleInputChange}
            />
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faIdCard} />
        </div>

        <h3 style={{ gridColumn: "1 / -1" }}>Location:</h3>
        <div className={styles.inputBox} style={{ gridColumn: "1 / -1" }}>
          <span>
            <small>Country</small>
            <select name="country" onChange={handleInputChange} >
              <option value={null}>{user ? user.country : ""}</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
        </div>
        <div className={styles.inputBox} style={{ gridColumn: "1 / -1" }}>
          <span>
            <small>State/Province</small>
            <select name="state" onChange={handleInputChange} >
              <option value={null}>{user ? user.state : ""}</option>
              {states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faFlag} className={styles.icon} />
        </div>
        <div className={styles.inputBox} style={{ gridColumn: "1 / -1" }}>
          <span>
            <small>City</small>
            <select name="city" onChange={handleInputChange} >
              <option value={null}>{user ? user.city : ""}</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faCity} className={styles.icon} />
        </div>

        <h3 style={{ gridColumn: "1 / -1" }}>Job Experience:</h3>
        {user.job_titles && (<Jobs userJobs={user.job_titles} onUpdate={handleJobTitlesUpdate}/>)}

        <div style={{ gridColumn: "1 / -1" }} className={styles.inputBox}>
          <span>
            <small>Job Experience</small>
            <select name="experience" onChange={handleInputChange} >
              <option value={null}>Select Experience Level</option>
              {experience.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faClipboardUser} className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <span>
            <small>Contract Type</small>
            <select name="job_type" onChange={handleInputChange} >
              <option value={null}>Select Contract Type</option>
              {job_type.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faFileContract} />
        </div>

        <div className={styles.inputBox}>
          <span>
            <small>Position Type</small>
            <select name="job_type_cat" onChange={handleInputChange}>
              <option value={null}>Select Position Type</option>
              {position.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faClipboardUser} />
        </div>

        <h3 style={{ gridColumn: "1 / -1" }}>Additonal Information:</h3>
        {user.skills && <Skills userSkills={user.skills} onUpdate={handleSkillsUpdate} />}

        <button onClick={onSubmit} style={{ gridColumn: "1 /-1" }} className="primary-button">
          Save Changes
        </button>
      </form>
    </section>
  );
}
