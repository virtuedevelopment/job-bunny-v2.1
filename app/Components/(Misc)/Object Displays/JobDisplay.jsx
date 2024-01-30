import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './display.module.css'

export default function JobDisplay({job, index}) {
  return (
    <Link className={index%2== 0? (styles.jobItem):(styles.jobItemAlt)}  href={job.url}>
        test
    </Link>
  )
}
