"use client";
import React, { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import Loading from "@/app/loading";
import JobDisplay from "@/app/Components/(Misc)/Object Displays/JobDisplay";

export default function DisplayJobs() {
  const [jobs, setJobs] = useState([
  ]);
  return (
    <section className={styles.DisplayJobs}>
      {jobs.length < 1 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="job-1x-display">
            {jobs.map((job, index) => (
              <JobDisplay job={job} index={index} key={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
