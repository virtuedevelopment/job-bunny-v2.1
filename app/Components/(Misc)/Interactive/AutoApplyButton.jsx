"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./interactive.module.css";
import { CircleFadingPlus } from "lucide-react";

export default function AutoApplyButton({ job }) {
  const router = useRouter();
  const click = () => {
    router.push("/dashboard/auto-apply");
  };

  return (
    <button className={styles.auto_app_btn} onClick={click}>
      Auto Apply
      <CircleFadingPlus />
    </button>
  );
}
