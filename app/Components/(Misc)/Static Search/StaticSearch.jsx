"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './staticS.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function StaticSearch() {

    const router = useRouter();
    const sendToRoute = (e) =>{
        e.preventDefault()
        router.push('/signup')
    }

  return (
   <form onSubmit={sendToRoute} className={styles.inputbox} >
        <input type="text" placeholder='Search for a job title..' />
        <button type='submit'><FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}></FontAwesomeIcon></button>
   </form>
  )
}
