"use client";
import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import MessageModal from "@/app/Components/(Misc)/Interactive/MessageModal";

export default function ContactForm() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const toggleSuccess = () => {
    setSuccess(!success);
  };

  const toggleFailure = () => {
    setFailure(!failure);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //create rquest body
    const reqBody = {
      email: email,
      message: message,
    };

    //make request
    const response = await fetch(
      "https://jobbunnyapi.com/jobbunnyapi/v1/contact_form_post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const data = await response.json();

    //get response
    if (response.ok) {
      if (data && data.status === 200) {
        toggleSuccess();
        setResponse(
          "Your message has been successfully received. We appreciate your interest and are excited to connect with you. One of our team members will be in touch as soon as possible to assist you further."
        );
        setIsLoading(false);
      } else {
        toggleFailure();
        setResponse(
          "It seems there was an issue submitting your form. We apologize for any inconvenience this may have caused. Please try submitting the form again, and if the problem persists, do not hesitate to reach out to us directly."
        );
        setIsLoading(false);
      }
    } else {
      toggleFailure();
      setResponse(
        "It seems there was an issue submitting your form. We apologize for any inconvenience this may have caused. Please try submitting the form again, and if the problem persists, do not hesitate to reach out to us directly."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      {success && (
        <MessageModal
          status={"Success"}
          message={response}
          close={toggleSuccess}
        />
      )}

      {failure && (
        <MessageModal
          status={"Failure"}
          message={response}
          close={toggleFailure}
        />
      )}
      <form onSubmit={submitForm}>
        <div className="inputbox">
          <span>
            <small>Fullname:</small>
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </span>
          <FontAwesomeIcon icon={faUser} />
        </div>

        <div className="inputbox">
          <span>
            <small>Email Address:</small>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Johndoe@gmail.com"
            />
          </span>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>

        <div style={{ gridColumn: "1/-1" }} className="inputbox">
          <span>
            <small>Message</small>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
            ></textarea>
          </span>
        </div>

        <button
          style={{ gridColumn: "1/-1" }}
          className="primary-button"
          type="submit"
        >
          {loading ? "Loading..." : "Submit Message"}
        </button>
      </form>
    </>
  );
}
