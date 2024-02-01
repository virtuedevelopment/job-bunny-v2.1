"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../dashboard.module.css'
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';

export default function DashboardStatistics() {
    const { data, status } = useSession();
    const [applied, setApplied] = useState (123) // number of jobs applied to
    const [jobs, setJobs] = useState(475) // number of applied jobs

    const [interviews, setInterviews] = useState(22) // interviews
    const [companyAlert, setCompanyAlerts] = useState(148) // amount of company alerts from watch app



  return (
    <section className={styles.statistics} >

        <span className='locked' >
            <FontAwesomeIcon icon={faLock} className='icon' />
            <p>This feature is currently locked.</p>
        </span>

        <div>
            <small className='warning messageloading' >Applications Submited <FontAwesomeIcon icon={faCircle} className={styles.icon} /> </small>
            <big>{applied}/{jobs}</big>
        </div>

        <div>
            <small className='warning messageloading' >Interviews <FontAwesomeIcon icon={faCircle} className={styles.icon}/> </small>
            <big>{interviews}</big>
        </div>

        <div>
            <small className='success messageloading' >Comapany Alerts<FontAwesomeIcon icon={faCircle} className={styles.icon}/> </small>
            <big>{companyAlert}</big>
        </div>

        <div>
            <small className=' error messageloading' >Applications Rejected<FontAwesomeIcon icon={faCircle} className={styles.icon}/> </small>
            <big>{companyAlert}</big>
        </div>


    </section>
  )
}
