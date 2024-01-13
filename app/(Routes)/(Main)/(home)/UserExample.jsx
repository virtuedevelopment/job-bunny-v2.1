import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserExample({user}) {
  return (
    <div className={styles.exampleBox} >
      <Image src={user.url} height={700} width={700} alt="User Example" />
      <div className={styles.information} >
        <small>{user.name}, {user.age}, <span><FontAwesomeIcon className={styles.icon} icon={faLocationDot}/> {user.location} </span> </small>
        <small>{user.position}</small>
      </div>
    </div>
  );
}
