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
import MessageModal from "@/app/Components/(Misc)/Interactive/MessageModal";

const Request = ({ changeStep, user, setUser, loading, request }) => {
  const [emailError, setEmailError] = useState("");

  const checkFields = async (e) => {
    e.preventDefault();

    loading(true);
    let isValid = true;

    if (user === "") {
      setEmailError("Please enter an email address");
      isValid = false;
      loading(false);
    } else if (!user.trim() || !/\S+@\S+\.\S+/.test(user)) {
      setEmailError("Please enter a valid email");
      isValid = false;
      loading(false);
    }

    if (isValid) {
      const response = await request(user);

      if (response.status === 200) {
        changeStep();
        loading(false);
      } else {
        setEmailError(response.message);
        loading(false);
      }
    }
  };

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Please enter your account email</small>
          <input
            name="email"
            value={user}
            type="email"
            required
            placeholder="johndoe@mail.com"
            onChange={(e) => setUser(e.target.value)}
            onBlur={(e) => setUser(e.target.value)}
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

const Update = ({
  changeStep,
  user,
  loading,
  update,
  router,
  successModal,
  failureModal,
}) => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [toggleSeePassword, setToggleSeePassword] = useState(false);

  const togglePassworView = () => {
    setToggleSeePassword(!toggleSeePassword);
  };

  const checkFields = async (e) => {
    e.preventDefault();
    loading(true);
    let isValid = true;

    if (code === "") {
      setCodeError("Please enter an code");
      isValid = false;
      loading(false);
    }

    // Validate password
    let passwordValid = true;
    if (!password) {
      setPasswordError("Please enter a password");
      passwordValid = false;
      isValid = false;
    } else {
      let passwordErrors = [];

      // Check for minimum length
      if (password.length < 8) {
        passwordErrors.push("at least 8 characters long");
      }

      if (!/[A-Z]/.test(password)) {
        passwordErrors.push("at least one capital letter");
      }

      if (!/\d/.test(password)) {
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
      if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
        isValid = false;
      } else {
        setConfirmPasswordError("");
      }
    } else {
      setConfirmPasswordError(passwordError);
    }

    //run operation if is valid is true else stop loading
    if (isValid) {
      const response = await update(user, password, code);
      if (response.status === 200) {
        setSuccess(
          "Password successfully changed please go to our login page to sign!"
        );
        loading(false);
        successModal();
        // router.push("/login");
      } else {
        setError(response.message);
        loading(false);
        failureModal();
      }
    } else {
      loading(false);
      failureModal();
    }
  };

  return (
    <form>
      <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
        <span>
          <small>Please enter code sent to {user.email}</small>
          <input
            name="code"
            value={code}
            type="text"
            required
            placeholder="Confirmation Code"
            onChange={(e) => setCode(e.target.value)}
            onBlur={(e) => setCode(e.target.value)}
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
            value={password}
            type={toggleSeePassword ? "text" : "password"}
            required
            placeholder="**************"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={(e) => setConfirmPassword(e.target.value)}
          />
          <small className="error">{confirmPasswordError}</small>
        </span>
        <FontAwesomeIcon
          icon={faEye}
          onClick={togglePassworView}
          className={styles.icon}
        />
      </div>

      <div style={{ gridColumn: "span 2" }} className="success">
        {success}
      </div>

      <div style={{ gridColumn: "span 2" }} className="error">
        {error}
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

      {/* <button type="button" onClick={changeStep} className="main-button">
        Resend Email
      </button> */}
    </form>
  );
};

const requestCode = async (user) => {
  const apiEndpoint =
    "https://jobbunnyapi.com/jobbunnyapi/v1/forgot_pass_request";
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user }),
    });
    const responseData = await response.json();

    // Directly use the HTTP status code from the response
    // And ensure responseData.status is passed through if it's available
    const status = responseData.status || response.status;
    const message = responseData.message || "An unexpected error occurred";

    return { status, message };
  } catch (error) {
    console.error("Request error:", error);
    return {
      status: 500,
      message: "Network error or unable to connect to the server",
    };
  }
};

const updatePassword = async (user, password, code) => {
  const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/update_password";
  const response = await fetch(apiEndpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      security_code: code,
      new_pass: password,
    }),
  });
  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return { status: 200, message: "Success" }; // Assuming a successful operation returns HTTP 200
  } else {
    return {
      status: response.status,
      message: responseData.message || "An error occurred",
    };
  }
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(true); //request -> true , update -> false

  const changeStep = () => {
    setStep(!step);
  };

  const toggleSuccess = () => {
    setSuccess(!success);
  };

  const toggleFailure = () => {
    setFailure(!failure);
  };

  return (
    <>
      {success && (
        <MessageModal
          status={"Success"}
          message={
            "Your password has successefully changed! Please navigate to the login page and try logging in."
          }
          close={toggleSuccess}
        />
      )}

      {failure && (
        <MessageModal
          status={"Failure"}
          message={
            "It seems like something went wrong, please reload the page and try again."
          }
          close={toggleFailure}
        />
      )}

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
          <Update
            user={user}
            changeStep={changeStep}
            loading={setIsLoading}
            update={updatePassword}
            router={router}
            successModal={toggleSuccess}
            failureModal={toggleFailure}
          />
        )}
      </div>
    </>
  );
}
