// All portfolio content lives here. Components only render what this file provides.
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Award,
  BarChart3,
  Clock,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Layers,
  Plug,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  ServerCog,
  TrendingUp,
} from 'lucide-react';

export const profile = {
  name: 'Ancent Mbithi',
  shortName: 'Ancent',
  role: 'Full Stack Developer',
  location: 'Nairobi, Kenya',
  email: 'ancentmbithi8@gmail.com',
  github: 'https://github.com/Ancentian',
  linkedin: 'https://www.linkedin.com/in/ancent-mbithi-8528a5127',
  cv: '/Ancent-Mbithi-CV.pdf',
  photo: '/ancent-mbithi.jpg',
  phone: '+254 795 974 284',
  whatsapp: '254795974284',
  siteUrl: 'https://ancentmbithi.vercel.app',
};

export const seo = {
  title: 'Ancent Mbithi | Full Stack Developer in Nairobi, Kenya',
  description:
    'Full stack developer in Nairobi building Laravel, React and .NET systems with M-Pesa Daraja payments, KRA eTIMS (OSCU & VSCU) integration, SMS gateways and AWS cloud infrastructure.',
  keywords: [
    'Ancent Mbithi',
    'full stack developer Kenya',
    'full stack developer Nairobi',
    'Laravel developer Kenya',
    'React developer Nairobi',
    '.NET Core developer Kenya',
    'M-Pesa Daraja integration',
    'M-Pesa developer',
    'KRA eTIMS integration',
    'eTIMS OSCU',
    'eTIMS VSCU',
    'payment gateway integration Kenya',
    'ERP developer Kenya',
    'multi-tenant SaaS',
    'AWS Kenya',
    'freelance developer Kenya',
  ],
  knowsAbout: [
    'Laravel',
    'PHP',
    'TypeScript',
    'React',
    'Angular',
    'Node.js',
    'ASP.NET Core',
    'C#',
    'Flutter',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'M-Pesa Daraja API',
    'KRA eTIMS OSCU',
    'KRA eTIMS VSCU',
    'Payment gateway integration',
    'Amazon Web Services',
    'Multi-tenant architecture',
  ],
};

export type NavItem ={ label: string; href: string; section?: string; children?: { label: string; href: string; external?: boolean }[] };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
  {
    label: 'Projects',
    href: '/#projects',
    section: 'projects',
    children: [
      { label: 'Milk Cooperative case study', href: '/work/milk-cooperative' },
      { label: 'Live websites & systems', href: '/#websites' },
      { label: 'KRA eTIMS integration', href: '/#projects' },
      { label: 'All repositories on GitHub', href: 'https://github.com/Ancentian', external: true },
    ],
  },
  { label: 'Experience', href: '/#experience', section: 'experience' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
];

export const hero = {
  badge: 'Full Stack Developer • Systems & Cloud',
  headline: 'I build software that',
  highlight: 'solves real problems.',
  body: 'Full-stack developer and IT systems professional with 5+ years of experience building production applications, integrating payments, automating workflows and managing reliable infrastructure.',
  checks: ['5+ Years Experience', 'AWS Certified', 'Nairobi, Kenya'],
};

export type Stat = { value: string; label: string; note: string; icon: LucideIcon };

export const stats: Stat[] = [
  { value: '5+ Years', label: 'Professional experience', note: 'Since 2020', icon: Clock },
  { value: '95%', label: 'System availability achieved', note: 'Up from 75%', icon: Activity },
  { value: '3×', label: 'Faster ICT response time', note: '65% less time · ticketing & monitoring', icon: TrendingUp },
  { value: '80%', label: 'Less system downtime', note: 'From 25% down to 5%', icon: ServerCog },
];

export const about = {
  eyebrow: 'About me',
  heading: "Hi, I'm Ancent. I turn manual processes into dependable software.",
  paragraphs: [
    'I have spent 5+ years shipping systems that people rely on every day: cooperative platforms that pay farmers through M-Pesa, ERP and POS systems that report to KRA eTIMS, and the servers and networks those systems run on.',
    'I work across the whole stack, so one person can take a project from database design to deployment and stay around to support it in production.',
  ],
  facts: [
    { label: 'Based in', value: 'Nairobi, Kenya' },
    { label: 'Currently', value: 'Razzo Africa · Eastlands College' },
    { label: 'Focus', value: 'Payments, eTIMS, ERP & cloud' },
    { label: 'Works with', value: 'Startups, SMEs & institutions' },
  ],
};

export const quote = {
  eyebrow: 'Work with me',
  heading: 'Request a quote or book a consultation.',
  services: [
    'Web application',
    'Mobile app (Flutter)',
    'M-Pesa / payment integration',
    'KRA eTIMS integration (OSCU / VSCU)',
    'ERP or POS system',
    'Cloud & infrastructure setup',
    'Technical consultation',
    'Something else',
  ],
  budgets: ['Not sure yet', 'Under KES 50,000', 'KES 50,000 – 150,000', 'KES 150,000 – 500,000', 'KES 500,000+'],
  timelines: ['Flexible', 'Within 2 weeks', '1 – 2 months', '3+ months'],
};

export const expertise = {
  eyebrow: 'What I do',
  heading: 'Technology from code to infrastructure.',
  body: 'I write the application, wire up the payments, and then keep the servers, networks and backups underneath it healthy. Most of my work sits where software and operations meet.',
};

export type Capability = { title: string; body: string; icon: LucideIcon };

export const capabilities: Capability[] = [
  { title: 'Full Stack Development', body: 'Laravel/PHP, TypeScript, Angular, React and Node.js, from schema to interface.', icon: Code2 },
  { title: 'Cloud & Infrastructure', body: 'AWS, Azure, Linux, server provisioning, LAN/WAN and Active Directory.', icon: Cloud },
  { title: 'Payment Integrations', body: 'M-Pesa Daraja (STK Push, B2C, C2B), card gateways and automated reconciliation.', icon: CreditCard },
  { title: 'KRA eTIMS Integration', body: 'OSCU and VSCU integrations that sign and report sales from ERP and POS systems.', icon: ReceiptText },
  { title: 'API & Integrations', body: 'REST APIs, SMS gateways, webhooks and third-party system integrations.', icon: Plug },
  { title: 'Database Engineering', body: 'MySQL, PostgreSQL, MongoDB and SQL Server, including multi-tenant design.', icon: Database },
  { title: 'Mobile Development', body: 'Flutter apps that share the same APIs as the web platform.', icon: Smartphone },
  { title: 'Security & DevOps', body: 'RBAC, OAuth/JWT, CI/CD, backups, monitoring and disaster recovery.', icon: ShieldCheck },
];

export type Link = { label: string; href: string };

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  links: Link[];
};

export const featuredProject = {
  status: 'Live in production',
  title: 'Milk Cooperative Management System',
  summary:
    'A live multi-tenant Laravel platform serving multiple cooperative societies, integrating M-Pesa payments, transaction reconciliation, SMS notifications and configurable tenant business rules.',
  tags: ['Laravel', 'MySQL', 'M-Pesa Daraja', 'SMS API', 'REST APIs'],
  caseStudy: '/work/milk-cooperative',
  code: 'https://github.com/Ancentian/comaziwa_v2',
  live: 'https://www.kathande.embucomaziwa.co.ke/dashboard/index',
};

export const projects: Project[] = [
  {
    title: 'KRA eTIMS Integration (OSCU & VSCU)',
    summary: 'Connects ERP and POS sales to KRA eTIMS through both OSCU and VSCU: device initialisation, invoice signing, and item, stock and purchase sync.',
    tags: ['.NET Core', 'C#', 'eTIMS', 'REST'],
    links: [],
  },
  {
    title: 'Card Payment Integration',
    summary: 'Hosted card checkout through the iVeri payment gateway, with transaction callbacks and status handling.',
    tags: ['Payments', 'iVeri', 'Webhooks'],
    links: [{ label: 'Code', href: 'https://github.com/Ancentian/Iveri-Payment-intergration' }],
  },
  {
    title: 'Cooperative Mobile App',
    summary: 'Flutter companion to the cooperative platform for farmers and field staff, built on the same REST API.',
    tags: ['Flutter', 'Dart', 'REST'],
    links: [{ label: 'Code', href: 'https://github.com/Ancentian/New-comaziwa-mobile-app' }],
  },
  {
    title: 'Open Source POS',
    summary: 'Point-of-sale system covering sales, stock and reporting for small retail businesses.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    links: [{ label: 'Code', href: 'https://github.com/Ancentian/Ancent-open-source-pos' }],
  },
  {
    title: 'MERN E-commerce',
    summary: 'Product catalogue, cart and checkout on MongoDB, Express, React and Node.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    links: [{ label: 'Code', href: 'https://github.com/Ancentian/Mern-ecommerce-project' }],
  },
  {
    title: 'Laravel JWT Authentication',
    summary: 'Stateless API authentication for Laravel using JSON Web Tokens and guarded routes.',
    tags: ['Laravel', 'JWT', 'Security'],
    links: [{ label: 'Code', href: 'https://github.com/Ancentian/Laravel-JWT-Authenication' }],
  },
];

export type LiveSite = {
  title: string;
  client: string;
  /** Systems behind a sign-in show a "Login portal" badge so visitors know what to expect. */
  portal?: boolean;
  url: string;
  image: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const liveSites: LiveSite[] = [
  {
    title: 'Comaziwa Cooperative Management',
    client: 'Multi-tenant SaaS · Embu dairy cooperatives',
    portal: true,
    url: 'https://www.kathande.embucomaziwa.co.ke/dashboard/index',
    image: '/work/comaziwa.jpg',
    summary:
      'The live cooperative platform: each society gets its own subdomain and workspace for milk collections, farmer payments, store operations and member services.',
    highlights: ['Separate workspace per cooperative society', 'Milk collections and M-Pesa farmer payments', 'Staff and member sign-in'],
    tags: ['Laravel', 'MySQL', 'M-Pesa'],
  },
  {
    title: 'Apamoyo Scholarship Management',
    client: 'Scholarship programme · NGO',
    portal: true,
    url: 'https://www.apamoyo.cowango.org/',
    image: '/work/apamoyo.jpg',
    summary:
      'A secure workspace for running a scholarship programme: scholar records, education progress, sponsorships and programme impact in one place.',
    highlights: ['Scholar profiles and education progress', 'Sponsorship management', 'Programme impact reporting'],
    tags: ['Web app', 'Dashboards', 'Reporting'],
  },
  {
    title: 'TaxGuide Africa LLP',
    client: 'Professional services firm · Nairobi',
    url: 'https://demo.taxguidellp.com/index',
    image: '/work/taxguide.jpg',
    summary:
      'Corporate website and lead-generation platform for a pan-African firm offering audit, tax, legal, financial and technology advisory.',
    highlights: ['Consultation requests & WhatsApp chat', 'Insights, careers and branch pages', 'Client testimonials with review before publishing'],
    tags: ['Web design', 'CMS', 'SEO'],
  },
  {
    title: 'Eastlands College of Technology',
    client: 'TVET institution · Nairobi',
    url: 'https://ect.ac.ke/',
    image: '/work/ect.jpg',
    summary:
      'Institutional website with a full course catalogue, admissions and an online application, plus news, events, departments, gallery and donations.',
    highlights: ['20+ course pages with online applications', 'News, events and gallery publishing', 'Departments, chaplaincy and donate pages'],
    tags: ['Web design', 'CMS', 'SEO'],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  /** Job title; leave empty to show the organisation only. */
  role: string;
  company: string;
  /** Star rating out of 5. */
  rating: number;
  /** Draft entries only render in development, so unapproved quotes never reach the live site. */
  draft?: boolean;
};

// Approved by each person. Add `draft: true` to hide a quote from the live site again.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Ancent built our website from the ground up and understood what a professional services firm needs: clear service pages, consultation requests and WhatsApp enquiries that reach us straight away, and a site our team can keep up to date. He was responsive throughout and delivered a site we are proud to share with clients.',
    name: 'George Guda',
    role: '',
    company: 'TaxGuide Africa LLP',
    rating: 5,
  },
  {
    quote:
      'Since Ancent took over ICT at Eastlands, our systems have gone from a daily worry to something we rely on. Downtime has dropped, staff requests are tracked and resolved quickly, and our new website lets students apply online. He also trains our staff and students, which has raised digital skills across the college.',
    name: 'Stephen Wambugu',
    role: 'Vice Principal, Administration',
    company: 'Eastlands College of Technology',
    rating: 5,
  },
  {
    quote:
      'I have built several full stack systems with Ancent, and he is the developer I want on the hard parts: database design, payment integrations and getting things running reliably in production. He writes clean, maintainable code, raises problems early, and does not consider a feature done until it works for real users.',
    name: 'Daniel Mutuku',
    role: 'Full Stack Developer',
    company: 'Moringa School',
    rating: 5,
  },
  {
    quote:
      'We have delivered multiple systems together at Ezalta, and Ancent is someone I trust to own a project end to end. He turns loose client requirements into a working plan, handles the backend and integrations without hand-holding, and keeps supporting what he builds long after launch. Our clients notice the difference.',
    name: 'Peter Ndiragu',
    role: '',
    company: 'Ezalta Technologies',
    rating: 5,
  },
];

export type Role = {
  period: string;
  title: string;
  company: string;
  outcomes: string[];
  current?: boolean;
};

export const experience: Role[] = [
  {
    period: '2026 — Present',
    title: 'Senior Developer Consultant – ERP Systems',
    company: 'Razzo Africa Ltd',
    current: true,
    outcomes: [
      'Led migration of ERP backend services to ASP.NET Core on .NET LTS',
      'Designs multi-branch security, REST integrations and relational schemas',
      'Runs knowledge-transfer sessions so client teams own their systems',
    ],
  },
  {
    period: 'Feb 2024 — Present',
    title: 'ICT Manager & Systems Administrator',
    company: 'Eastlands College of Technology',
    current: true,
    outcomes: [
      'System availability raised from 75% to 95%',
      'ICT response time improved 65% with a ticketing and monitoring system',
      'Network downtime cut 20%; 400+ staff and students trained',
    ],
  },
  {
    period: 'Oct 2022 — Jan 2024',
    title: 'ICT Officer & Software Developer',
    company: 'The Companionship of Works Organization (CoWA)',
    outcomes: [
      'Reporting time cut 60% through workflow automation',
      'Shipped secure REST APIs with OAuth 2.0 and JWT',
    ],
  },
  {
    period: 'May 2020 — Sep 2022',
    title: 'Junior Software Developer',
    company: 'Fort Sort Innovations',
    outcomes: [
      'Full SDLC delivery for business apps across multiple client branches',
      'System migrations and backups with no data loss',
    ],
  },
];

export type Certification = { name: string; issuer: string; icon: LucideIcon };

export const certifications: Certification[] = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', icon: Cloud },
  { name: 'MERN Stack Development', issuer: 'Power Learn Project', icon: Layers },
  { name: 'Web Development', issuer: 'eMobilis', icon: Code2 },
  { name: 'SQL & Database Management', issuer: 'Hubblemind Labs', icon: Database },
  { name: 'Power BI Data Analysis', issuer: 'Bounty Analytica', icon: BarChart3 },
];

export const education = {
  degree: 'BSc Information Technology',
  school: 'Kenyatta University',
  detail: 'Second Class Upper Division · 2019',
  icon: GraduationCap,
  awardIcon: Award,
};

export const contact = {
  heading: 'Have a problem worth solving?',
  body: "I'm open to software engineering, systems, consulting and technology opportunities.",
};

export const caseStudy = {
  title: 'Milk Cooperative Management System',
  intro:
    'Cooperative societies were tracking milk deliveries, deductions and farmer payments across spreadsheets and paper. I built one platform that several societies now run on.',
  sections: [
    {
      heading: 'The problem',
      body: 'Each society has its own pricing, deductions and payment schedule. Farmers waited on manual reconciliation to be paid and had no record of their deliveries.',
    },
    {
      heading: 'What I built',
      body: 'A single Laravel codebase with tenant-isolated data and configurable business rules per society. Deliveries are recorded once and drive payroll, deductions and statements.',
    },
    {
      heading: 'Payments & notifications',
      body: 'Farmer payouts run through the M-Pesa Daraja API with automated transaction reconciliation. An SMS gateway sends delivery, payment and account notifications as they happen.',
    },
    {
      heading: 'My role',
      body: 'Everything, end to end: multi-tenancy design, database schema, business logic, integrations, deployment and ongoing production support. It handles real money every day.',
    },
  ],
  stack: [
    'Laravel',
    'PHP',
    'MySQL',
    'M-Pesa Daraja',
    'SMS gateway',
    'Flutter (mobile)',
    'Node.js',
    'REST APIs',
    'AWS EC2',
    'AWS RDS',
    'React',
    'Tailwind CSS',
    '.NET Core',
    'C#',
    'eTIMS integration (OSCU & VSCU)',
    'Payment integrations',
  ],
};
