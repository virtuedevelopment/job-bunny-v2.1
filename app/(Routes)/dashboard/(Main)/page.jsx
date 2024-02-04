import React from 'react'
import configurations from '@/_data/config'
import styles from '../dashboard.module.css'


//Components import
import WelcomeBox from './WelcomeBox';
import DisplayJobs from './DisplayJobs';
import DashboardStatistics from './DashboardStatistics';

export default function Dashboard() {
  return (
    <main className={styles.main} > 
        <WelcomeBox/>
        <DashboardStatistics/>
        <DisplayJobs/>
        <div className={styles.secondaryApps} >
            
        </div>
    </main>
  )
}
