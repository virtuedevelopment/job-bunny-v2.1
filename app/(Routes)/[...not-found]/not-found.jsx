import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './notfound.module.css'


export default function NotFound() {
  return (
    <section className={styles.main} >
        <h1>Page Not Found.</h1>
        <Image width={200} height={350} src={'/notfound.svg'} alt='Page 404 Not Found' />
        <p>Sorry we could not find what you are looking for. Go back to the <Link href={'/'} >Homepage</Link>.</p>
    </section>
  )
}
