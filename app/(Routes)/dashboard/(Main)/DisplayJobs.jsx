"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../dashboard.module.css";
import Loading from "@/app/loading";
import Link from "next/link";
import JobDisplay from "@/app/Components/(Misc)/Object Displays/JobDisplay";

import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DisplayJobs() {
  const { data, status } = useSession();
  const [start, setStart] = useState(0);
  const count = 30;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJobs = async (data) => {
    const apiEndpoint = "https://jobbunnyapi.com/jobbunnyapi/v1/get_user_jobs";
    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      start: start,
      count: count,
    };
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const resdata = await response.json();

    if (resdata.status !== 200) {
      console.log("There was an error: ", resdata);
      // Potentially throw an error or return a status code to indicate failure
      return { error: true, message: resdata.message };
    }
    // Assuming `resdata.data` contains the jobs array
    return { error: false, data: resdata.data };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.user) {
        setIsLoading(true); // Ensure loading is true at the start of fetch
        try {
          const response = await getJobs(data);
          if (!response.error && response.data.length > 0) {
            setJobs(response.data);
          }
          setIsLoading(false); // Set loading to false after fetching data
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
          setIsLoading(false); // Ensure loading is set to false on error as well
        }
      }
    };
    fetchData();
  }, [data]);

  return (
    <section className={styles.DisplayJobs}>
      {isLoading && <Loading />}
      {/* Show loading spinner while fetching data */}
      {!isLoading && jobs.length === 0 && (
        <div className={styles.emptyList}>
          <FontAwesomeIcon icon={faInbox} />
          <h2>Sorry, currently no jobs fit your description.</h2>
          <p>
            Please try using our{" "}
            <Link href={"/dashboard/search"}>Search Engine</Link> to find more
            positions.
          </p>
        </div>
      )}
      {/* Show message when not loading and no jobs */}
      {jobs.length > 0 && (
        <div className={styles.jobListing}>
          {jobs.length > 0 && (
            <h3 className={styles.title}>
              Recommended jobs from our premium search engine:
            </h3>
          )}
          <div className="job-1x-display">
            {jobs.map((job, index) => (
              <JobDisplay job={job} index={index} key={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
