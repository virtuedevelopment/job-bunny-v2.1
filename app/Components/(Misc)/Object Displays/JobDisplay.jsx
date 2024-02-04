import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./display.module.css";

export default function JobDisplay({ job, index }) {
  return (
    <>
      {job && (
        <Link className={styles.jobItem} href={job.job_Url}>
          <div>
            <p>{job.job_title}</p>
            <span>
              { job.job_Type &&(<small>{job.job_Type}</small>)}
              {job.job_type_cat && (<small>{job.job_type_cat}</small>)}
              <small>{job.job_site}</small>
            </span>
          </div>

          <div>
            <p>{job.company}</p>
            <small>{job.location}</small>
          </div>
        </Link>
      )}
    </>
  );
}
