export interface Training {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  description: string;
  tags: string[];
  enrolled: number;
  rating: number;
  free?: boolean;
}

export const trainings: Training[] = [
  {
    id: "1",
    title: "Full-Stack Web Development Bootcamp",
    provider: "Ruzagar Academy",
    duration: "12 weeks",
    level: "Beginner",
    category: "Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and databases from scratch. Build real-world projects.",
    tags: ["React", "Node.js", "MongoDB"],
    enrolled: 342,
    rating: 4.8,
    free: true,
  },
  {
    id: "2",
    title: "Data Science with Python",
    provider: "DataMinds Institute",
    duration: "8 weeks",
    level: "Intermediate",
    category: "Data Science",
    description: "Master data analysis, visualization, and machine learning using Python and its ecosystem.",
    tags: ["Python", "Pandas", "Scikit-learn"],
    enrolled: 218,
    rating: 4.6,
  },
  {
    id: "3",
    title: "Digital Marketing Mastery",
    provider: "GrowthPulse Academy",
    duration: "6 weeks",
    level: "Beginner",
    category: "Marketing",
    description: "Learn SEO, social media marketing, Google Ads, and content strategy from industry experts.",
    tags: ["SEO", "Ads", "Analytics"],
    enrolled: 567,
    rating: 4.7,
    free: true,
  },
  {
    id: "4",
    title: "Advanced Cloud Architecture",
    provider: "CloudNet Academy",
    duration: "10 weeks",
    level: "Advanced",
    category: "Cloud Computing",
    description: "Design and implement scalable cloud solutions using AWS, Azure, and Google Cloud Platform.",
    tags: ["AWS", "Azure", "Terraform"],
    enrolled: 124,
    rating: 4.9,
  },
  {
    id: "5",
    title: "UI/UX Design Fundamentals",
    provider: "DesignCraft School",
    duration: "8 weeks",
    level: "Beginner",
    category: "Design",
    description: "Learn user research, wireframing, prototyping, and visual design principles.",
    tags: ["Figma", "UX Research", "Prototyping"],
    enrolled: 430,
    rating: 4.5,
  },
  {
    id: "6",
    title: "Cybersecurity Essentials",
    provider: "SecureShield Training",
    duration: "10 weeks",
    level: "Intermediate",
    category: "Security",
    description: "Understand network security, ethical hacking, and incident response methodologies.",
    tags: ["Ethical Hacking", "Network Security", "SIEM"],
    enrolled: 189,
    rating: 4.8,
  },
];
