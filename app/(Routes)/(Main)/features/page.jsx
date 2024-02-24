import React from "react";
import styles from "./features.module.css";
import configurations from "@/_data/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Features() {
  return (
    <main>
      <section className={styles.focus}>
        <div>
        <h2>Focus on maximizing your employment opportunities</h2>
            <p>We simplify the manual work by 100x.</p>
        </div>

        <div></div>
      </section>

      <section className={styles.auto}>
        <div>
            <h2>It takes on average 20-30 minutes to complete a job application.</h2>
            <p>Image having to spend 0 minutes.</p>
        </div>

        <div>
            <Image src={'/jobs.svg'} width={600} height={600} alt="photo" />
        </div>
      </section>

      <section className={styles.advantages}>
        <h3>Our other advantages</h3>
        <div className={styles.featuresList}>
          <div className={styles.card}>
            <big>
              {configurations.features[2].name}{" "}
              <FontAwesomeIcon icon={configurations.features[2].icon} />{" "}
            </big>
            <p>{configurations.features[2].description}</p>
          </div>

          <div className={styles.card}>
            <big>
              {configurations.features[3].name}{" "}
              <FontAwesomeIcon icon={configurations.features[3].icon} />{" "}
            </big>
            <p>{configurations.features[2].description}</p>
          </div>

          <div className={styles.card}>
            <big>
              {configurations.features[4].name}{" "}
              <FontAwesomeIcon icon={configurations.features[4].icon} />{" "}
            </big>
            <p>{configurations.features[2].description}</p>
          </div>

          <div className={styles.card}>
            <big>
              {configurations.features[5].name}{" "}
              <FontAwesomeIcon icon={configurations.features[5].icon} />{" "}
            </big>
            <p>{configurations.features[2].description}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
