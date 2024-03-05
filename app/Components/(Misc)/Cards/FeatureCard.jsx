import React from "react";
import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureCard({ feature }) {
  return (
    <div className={styles.feature}>
      <span>
        <FontAwesomeIcon icon={feature.icon} />
        <h2>{feature.name}</h2>
      </span>

      <p>{feature.description}</p>
    </div>
  );
}
