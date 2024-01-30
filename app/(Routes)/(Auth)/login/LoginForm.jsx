"use client";
import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/loading";
import { faIdBadge, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginForm() {

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading immediately upon form submission

    let hasError = false;
    if (!email) {
      setEmailError("Please enter an email");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // Simulate a delay of 3 seconds
    setTimeout(async () => {
      if (!hasError) {
        // Perform your login logic here if there are no errors
        // Example: await loginUser({ email, password });
        const result = await signIn('credentials', {
          username: email,
          password: password,
          redirect: false,
        })

        if(result.error){
          setAuthError("Username or password is incorrect please try again.")
          setIsLoading(false); // Stop loading after the delay
        } else {
          await getSession();
          router.push('/dashboard')
          window.location.href = window.location.origin + '/dashboard';
          setIsLoading(false); // Stop loading after the delay
        }
      }
      // If there are errors, the function simply ends here after stopping the loading state
    }, 1500);
  };
  const handleChange = (e) => {
    setAuthError("");
    const { name, value } = e.target;

    // Set the target value to each field (email and password) and clear error messages
    if (name === "email") {
      setEmail(value);
      setEmailError(""); // Clear the email error message
    }
    if (name === "password") {
      setPassword(value);
      setPasswordError(""); // Clear the password error message
    }
  };
  const togglePassworView = () =>{
    setToggleSeePassword(!toggleSeePassword)
  };

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toggleSeePassword, setToggleSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  return (
    <div className={styles.loginFormBox}>
      <div className={styles.title}>
        <big>CONTINUE YOUR JOURNEY</big>
        <h1>
          Welcome Back<span>.</span>
        </h1>
        <small>
          Not a member yet? <Link href={"/signup"}>Sign up</Link>
        </small>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={submit}>
          <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
            <span>
              <small>Email</small>
              <input
                name="email"
                value={email}
                type="email"
                required
                placeholder="Johndoe@gmail.com"
                onChange={handleChange}
                onBlur={handleChange} //handleinput on blur and on change
              />
              <small className="error">{emailError}</small>
            </span>
            <FontAwesomeIcon icon={faIdBadge} className={styles.icon} />
          </div>

          <div style={{ gridColumn: "span 2" }} className={styles.inputBox}>
            <span>
              <small>Password</small>
              <input
                name="password"
                value={password}
                type={toggleSeePassword ? ('text'):('password')}
                required
                placeholder="************"
                onChange={handleChange}
                onBlur={handleChange}
              />
              <small className="error">{passwordError}</small>
            </span>
            <FontAwesomeIcon onClick={togglePassworView} icon={faEye} className={styles.icon} />
          </div>

          {authError && (<span className={styles.loginError} style={{ gridColumn: "span 2" }} >{authError}</span>)}

          <button
            type="submit"
            style={{ gridColumn: "span 2" }}
            onClick={submit}
            className="primary-button"
          >
            Login
          </button>

          <p
            className={styles.forgotPasswordPrompt}
            style={{ gridColumn: "span 2" }}
          >
            Forgot your password?{" "}
            <Link href={"/forgot-password"}>Click Here</Link>
          </p>
        </form>
      )}
    </div>
  );
}
