"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faEnvelope,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Loading from "@/app/loading";

//get user to put in email for request ->
// if request fails set error to "no user with (specified email exists)"
// if request is successfull send user to next sub componenet "update"

//update component will store the email state and prompt user for recieved code
//if user didnt recieve the code, they can co back and change email
//or they can click resend button which will retrigger request api

// user enters code:
//if code is incorrect error state will say incorrect
//if user correct && password requirements are met
//success message is triggered and a button will prompt users to go to login page

const Request = ({ changeStep, user, setUser, loading, request }) => {
  const [emailError, setEmailError] = useState("");

  const checkFields = async (e) => {
    e.preventDefault();

    loading(true);
    let isValid = true;

    if (user.email === "") {
      setEmailError("Please enter an email address");
      isValid = false;
      loading(false);
    } else if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
      loading(false);
    }

    if (isValid) {
      const data = await request(user);

      if (data === 200) {
        changeStep();
        loading(false);
      } else {
        console.log("the error is,", data);
        setEmailError(data.message);
        loading(false);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, email: e.target.value });
    setEmailError("");
  };

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Please enter your account email</small>
          <input
            name="email"
            value={user.email}
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

const Update = ({ changeStep, user, loading }) => {
  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [toggleSeePassword, setToggleSeePassword] = useState(false);

  const togglePassworView = () => {
    setToggleSeePassword(!toggleSeePassword);
  };

  const checkFields = (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Please enter code sent to {user.email}</small>
          <input
            name="code"
            value={user.code}
            type="text"
            required
            placeholder="Confirmation Code"
            // onChange={handleChange}
            // onBlur={handleChange}
          />
          <small className="error">{codeError}</small>
        </span>
        <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>New Password</small>
          <input
            name="password"
            value={user.password}
            type={toggleSeePassword ? "text" : "password"}
            required
            placeholder="**************"
            // onChange={handleChange}
            // onBlur={handleChange}
          />
          <small className="error">{passwordError}</small>
        </span>
        <FontAwesomeIcon
          icon={faEye}
          onClick={togglePassworView}
          className={styles.icon}
        />
      </div>

      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Confirm New Password</small>
          <input
            name="confirmPassword"
            value={confirmPassword}
            type={toggleSeePassword ? "text" : "password"}
            required
            placeholder="**************"
            // onChange={handleChange}
            // onBlur={handleChange}
          />
          <small className="error">{confirmPasswordError}</small>
        </span>
        <FontAwesomeIcon
          icon={faEye}
          onClick={togglePassworView}
          className={styles.icon}
        />
      </div>

      <button
        style={{ gridColumn: "span 2" }}
        type="button"
        onClick={checkFields}
        className="primary-button"
      >
        Change Password
      </button>

      <button type="button" onClick={changeStep} className="main-button">
        Previous
      </button>

      <button type="button" onClick={changeStep} className="main-button">
        Resend Email
      </button>
    </form>
  );
};

const requestCode = async (user) => {
  const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/forgot_pass_request";
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user.email }),
  });
  const responseData = await response.json();

  if (responseData.ok) {
    return 200;
  } else {
    console.log(responseData);
    return responseData;
  }
};

const updatePassword = async (user) => {
  const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/update_password";
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user.email,
      security_code: user.code,
      new_pass: user.password,
    }),
  });
  const responseData = await response.json();
  if (responseData.ok) {
    return 200;
  } else {
    return responseData;
  }
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(true); //request -> true , update -> false

  const changeStep = () => {
    setStep(!step);
  };

  return (
    <div className={styles.forgotPasswordBox}>
      <div className={styles.title}>
        <big>GET BACK ON TRACK</big>
        <h1>
          Change your password<span>.</span>
        </h1>
        <small>
          Remembered your password? <Link href={"/login"}>Log in</Link>
        </small>
      </div>

      {isLoading && <Loading />}
      {!isLoading && step && (
        <Request
          user={user}
          changeStep={changeStep}
          loading={setIsLoading}
          setUser={setUser}
          request={requestCode}
        />
      )}
      {!isLoading && !step && (
        <Update user={user} changeStep={changeStep} loading={isLoading} />
      )}
    </div>
  );
}
