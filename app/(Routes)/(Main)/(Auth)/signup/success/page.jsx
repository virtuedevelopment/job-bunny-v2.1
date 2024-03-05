import React from 'react'
import styles from '@/app/(Routes)/(Auth)/auth.module.css'
import Link from 'next/link'

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SignupSuccess() {
  return (
    <main className={styles.main} >
        <section className={styles.messagePage} >
            <FontAwesomeIcon style={{color:"#77dd77"}} className={styles.icon} icon={faCheckCircle} />
            <h1>You have successfully signed up!</h1>
            <p>Please go to the <Link href={'/login'} >Login</Link> page to enter your dashboard. </p>

        </section>
    </main>
  )
}
