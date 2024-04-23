//this is a non-UI component that redirects the user to a the login page if they try to go on a route only exists for users
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Redirect() {
  const router = useRouter();
  const { data, status } = useSession();

  //if session does not exist redirect user to login page
  useEffect(() => {
    if (!data || !data.user) {
      router.push("/login");
    }
  }, [data, router]);

  return <></>;
}
