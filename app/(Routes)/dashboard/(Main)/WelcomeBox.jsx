"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import configurations from "@/_data/config";
import { faCrown, faRocket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../dashboard.module.css";
import Link from "next/link";

export default function WelcomeBox() {
  const { data, status } = useSession();

  return (
    <div className={styles.welcomeBox}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "0.75rem",
        }}
      >
        <div className={styles.userBox}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div>
          <p>
            {data?.user?.name?.first}&nbsp;{data?.user?.name?.last}
          </p>
          <small>
            <Link href={"/dashboard/settings"}>Edit Profile</Link>
          </small>
        </div>
      </span>

      <div style={{ textAlign: "right" }}>
        <p>
          Starter Plan <FontAwesomeIcon icon={faCrown} />
        </p>
        <small>
          <Link href={"/"}>Upgrade (Coming Soon)</Link>
        </small>
      </div>
    </div>
  );
}
