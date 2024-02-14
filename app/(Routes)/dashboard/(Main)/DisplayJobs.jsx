"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../dashboard.module.css";
import Loading from "@/app/loading";
import JobDisplay from "@/app/Components/(Misc)/Object Displays/JobDisplay";

export default function DisplayJobs() {
  const { data, status } = useSession();
  const [start, setStart] = useState(0);
  const count = 30;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getJobs = async (data) => {
    //define request
    const apiEndpoint = "https://jobbunny.co/jobbunnyapi/v1/get_user_jobs";
    const requestBody = {
      username: data.user.email,
      jb_token: data.user.jb_token,
      start: start,
      count: count,
    };
    //make request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    //handle response
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data && data.user) {
        try {
          const response = await getJobs(data);
          if (response.data.length < 1) {
            setIsLoading(false);
          } else {
            setJobs(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        }
      }
    };
    fetchData();
  }, [data]);

  return (
    <section className={styles.DisplayJobs}>
      {isLoading && <Loading />}{" "}
      {/* Show loading spinner while fetching data */}
      {!isLoading && jobs.length === 0 && <p>Currently no jobs</p>}{" "}
      {/* Show message when not loading and no jobs */}
      {jobs.length > 0 && (
        <div className={styles.jobListing} >
          <h3>Recommended jobs from our premium search engine:</h3>
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
