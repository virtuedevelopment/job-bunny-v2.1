"use client";
import React, { useState, useEffect, useCallback } from "react";
import Skills from "./Skills";
import Jobs from "./Jobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  "Temporary",
  "Volunteer",
  "Internship",
  "Other",
];
const position = ["On-site", "Hybrid", "Remote"];

// first get user session x
// use the session to get the users information && set the vaules to the user information x
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
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //countries from the API
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  //Utility Functions
  const handleSkillsUpdate = useCallback((newSkills) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      skills: newSkills,
    }));
  }, []);
  
  const handleJobTitlesUpdate = useCallback((newJobTitles) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      job_titles: newJobTitles,
    }));
  }, []);
  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    // Assuming 'user' is an object storing the selected values
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Fetch states when a country is selected
    if (name === "country") {
      await fetchStates(value);
      // Optionally, reset states and cities when changing countries
      setCities([]);
    }

    // Fetch cities when a state is selected
    if (name === "state") {
      await fetchCities(updatedUser.country, value);
    }
  };
  const fetchUserSettings = async () => {
    if (data && data.user) {
      const settings = await getSettings(data);
      if (settings && settings.data) {
        setUser(settings.data);
        // You might also want to fetch countries, states, and cities here if they depend on the user's settings
        await fetchCountries();
        if (settings.data.country) {
          await fetchStates(settings.data.country);
        }
        if (settings.data.state) {
          await fetchCities(settings.data.country, settings.data.state);
        }
      }
    }
  };

  //Submit functions
  const onSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint =
      "https://jobbunnyapi.com/jobbunnyapi/v1/update_settings";

    // Start with required fields
    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
    };

    // Add optional fields if they exist and are not null
    const optionalFields = [
      "firstname",
      "lastname",
      "experience",
      "city",
      "state",
      "country",
      "job_type",
      "job_type_cat",
    ];
    optionalFields.forEach((field) => {
      if (updatedUser[field]) {
        // For location fields, nest them under 'location'
        if (["city", "state", "country"].includes(field)) {
          if (!requestBody.location) requestBody.location = {};
          requestBody.location[field] = updatedUser[field];
        } else if (field === "job_type" || field === "job_type_cat") {
          // For job_type fields, nest them under 'job_types'
          if (!requestBody.job_types) requestBody.job_types = {};
          requestBody.job_types[field] = updatedUser[field];
        } else {
          // Directly add other fields
          requestBody[field] = updatedUser[field];
        }
      }
    });

    // Handle arrays separately to ensure they are only added if not empty
    if (updatedUser.job_titles && updatedUser.job_titles.length > 0) {
      requestBody.job_titles = updatedUser.job_titles;
    }
    if (updatedUser.skills && updatedUser.skills.length > 0) {
      requestBody.skills = updatedUser.skills;
    }

    setIsLoading(true);

    // Send the request to the update API endpoint
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === 201) {
        fetchUserSettings();
        // await fetch('/api/auth/session', { method: 'POST' });
        setIsLoading(false);
        router.refresh();
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      // Handle error
      console.error("Error updating settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //get user settings ->
  useEffect(() => {
    const fetchSettings = async () => {
      if (data && data.user) {
        const settings = await getSettings(data);

        if (settings && settings.data) {
          setUser(settings.data);
        }

        //once user data is set fetch countries
        await fetchCountries();
      }
    };
    fetchSettings();
  }, [data]);

  useEffect(() => {
    // If the user's country is set, fetch states for that country
    if (user && user.country) {
      fetchStates(user.country).then(() => {
        // After states are fetched, if user's state is set, fetch cities
        if (user.state) {
          fetchCities(user.country, user.state);
        }
      });
    }
  }, [user, user.country, user.state]);

  return isLoading ? (
    <Loading />
  ) : (
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
            <select name="country" onChange={handleInputChange}>
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
            <select name="state" onChange={handleInputChange}>
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
            <select name="city" onChange={handleInputChange}>
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
        {user.job_titles && (
          <Jobs userJobs={user.job_titles} onUpdate={handleJobTitlesUpdate} />
        )}

        <div style={{ gridColumn: "1 / -1" }} className={styles.inputBox}>
          <span>
            <small>Job Experience</small>
            <select name="experience" onChange={handleInputChange}>
              <option value={null}>
                {user ? user.experience : "Select Experience Level"}
              </option>
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
            <select name="job_type" onChange={handleInputChange}>
              <option value={null}>
                {user ? user.job_type : "Select Contract Type"}
              </option>
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
              <option value={null}>
                {user ? user.job_type_cat : "Select Position Type"}
              </option>
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
        {user.skills && (
          <Skills userSkills={user.skills} onUpdate={handleSkillsUpdate} />
        )}

        <button
          onClick={onSubmit}
          style={{ gridColumn: "1 /-1" }}
          className="primary-button"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
