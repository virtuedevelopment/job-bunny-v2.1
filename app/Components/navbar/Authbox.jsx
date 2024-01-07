"use client"
import React,{useState, useEffect} from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import configurations from '@/_data/config'

export default function Authbox() {
  return (
    <div className={styles.authbox} >
        <Link href={'/login'} className="secondary-button">Login</Link>
        <Link href={'/signup'} className="main-button">Get Started</Link>
    </div>
  )
}
