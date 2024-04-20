"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./interactive.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function MessageModal({ status, message, close }) {
  const router = useRouter();

  const handleClick = () => {
    close(); // Assuming `close` is a function that closes the modal
    router.refresh(); // Refresh the page
  };
  return (
    <div className={styles.modalBox}>
      <div className={styles.modalControl}>
        <img
          className={styles.modalControlImage}
          src={"/modal_graphic.svg"}
          alt="modal graphic"
        />
        <button onClick={handleClick}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className={styles.modalMessageBox}>
          <FontAwesomeIcon
            style={{ color: status === "Success" ? "#77dd77" : "#e34234" }}
            icon={status === "Success" ? faCircleCheck : faCircleExclamation}
          />
          <h3>{status}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
