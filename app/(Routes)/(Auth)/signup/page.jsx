import React from 'react'
import SignUpForm from './SignUpForm'
import styles from '../auth.module.css'

export default function Signup() {
  return (
    <main className={styles.main} >
      <section className={styles.signup} >
          <div className={styles.image} ></div>
          <SignUpForm/>
      </section>
    </main>
  )
}
