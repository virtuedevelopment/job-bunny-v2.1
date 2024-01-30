"use client"
import React,{useState, useEffect} from 'react'
import { useSession, signOut } from "next-auth/react";
import styles from './navbar.module.css'
import Link from 'next/link'
import configurations from '@/_data/config'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Authbox() {

  const { data, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };
  
  return (
    <div className={styles.authbox}>
    {data ? (
      <>
        <Link className="secondary-button" href='/dashboard'>
          <FontAwesomeIcon icon={faUser} />
          Dashboard
        </Link>
        <button onClick={handleLogout} className="main-button">Logout</button>
      </>
    ) : (
      <>
        <Link className="secondary-button" href='/login'>
          Login
        </Link>
        
        <Link className="main-button" href='/signup'>
          Get Started
        </Link>
      </>
    )}
  </div>
  )
}
