"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./resume.module.css";
import { useSession } from "next-auth/react";
import {
  faCloudArrowUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "@/app/loading";

export default function ResumeModal() {
  const { data: session, status } = useSession();
  const [modalToggled, setModalToggled] = useState(false);
  const [resume, setResume] = useState(null); // Initialize with null
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noFile, setNoFile] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const fetchResumeStatus = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            "https://jobbunnyapi.com/jobbunnyapi/v1/check_resume_status",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: session.user.email, // Assuming the email is used as the username
                jb_token: session.user.jb_token, // Assuming the session contains an accessToken
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();

            console.log(data);

            if (data.result === false) {
              setModalToggled(true);
            }
          } else {
            console.error(
              "Failed to fetch resume status:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error fetching resume status:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResumeStatus();
    }
  }, [status, session]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      setNoFile(false); // Reset noFile state when a file is selected
    }
  };

  const uploadResume = async () => {
    if (resume === null) {
      setNoFile(true);
      alert("Please select a file before uploading.");
    } else {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", resume);

      try {
        const response = await fetch(
          "https://jobbunnyapi.com/jobbunnyapi/v1/resume_upload",
          {
            method: "POST",
            headers: {
              username: session.user.email,
              token: session.user.jb_token,
            },
            body: formData,
          }
        );

        if (response.ok) {
          setIsUploaded(true);
        } else {
          console.error("Failed to upload resume:", response.statusText);
          alert("Failed to upload resume. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Error uploading resume. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {modalToggled && (
        <section className={styles.modalback}>
          <div className={styles.modalbox}>
            <Image
              width={250}
              height={250}
              src={"/loginbackground.svg"}
              alt="background"
            />

            <div className={styles.uploadbox}>
              <div className={styles.title}>
                <big>GET YOUR JOB SEARCH STARTED</big>
                <h1>
                  Upload Your Resume<span>.</span>
                </h1>
              </div>

              {isLoading ? (
                <Loading />
              ) : isUploaded ? (
                <div className={styles.complete}>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <h3>Resume Upload Complete!</h3>
                  <p>
                    Thank you for uploading your resume, your job searches will
                    now be tailored to you.
                  </p>
                  <button
                    onClick={() => {
                      setModalToggled(false);
                    }}
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div className={styles.uploadModule}>
                  <input
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="file-upload"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className={styles.uploadButton}>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </label>
                  <label htmlFor="file-upload">
                    <span
                      style={{
                        border: noFile ? "solid 1px red" : "none",
                      }}
                    >
                      {resume ? resume.name : "No file selected"}
                    </span>
                  </label>

                  <button onClick={uploadResume}>
                    Upload Resume
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
