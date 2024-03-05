import React from "react";
import styles from "./cards.module.css";
import Image from "next/image";

export default function GraphicCard({ graphic, message }) {
  return (
    <div className={styles.graphicCard} >
        <Image src={graphic} width={150} height={150} alt="graphic" />
        <h2>{message}</h2>
    </div>
  );
}
