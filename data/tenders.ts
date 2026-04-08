export interface Tender {
  id: string;
  title: string;
  organization: string;
  type: "Tender" | "RFQ" | "RFP";
  category: string;
  location: string;
  budget: string;
  deadline: string;
  posted: string;
  description: string;
  status: "Open" | "Closing Soon" | "Closed";
  documents?: string[];
}

export const tenders: Tender[] = [
  {
    id: "t1",
    title: "Construction of Provincial Health Clinic",
    organization: "Ministry of Public Health",
    type: "Tender",
    category: "Construction",
    location: "Balkh Province",
    budget: "$450,000 - $600,000",
    deadline: "2026-05-15",
    posted: "2 days ago",
    description: "Construction of a 20-bed health clinic including medical equipment installation, electrical and plumbing systems, and landscaping.",
    status: "Open",
    documents: ["TOR.pdf", "Technical Specs.pdf"],
  },
  {
    id: "t2",
    title: "Supply of IT Equipment for Government Offices",
    organization: "Ministry of Communications & IT",
    type: "RFQ",
    category: "IT & Technology",
    location: "Kabul, Afghanistan",
    budget: "$120,000 - $180,000",
    deadline: "2026-04-30",
    posted: "5 hours ago",
    description: "Supply and delivery of 500 desktop computers, 200 laptops, networking equipment, and UPS systems to government offices across Kabul.",
    status: "Open",
    documents: ["Equipment List.xlsx"],
  },
  {
    id: "t3",
    title: "Digital Transformation Strategy Consulting",
    organization: "Da Afghanistan Bank",
    type: "RFP",
    category: "Consulting",
    location: "Kabul, Afghanistan",
    budget: "$200,000 - $350,000",
    deadline: "2026-04-20",
    posted: "1 week ago",
    description: "Seeking proposals for a comprehensive digital transformation strategy including core banking system modernization and mobile banking solutions.",
    status: "Closing Soon",
    documents: ["RFP Document.pdf", "Evaluation Criteria.pdf"],
  },
  {
    id: "t4",
    title: "Solar Panel Installation for Rural Schools",
    organization: "UNICEF Afghanistan",
    type: "Tender",
    category: "Energy",
    location: "Nangarhar Province",
    budget: "$80,000 - $120,000",
    deadline: "2026-05-01",
    posted: "3 days ago",
    description: "Installation of solar panel systems for 15 rural schools including batteries, inverters, and wiring to provide reliable electricity.",
    status: "Open",
  },
  {
    id: "t5",
    title: "Office Furniture Supply",
    organization: "World Bank - Kabul Office",
    type: "RFQ",
    category: "Supplies",
    location: "Kabul, Afghanistan",
    budget: "$35,000 - $50,000",
    deadline: "2026-04-18",
    posted: "1 day ago",
    description: "Supply of ergonomic office furniture including desks, chairs, filing cabinets, and conference tables for the new office expansion.",
    status: "Closing Soon",
  },
  {
    id: "t6",
    title: "Water Supply Network Rehabilitation",
    organization: "Ministry of Rural Rehabilitation",
    type: "Tender",
    category: "Infrastructure",
    location: "Herat Province",
    budget: "$300,000 - $500,000",
    deadline: "2026-06-01",
    posted: "4 days ago",
    description: "Rehabilitation of existing water supply networks serving 12 villages including pipeline replacement, pump stations, and water treatment facilities.",
    status: "Open",
    documents: ["Technical Design.pdf", "BOQ.xlsx"],
  },
  {
    id: "t7",
    title: "Capacity Building Training Program",
    organization: "UNDP Afghanistan",
    type: "RFP",
    category: "Training & Education",
    location: "Multiple Provinces",
    budget: "$150,000 - $250,000",
    deadline: "2026-05-20",
    posted: "6 hours ago",
    description: "Design and delivery of a 6-month capacity building program for 200 government officials covering project management, leadership, and digital literacy.",
    status: "Open",
    documents: ["TOR.pdf"],
  },
  {
    id: "t8",
    title: "Vehicle Fleet Maintenance Services",
    organization: "Afghan Red Crescent Society",
    type: "RFQ",
    category: "Automotive",
    location: "Kabul, Afghanistan",
    budget: "$60,000 - $90,000",
    deadline: "2026-04-25",
    posted: "2 days ago",
    description: "Annual maintenance contract for a fleet of 45 vehicles including SUVs, ambulances, and trucks. Includes parts supply and 24/7 roadside assistance.",
    status: "Open",
  },
];

export const tenderTypes = ["All", "Tender", "RFQ", "RFP"] as const;
export const tenderCategories = ["All", "Construction", "IT & Technology", "Consulting", "Energy", "Supplies", "Infrastructure", "Training & Education", "Automotive"] as const;
