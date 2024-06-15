"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./interactive.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
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
        <Image
          src={"/loginbackground.svg"}
          width={500}
          height={500}
          alt="background img"
        />

        <div className={styles.message}>
          <div className={styles.box}>
            <FontAwesomeIcon
              style={{ color: status === "Success" ? "#77dd77" : "#e34234" }}
              icon={status === "Success" ? faCircleCheck : faCircleExclamation}
            />

            <h3>{status}</h3>

            <p>{message ? message : "message goes here for the text."}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleClick} >Close Window</button>
        </div>

        {/* <button onClick={handleClick}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div className={styles.modalMessageBox}>
          <FontAwesomeIcon
            style={{ color: status === "Success" ? "#77dd77" : "#e34234" }}
            icon={status === "Success" ? faCircleCheck : faCircleExclamation}
          />
          <h3>{status}</h3>
          <p>{message ? (message):("message goes here for the text.")}</p>
        </div> */}
      </div>
    </div>
  );
}
