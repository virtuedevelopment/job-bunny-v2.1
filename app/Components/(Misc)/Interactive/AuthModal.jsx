"use client";
import React, { useState, useEffect } from "react";
import styles from "./interactive.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ScanEye } from "lucide-react";

export default function AuthModal({ close, push_search }) {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <section className={styles.modalBox}>
      <div className={styles.modalView}>
        <div className={styles.buttons}>
          <button onClick={()=>close()}>Close window</button>
        </div>

        <h3>We would love to help you.</h3>
        <p>please login or signup to use our full search engine.</p>

        <div className={styles.options}>
          <Link href={"/signup"}>
            <ScanEye />
            <span>
              <big>Sign up now</big>
              <small>
                Job Bunny has various features that help make yoour job search
                easier.
              </small>
            </span>
          </Link>

          <Link href={"/login"}>
            <ScanEye />
            <span>
              <big>Login now</big>
              <small>
                Continue the journey of your job search and check in on your
                previous applications.
              </small>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
