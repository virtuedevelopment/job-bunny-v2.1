import React from 'react'
import configurations from '@/_data/config'
import styles from '../dashboard.module.css'
import seo_config from '@/_data/seo';


//Components import
import WelcomeBox from './WelcomeBox';
import DisplayJobs from './DisplayJobs';
import DashboardStatistics from './DashboardStatistics';

export const metadata = {
  title: seo_config.dashboard.title,
  description: seo_config.dashboard.description,
  keywords: seo_config.dashboard.keywords,
  author: seo_config.dashboard.author,
};

export default function Dashboard() {
  return (
    <main className={styles.main} > 
        <WelcomeBox/>
        {/* <DashboardStatistics/> */}
        <DisplayJobs/>
    </main>
  )
}
