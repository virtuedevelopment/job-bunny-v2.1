"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./staticS.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function StaticSearch() {
  const { data, status } = useSession();
  const router = useRouter();
  const sendToRoute = (e) => {
    e.preventDefault();

    if (data && data.user) {
      router.push("/dashboard/search");
    } else {
      router.push("/signup");
    }
  };

  return (
    <form onSubmit={sendToRoute} className={styles.inputbox}>
      <span>
        <input type="text" placeholder="Search for a job title.." />
      </span>
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
