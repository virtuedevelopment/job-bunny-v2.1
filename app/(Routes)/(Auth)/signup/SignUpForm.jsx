"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

import {
  faIdCard,
  faEnvelope,
  faEye,
  faHashtag,
  faGlobe,
  faCity,
  faFlag,
  faFileContract,
  faClipboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { resolve } from "styled-jsx/css";

//set steps
const UserInformation = ({ user, next, input }) => {
  const handleChange = (e) => {
    input(e.target.name, e.target.value);
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
        </span>
        <FontAwesomeIcon icon={faIdCard} className={styles.icon} />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Email</small>
          <input
            name="email"
            value={user.email}
            type="email"
            required
            placeholder="johndoe@mail.com"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </span>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Password</small>
          <input
            name="password"
            type="password"
            value={user.password}
            required
            placeholder="**************"
            onChange={handleChange}
            onBlur={handleChange}
          />
        </span>
        <FontAwesomeIcon icon={faEye} className={styles.icon} />
      </div>

      <button
        style={{ gridColumn: "span 2" }}
        type="button"
        onClick={next}
        className="main-button"
      >
        Next
      </button>
    </form>
  );
};
const Verification = ({ user, next, back, input }) => {
  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Enter verification code sent to your email</small>{" "}
          {/* Replace with user email */}
          <input type="text" required placeholder="Code" />
        </span>
        <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
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

  const handleChange = (e) => {
    input(e.target.name, e.target.value);
    if (e.target.name === "country") {
      setSelectedCountry(e.target.value);
      setSelectedState(""); // Reset state when country changes
    } else if (e.target.name === "state") {
      setSelectedState(e.target.value);
    }
    console.log("Selected Country: ", selectedCountry);

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
    console.log('fetching states with: ', country)
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
    console.log('Fetching cities with: ', country , state)
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
        console.log("cities: ",data.data)
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
            <option value="1">Select Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
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
            <option value="null">Select State / Province</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
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
            <option value="1">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </span>
        <FontAwesomeIcon icon={faCity} className={styles.icon} />
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
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
        We are excited to make your job search easier. Now that you have
        finished registering, you can upload your resume and set your custom
        preferences. Happy searching!
      </p>
      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
        Set Profile
      </button>
    </form>
  );
};
const Jobs = ({ user, next }) => {
  const [jobList, setJobList] = useState([]); //max 3

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Job Titles (3 Maximum) </small>
          <input type="text" required placeholder="Enter Skills" />
        </span>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </div>

      <div className={styles.jobTitleDisplay} style={{ gridColumn: "span 2" }}>
        <p style={{ gridColumn: "span 3" }}>Click to remove:</p>
        {jobList.map((job) => (
          <small key={job}>{job}</small>
        ))}
      </div>

      <div className={styles.inputBox}>
        <span>
          <small>Job Experience</small>
          <select>
            <option value="1">Select Experience Level</option>
          </select>
        </span>
        <FontAwesomeIcon icon={faFileContract} className={styles.icon} />
      </div>

      <div className={styles.inputBox}>
        <span>
          <small>Contract Type</small>
          <select>
            <option value="1">Select Contract Type</option>
          </select>
        </span>
        <FontAwesomeIcon icon={faClipboardUser} className={styles.icon} />
      </div>

      <button
        style={{ gridColumn: "span 2" }}
        type="button"
        onClick={next}
        className="primary-button"
      >
        Next
      </button>
    </form>
  );
};
const Skills = ({ user, next, back }) => {
  const [skillList, setSkillList] = useState([]); //max 20
  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Skills Titles (20 Maximum) </small>
          <input type="text" required placeholder="Enter Skills" />
        </span>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      </div>

      <div className={styles.skillsDisplay} style={{ gridColumn: "span 2" }}>
        <p style={{ gridColumn: "span 5" }}>Click to remove:</p>
        {skillList.map((skill) => (
          <small key={skill}>{skill}</small>
        ))}
      </div>

      <button type="button" onClick={back} className="main-button">
        Previous
      </button>

      <button type="button" onClick={next} className="primary-button">
        Next
      </button>
    </form>
  );
};
const Resume = ({ user, submit, back }) => {
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

      <button type="button" onClick={submit} className="primary-button">
        Go to dashboard
      </button>
    </form>
  );
};

export default function SignUpForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
      // Check if the field is part of the location object
      if (fieldName in prevState.location) {
        return {
          ...prevState,
          location: {
            ...prevState.location,
            [fieldName]: value,
          },
        };
      }

      // For fields not part of the location object
      return {
        ...prevState,
        [fieldName]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(user);
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
        <Verification user={user} next={nextStep} back={previousStep} />
      )}
      {step == 3 && (
        <Location
          user={user}
          next={nextStep}
          back={previousStep}
          input={handleInputChange}
        />
      )}
      {step == 4 && <Welcome user={user} next={nextStep} back={previousStep} />}
      {step == 5 && <Jobs user={user} next={nextStep} />}
      {step == 6 && <Skills user={user} next={nextStep} back={previousStep} />}
      {step == 7 && (
        <Resume user={user} submit={onSubmit} back={previousStep} />
      )}
    </div>
  );
}
