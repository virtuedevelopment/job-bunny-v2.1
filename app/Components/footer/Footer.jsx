import React from 'react'
import configurations from '@/_data/config'
import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <section className={styles.main}>
        <div className="grid-3x-display">
            <span>
                <h2>Want to apply to 400+ Jobs?</h2>
                <small>Use our Auto Apply Feature</small>
            </span>

            <span>
                <h2>Want to immigrate via a job?</h2>
                <small>Use our sponsorship Filter</small>
            </span>

            <span>
                <h2>Want to work at a Top Company?</h2>
                <small>Use our Companny Alerts Feature</small>
            </span>
        </div>
        <Link href={'/signup'} className="main-button">Get Started</Link>
        <p className="logo">#jobbunny</p>
        <div className={styles.footerOptions}>
            <p>{configurations.copyright}</p>
            {configurations.footerRoutes.map((route)=>(
                <Link key={route.url} href={route.url}>{route.route}</Link>
            ))}
        </div>
    </section>
  )
}
