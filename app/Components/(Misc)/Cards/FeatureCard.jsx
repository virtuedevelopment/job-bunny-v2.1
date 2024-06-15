"use client";
import React from "react";
import styles from "./cards.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronRight, SquareActivity } from "lucide-react";

export default function FeatureCard({ feature }) {

  const { data, status } = useSession();
  const router = useRouter();

  const sendToRoute = (e) => {
    if (data && data.user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={styles.feature}>
      <small>
        <SquareActivity />
      </small>

      <div className={styles.info}>
        <h2>{feature.name}.</h2>
        <p>{feature.description}</p>
      </div>

      <button onClick={sendToRoute}>
        View
        <ChevronRight />
      </button>
    </div>
  );
}
