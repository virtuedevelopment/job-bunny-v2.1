//imports for configurations
import { faFacebook, faInstagram, faXTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import {faHouse, faTag, faEnvelope, faUserPlus,faAddressCard} from '@fortawesome/free-solid-svg-icons';
//define configurations
const configurations = {
    title: 'Job Bunny © ',
    description: '',
    keywords: [],
    author: '',
    baseUrl: '',
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