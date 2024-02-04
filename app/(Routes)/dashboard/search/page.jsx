"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Loading from "@/app/loading";
import styles from "./search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  

    const getResults = async(e) =>{
        e.preventDefault()
    }

  return (
    <main className={styles.main}>
      {/* SEARCH BAR NATIVE */}
      <section className={styles.searchBox}>
        <div style={{animationDelay:'0.5s'}} className={styles.inputBox}>
          <span>
            <input type="text" name="search" placeholder="Search..." />
            <small className="error"></small>
          </span>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} onClick={getResults} />
        </div>
        {/* Filters */}
        <div style={{animationDelay:'0.75s'}} className={styles.inputBox}>
          <span className={styles.filterSpan} >
            <small>Filters</small>
            <div>
            <select>
              <option value={null}>Select Job Board</option>
            </select>
            
            <select>
              <option value={null}>Select Experience Level</option>
            </select>

            <select>
              <option value={null}>Select Employment Type</option>
            </select>

            <select>
              <option value={null}>Select Work Location</option>
            </select>

            <select>
              <option value={null}>Select Date Range</option>
            </select>

            <select>
              <option value={null}>Select Minimum Salary</option>
            </select>
            </div>
          </span>
        </div>

        {/* Dropdown */}
      </section>

      {/* CONDITIONALLY DISPLAYED JOB DISPLAY */}

      {/* NEXT BUTTON TO TRIGGER MORE SEARCHES */}
    </main>
  );
}
