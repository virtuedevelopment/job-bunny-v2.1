"use client";
//this component will display listings using an infinite scroll pagination pattern
import styles from "./interactive.module.css";
import React, { useState, useEffect, useRef } from "react";
import JobDisplay from "../Object Displays/JobDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function InifiniteScroll({ listings, update, info }) {
  //initialize scroll position listener for the listings component
  const [isLoading, setIsLoading] = useState(false);
  const listingsRef = useRef(null); // Ref for the scrollable section

  //create a useEffect that checks when the scroll position is halfway through the list and then call the update function, which will update the listinging being displayed

  const handleScroll = () => {
    // Ensure we have a ref and we're not already loading
    if (!isLoading && listingsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listingsRef.current;
      const isTwoThirdsScrolled =
        scrollTop / (scrollHeight - clientHeight) > 0.66; // Two-thirds down

      if (isTwoThirdsScrolled) {
        setIsLoading(true); // Prevent further calls
        update().finally(() => {
          setIsLoading(false); // Reset loading state once update is complete
        });
      }
    }
  };

  useEffect(() => {
    const listingsElement = listingsRef.current;
    if (listingsElement) {
      listingsElement.addEventListener("scroll", handleScroll);

      // Cleanup function to remove event listener
      return () => listingsElement.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  return (
    <section className={styles.listings} ref={listingsRef}>
      <div className={styles.informationBox}>
          <span>
            <FontAwesomeIcon icon={faCircleInfo}/>
            <p>750 Results</p>
          </span>
      </div>
      {listings &&
        listings.map((job, index) => (
          <JobDisplay job={job} key={index} index={index} />
        ))}
    </section>
  );
}
