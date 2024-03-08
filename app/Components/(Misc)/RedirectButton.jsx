"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RedirectButton({ prompt, loggedin, loggedout, theme }) {
  const router = useRouter();
  const { data, status } = useSession();
  const sendToRoute = (e) => {
    if (data && data.user) {
      router.push(loggedin);
    } else {
      router.push(loggedout);
    }
  };

  return (
    <button onClick={sendToRoute} className={theme}>
      {prompt}
    </button>
  );
}
