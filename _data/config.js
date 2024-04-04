//imports for configurations
import { faHouse, faTag, faEnvelope, faUserPlus, faAddressCard, faMagnifyingGlass, faRepeat, faBell, faLocationCrosshairs, faSliders, faGauge, faCheckCircle, faEye, faGear, faClock, faUserTie, faShieldHalved, faBoltLightning, faCode, faSackDollar, faDatabase } from '@fortawesome/free-solid-svg-icons';
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
        { route: 'Search Engine', url: '/dashboard/search', icon: faMagnifyingGlass },
        { route: 'Auto Applications', url: '/dashboard/auto-apply', icon: faCheckCircle },
        { route: 'Company Watch', url: '/dashboard/company-watch', icon: faEye },
        { route: 'Profile and Settings', url: '/dashboard/settings', icon: faGear }
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
        [
            { text: 'Administrator', icon: faUserTie },
            { text: 'Security', icon: faShieldHalved },
            { text: 'Electrician', icon: faBoltLightning },
            { text: 'Web Designer', icon: faCode },
            { text: 'Sales Advisor', icon: faSackDollar },
            { text: 'Data Analyst', icon: faDatabase }
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
            icon: faBell,
            description: 'Get instant alerts on new openings at companies you want to work at.'
        },
        {
            name: 'Application Tracking',
            icon: faLocationCrosshairs,
            description: 'Get instant alerts on new openings at companies you want to work at.'

        },
        {
            name: 'Unique Filters',
            icon: faSliders,
            description: 'Get instant alerts on new openings at companies you want to work at.'
        },
        {
            name: 'Real Time Updates',
            icon: faClock,
            description: 'Get instant alerts on new openings at companies you want to work at.'
        }
    ],
    faq: [
        {
            title: 'Sources of our Job Listings',
            description: 'Our job listings are sourced from major job boards worldwide, as well as directly from company websites. This diverse selection ensures a wide range of job choices for our users. Each listing includes a redirect link to the original source for further information.'
        },
        {
            title: 'Auto Application Feature',
            description: 'Auto applications streamline the job application process by submitting applications on your behalf, without any manual effort required from you as the job seeker. Our platform can submit hundreds of applications per day, saving you time and effort in your job search.'
        },
        {
            title: 'Premium Immigration Filter',
            description: 'Our immigration filter simplifies the process of finding job opportunities that offer work sponsorship. This feature allows you to easily identify jobs that align with your immigration needs, helping you narrow down your job search to relevant opportunities.'
        },
        {
            title: 'Choosing the Right Plans',
            description: 'We offer a range of affordable pricing plans tailored to the needs of job seekers. Each plan comes with different benefits, so we recommend selecting the one that best suits your individual requirements and preferences.'
        },
        {
            title: 'Contacting JobBunny',
            description: 'For all inquiries and assistance, our support team is available via email at support@jobbunny.co. Please allow up to 48 hours for a response, as we strive to provide timely and helpful support to all our users.'
        }
    ]
}

export default configurations