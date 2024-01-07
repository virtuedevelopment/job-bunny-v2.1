//imports for configurations
import { faFacebook, faInstagram, faXTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {faHouse, faTag, faEnvelope, faUserPlus,faAddressCard} from '@fortawesome/free-solid-svg-icons';
//define configurations
const configurations = {
    title: 'Job Bunny © ',
    description: 'Embark on your career journey with Job Bunny, the ultimate web app for job seekers. Effortlessly search for jobs, automate your applications, receive instant alerts on new opportunities, and track all your applications in one convenient place. Simplify your job hunt and find your perfect match with Job Bunny!',
    keywords: ['Job Search', 'Employment Opportunities', 'Job Alerts', 'Job Seeker'],
    author: 'Job Bunny Corporation',
    baseUrl: 'https://www.jobbunny.co',
    language: 'en',
    socialLinks: [],
    icon: '',
    contact: {
        email: '',
        phone: '',
    },
    mainRoutes: [
        {
            route: 'Home',
            url: '/',
            icon: faHouse ,
        },
        {
            route: 'Features',
            url: '/features',
            icon: faTag ,
        },
        {
            route: 'Get in Touch',
            url: '/contact',
            icon: faEnvelope ,
        }
    ],
    authRoutes: [
        {
            route: 'Login',
            url: '/login',
            icon: faAddressCard
        },
        {
            route: 'Signup',
            url: '/signup',
            icon: faUserPlus
        }
    ],
    userRoutes: [],
    adminRoutes: [],
    popSearches: ['Administrator','Delivery Driver','Electrician','Web Designer','Sales Advisor','Data Analyst']
}

export default configurations