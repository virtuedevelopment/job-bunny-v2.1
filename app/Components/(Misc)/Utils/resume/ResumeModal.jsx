"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./resume.module.css";
import { useSession } from "next-auth/react";
import {
  faCloudArrowUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { FileText, LoaderCircle, BadgeCheck } from "lucide-react";
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
  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB"; // Convert bytes to MB and format to 2 decimal places
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
            <div>
              <h2>Upload Resume File</h2>
              <small>Upload your resume to your account (PDF)</small>
            </div>

            {isLoading ? (
              <div className={styles.loading}>
                <LoaderCircle strokeWidth={1.25} />
                <p>Loading please wait...</p>
              </div>
            ) : isUploaded ? (
              <div className={styles.complete}>
                <BadgeCheck strokeWidth={1.5} />
                <big>Thank you for uploading your resume!</big>
                <small>Now we can help you find more accurate jobs.</small>
                <button
                  onClick={() => {
                    setModalToggled(false);
                  }}
                >
                  close
                </button>
              </div>
            ) : (
              <>
                <div className={styles.upload}>
                  <input
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="file-upload"
                    onChange={handleFileUpload}
                  />
                  <FileText strokeWidth={1.25} />
                  <p>
                    Not uploaded?{" "}
                    <label htmlFor="file-upload">choose file(s)</label>{" "}
                  </p>
                </div>

                <label className={styles.filedisplay} htmlFor="file-upload">
                  <span>
                    <FileText strokeWidth={1.25} />
                    <big> {resume ? resume.name : "No file selected"}</big>
                  </span>
                  <small>
                    {resume ? formatFileSize(resume.size) : "0.00 MB"}
                  </small>
                </label>

                <div className={styles.buttons}>
                  <button
                    onClick={() => {
                      setModalToggled(false);
                    }}
                    id={styles.cancel}
                  >
                    Cancel
                  </button>
                  <button onClick={uploadResume} id={styles.upload}>
                    Upload
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
