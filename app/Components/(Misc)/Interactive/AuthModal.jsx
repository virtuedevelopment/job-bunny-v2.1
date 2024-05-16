"use client";
import React, { useState, useEffect } from "react";
import styles from "./interactive.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthModal({ close, push_search }) {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <section className={styles.modalBox}>
      <div className={styles.modalView}>
        <button onClick={close} className={styles.modalclose} type="button">
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>

        {data && data.user ? (
          <div className={styles.container}>
            <div className={styles.imagebox}>
              <Image
                src={"/loginbackground.svg"}
                width={500}
                height={500}
                alt="image"
              />
            </div>
            <div className={styles.infobox}>
              <h2>
                Discover our premium search engine<span>.</span>
              </h2>
              <h4>
                HEY {data?.user?.name?.first?.toUpperCase()}, YOU CAN CHECK OUT
                THE FULL SEARCH ENGINE BELOW.{" "}
              </h4>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBlock: "1rem",
                }}
              >
                <Link
                  className="main-button"
                  href={{
                    pathname: "/dashboard/search",
                    query: { search: push_search },
                  }}
                >
                  Search Engine
                </Link>
                <Link className="primary-button" href={"/dashboard"}>
                  Dashboard
                </Link>
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.imagebox}>
              <Image
                src={"/loginbackground.svg"}
                width={500}
                height={500}
                alt="image"
              />
            </div>
            <div className={styles.infobox}>
              <h2>
                We would love to help you<span>.</span>
              </h2>
              <h4>LOGIN OR SIGNUP TO SEE OUR FULL SEARCH ENGINE.</h4>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBlock: "1rem",
                }}
              >
                <Link className="main-button" href={"/login"}>
                  Login
                </Link>
                <Link className="primary-button" href={"/signup"}>
                  Signup
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
