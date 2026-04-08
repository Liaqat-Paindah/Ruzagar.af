export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  salary: string;
  posted: string;
  description: string;
  tags: string[];
  urgent?: boolean;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechVista Solutions",
    location: "Kabul, Afghanistan",
    type: "Full-time",
    salary: "$1,200 - $2,000/mo",
    posted: "2 hours ago",
    description: "Build and maintain modern web applications using React and TypeScript. Lead frontend architecture decisions.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    urgent: true,
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "Ariana Analytics",
    location: "Herat, Afghanistan",
    type: "Remote",
    salary: "$800 - $1,400/mo",
    posted: "5 hours ago",
    description: "Analyze large datasets to drive business decisions. Create dashboards and reports for stakeholders.",
    tags: ["Python", "SQL", "Power BI"],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "DesignCraft Studio",
    location: "Mazar-i-Sharif, Afghanistan",
    type: "Contract",
    salary: "$1,000 - $1,800/mo",
    posted: "1 day ago",
    description: "Design intuitive user interfaces and create seamless user experiences for web and mobile platforms.",
    tags: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "CloudNet Systems",
    location: "Kabul, Afghanistan",
    type: "Full-time",
    salary: "$1,500 - $2,500/mo",
    posted: "3 days ago",
    description: "Design and build scalable backend systems. Work with microservices and cloud infrastructure.",
    tags: ["Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "5",
    title: "Digital Marketing Specialist",
    company: "GrowthPulse Agency",
    location: "Remote",
    type: "Part-time",
    salary: "$600 - $1,000/mo",
    posted: "1 week ago",
    description: "Plan and execute digital marketing campaigns across multiple channels. Optimize for conversions.",
    tags: ["SEO", "Google Ads", "Social Media"],
  },
  {
    id: "6",
    title: "Mobile App Developer",
    company: "AppForge Labs",
    location: "Kandahar, Afghanistan",
    type: "Full-time",
    salary: "$1,300 - $2,200/mo",
    posted: "4 days ago",
    description: "Develop cross-platform mobile applications using React Native. Ensure high performance and responsiveness.",
    tags: ["React Native", "iOS", "Android"],
    urgent: true,
  },
  {
    id: "7",
    title: "Project Manager",
    company: "BuildRight Consulting",
    location: "Kabul, Afghanistan",
    type: "Full-time",
    salary: "$1,400 - $2,000/mo",
    posted: "2 days ago",
    description: "Lead project teams, manage timelines, and ensure deliverables meet quality standards.",
    tags: ["Agile", "Scrum", "Jira"],
  },
  {
    id: "8",
    title: "Cybersecurity Analyst",
    company: "SecureShield Inc.",
    location: "Remote",
    type: "Contract",
    salary: "$1,800 - $3,000/mo",
    posted: "6 hours ago",
    description: "Monitor network security, conduct vulnerability assessments, and respond to security incidents.",
    tags: ["Network Security", "SIEM", "Penetration Testing"],
  },
  {
    id: "9",
    title: "Teaching Assistant - Computer Science",
    company: "Kabul University",
    location: "Kabul, Afghanistan",
    type: "Internship",
    salary: "$300 - $500/mo",
    posted: "1 week ago",
    description: "Assist professors in teaching CS courses. Help students with assignments and lab work.",
    tags: ["Education", "Programming", "Mentoring"],
  },
];

export const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Remote", "Internship"] as const;
