//imports for configurations
import { } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faTag, faEnvelope, faUserPlus, faAddressCard, faMagnifyingGlass, faRepeat, faBell, faLocationCrosshairs, faSliders, faGauge, faCheckCircle, faEye, faGear } from '@fortawesome/free-solid-svg-icons';
//define configurations
const configurations = {
    title: 'Job Bunny © ',
    description: 'Embark on your career journey with Job Bunny, the ultimate web app for job seekers. Effortlessly search for jobs, automate your applications, receive instant alerts on new opportunities, and track all your applications in one convenient place. Simplify your job hunt and find your perfect match with Job Bunny!',
    copyright: '© Job Bunny 2024 ',
    keywords: ['Job Search', 'Employment Opportunities', 'Job Alerts', 'Job Seeker'],
    authors: [{ name: 'Job Bunny Co' }, { name: 'Virtue Technologies and Development' }],
    baseUrl: 'https://www.jobbunny.co',
    canonical: '/',
    language: 'en',
    socialLinks: [],
    icons: {
        icon: '@app/favicon.ico'
    },
    contact: {
        email: '',
        phone: '',
    },
    mainRoutes: [
        {
            route: 'Home',
            url: '/',
            icon: faHouse,
        },
        {
            route: 'Features',
            url: '/features',
            icon: faTag,
        },
        {
            route: 'Get in Touch',
            url: '/contact',
            icon: faEnvelope,
        }
    ],
    footerRoutes: [
        {
            route: 'Home',
            url: '/',
            icon: faHouse,
        },
        {
            route: 'Features',
            url: '/features',
            icon: faTag,
        },
        {
            route: 'Get in Touch',
            url: '/contact',
            icon: faEnvelope,
        },
        {
            route: 'Terms',
            url: '/terms',

        },
        {
            route: 'Privacy',
            url: '/privacy'
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
    userRoutes: [
        { route: 'Dashbaord', url: '/dashboard', icon: faGauge },
        { route: 'Search', url: '/dashboard/search', icon: faMagnifyingGlass },
        { route: 'Auto Applications', url: 'dashboard/auto-apply', icon: faCheckCircle },
        { route: 'Company Watch', url: '/dashboard/company-watch', icon: faEye},
        { route: 'Profile and Settings', url: '/dashboard/settings', icon: faGear}
    ],
    adminRoutes: [
        { route: 'dashbaord', url: '/dashboard', icon: faGauge },
        { route: 'search', url: '/dashboard/search', icon: faMagnifyingGlass },
        { route: 'auto applications', url: 'dashboard/auto-apply', icon: faCheckCircle },

    ],
    job_Boards: [
        {
            name: 'LinkedIn',
            icon: "/linkedin.svg"
        },
        {
            name: 'Indeed',
            icon: "/indeed.svg"
        },
        {
            name: 'Career Builder',
            icon: "/cb.svg"
        },
        {
            name: 'Zip Recruiter',
            icon: "/zip.svg"
        }
    ],
    popSearches:
        ['Administrator', 'Delivery Driver', 'Electrician', 'Web Designer', 'Sales Advisor', 'Data Analyst'
        ],
    features: [
        {
            name: 'Search Engine',
            icon: faMagnifyingGlass
        },
        {
            name: 'Auto Applications',
            icon: faRepeat
        },
        {
            name: 'Company Alerts',
            icon: faBell
        },
        {
            name: 'Application Tracking',
            icon: faLocationCrosshairs
        },
        {
            name: 'Unique Filters',
            icon: faSliders
        }
    ]
}

export default configurations