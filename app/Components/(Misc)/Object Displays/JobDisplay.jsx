"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./display.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faFileSignature,
  faBuilding,
  faClock,
  faStar,
  faBriefcase,
  faCompass
} from "@fortawesome/free-solid-svg-icons";

export default function JobDisplay({ job, index }) {
  const [premium, setPremium] = useState(false); //determines type of job

  //use effect to determine if job is premium
  useEffect(() => {
    if (job && job.visa_sponsored === 1) {
      setPremium(true);
    }
  }, [job]);

  //util functions
  const convertDate = (pubDate) => {
    const now = new Date();
    const publishedDate = new Date(pubDate.split(",")[0]); // Using only the date part, ignoring time

    // Calculate the difference in days
    const timeDiff = now - publishedDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "today";
    } else if (daysDiff === 1) {
      return "yesterday";
    } else {
      return `${daysDiff} days ago`;
    }
  };

  return (
    <>
      {job && (
        <Link target="_blank" className={styles.jobItem} href={job.job_Url}>
          <span className={premium ? styles.jobtagPremium : styles.jobtag}>
            {premium ? (
              <>
                <FontAwesomeIcon icon={faStar} />
                <p>Visa Sponsored</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCircleCheck} />
                <p>Verified Position</p>
              </>
            )}
          </span>

          <h3>{job.job_title}</h3>

          <span className={styles.location}>
            <p><FontAwesomeIcon icon={faBriefcase}/> {job.company}</p>
            <p><FontAwesomeIcon icon={faCompass}/> {job.location}</p>
          </span>

          <div className={styles.details}>
            {job.job_Type && (
              <span>
                <FontAwesomeIcon icon={faFileSignature} />
                <p>{job.job_Type}</p>
              </span>
            )}

            {job.job_type_cat && (
              <span>
                <FontAwesomeIcon icon={faBuilding} />
                <p>{job.job_type_cat}</p>
              </span>
            )}

            {job.job_site && (
              <span>
                <FontAwesomeIcon icon={faClock} />
                <p>
                  Posted on {job.job_site}, {convertDate(job.pub_date)}{" "}
                </p>
              </span>
            )}
          </div>
        </Link>
      )}
    </>
  );
}
