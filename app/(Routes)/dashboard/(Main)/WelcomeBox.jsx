"use client";
import React from "react";
import { useSession } from "next-auth/react";
import configurations from "@/_data/config";
import styles from "../dashboard.module.css";
import Link from "next/link";

export default function WelcomeBox() {
  const { data, status } = useSession();
  return (
    <div className={styles.welcomeBox}>
      <div>
        <p>{data?.user?.name?.first}&nbsp;{data?.user?.name?.last}</p>
        <small>
          <Link href={"/dashboard/settings"}>Edit Profile</Link>
        </small>
      </div>

      <div style={{textAlign:"right"}} >
        <p>Starter Plan</p>
        <small>
          <Link href={"/plans"}>Upgrade</Link>
        </small>
      </div>
    </div>
  );
}
