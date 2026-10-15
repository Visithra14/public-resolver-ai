export type PetitionStatus = "submitted" | "assigned" | "in-progress" | "escalated" | "resolved";

export interface TimelineItem {
  date: string;
  time?: string;
  event: string;
  status: "completed" | "current" | "pending";
}

export interface Petition {
  id: string;
  title: string;
  status: PetitionStatus;
  category: string;
  location: string;
  date: string;
  submittedDate: string;
  assignedTo: string;
  estimatedResolution: string;
  urgency: "Low" | "Medium" | "High";
  description: string;
  timeline: TimelineItem[];
}

const STORAGE_KEY = "citizenvoice_petitions";

const INITIAL_PETITIONS: Petition[] = [
  {
    id: "PET-2024-001234",
    title: "Street light not working on Main Road",
    status: "in-progress",
    category: "Public Works",
    location: "Main Road, Sector 15",
    date: "2024-01-15",
    submittedDate: "2024-01-15",
    assignedTo: "Public Works Department",
    estimatedResolution: "5-7 days",
    urgency: "Medium",
    description: "The street light in front of house 42 has been flickering and completely shut down for 3 days, causing visibility issues at night.",
    timeline: [
      { date: "2024-01-15", time: "10:30 AM", event: "Petition submitted", status: "completed" },
      { date: "2024-01-15", time: "02:15 PM", event: "AI Analysis completed - Categorized as Public Works", status: "completed" },
      { date: "2024-01-16", time: "09:00 AM", event: "Assigned to Public Works Department", status: "completed" },
      { date: "2024-01-17", time: "11:30 AM", event: "Field inspection scheduled", status: "current" },
      { date: "Expected", time: "5-7 days", event: "Resolution expected", status: "pending" },
    ]
  },
  {
    id: "PET-2024-001180",
    title: "Pothole near school entrance",
    status: "resolved",
    category: "Public Works",
    location: "School Road, Sector 12",
    date: "2024-01-10",
    submittedDate: "2024-01-10",
    assignedTo: "Road Maintenance Division",
    estimatedResolution: "Resolved",
    urgency: "High",
    description: "Deep pothole right outside St. Jude School main gate posing safety hazard to schoolchildren and cycling commuters.",
    timeline: [
      { date: "2024-01-10", time: "08:15 AM", event: "Petition submitted", status: "completed" },
      { date: "2024-01-10", time: "10:00 AM", event: "AI flagged High Priority - School Zone", status: "completed" },
      { date: "2024-01-11", time: "02:00 PM", event: "Road repair crew dispatched", status: "completed" },
      { date: "2024-01-12", time: "04:30 PM", event: "Pothole filled and surface leveled", status: "completed" },
      { date: "2024-01-13", time: "10:00 AM", event: "Quality verification & resolved", status: "completed" },
    ]
  },
  {
    id: "PET-2024-001095",
    title: "Water supply interruption",
    status: "escalated",
    category: "Water & Sanitation",
    location: "Residential Area, Sector 8",
    date: "2024-01-05",
    submittedDate: "2024-01-05",
    assignedTo: "Municipal Water Board",
    estimatedResolution: "24-48 hours",
    urgency: "High",
    description: "Low pressure followed by complete shutdown of municipal tap water for over 48 hours without prior notice.",
    timeline: [
      { date: "2024-01-05", time: "07:45 AM", event: "Petition submitted", status: "completed" },
      { date: "2024-01-05", time: "11:20 AM", event: "Assigned to Water Supply Team", status: "completed" },
      { date: "2024-01-07", time: "09:00 AM", event: "SLA breached - Automatically Escalated by AI", status: "completed" },
      { date: "2024-01-08", time: "08:00 AM", event: "Emergency pipeline repair underway", status: "current" },
      { date: "Expected", time: "24 hrs", event: "Water restoration", status: "pending" },
    ]
  }
];

export function getPetitions(): Petition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PETITIONS));
      return INITIAL_PETITIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PETITIONS;
  }
}

export function getPetitionById(id: string): Petition | undefined {
  const all = getPetitions();
  const trimmed = id.trim().toLowerCase();
  return all.find(p => p.id.toLowerCase() === trimmed);
}

export function addPetition(data: {
  title: string;
  category: string;
  location: string;
  description: string;
}): Petition {
  const all = getPetitions();
  const nextNum = 1235 + all.length;
  const newId = `PET-2024-${String(nextNum).padStart(6, "0")}`;
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Intelligent category mapping if empty
  let detectedCategory = data.category;
  if (!detectedCategory) {
    const text = (data.title + " " + data.description).toLowerCase();
    if (text.includes("water") || text.includes("leak") || text.includes("drain") || text.includes("sewage")) {
      detectedCategory = "Water & Sanitation";
    } else if (text.includes("light") || text.includes("road") || text.includes("pothole") || text.includes("bridge")) {
      detectedCategory = "Public Works";
    } else if (text.includes("hospital") || text.includes("doctor") || text.includes("clinic") || text.includes("health")) {
      detectedCategory = "Healthcare";
    } else if (text.includes("school") || text.includes("college") || text.includes("teacher")) {
      detectedCategory = "Education";
    } else if (text.includes("bus") || text.includes("traffic") || text.includes("metro")) {
      detectedCategory = "Transportation";
    } else if (text.includes("police") || text.includes("safety") || text.includes("theft")) {
      detectedCategory = "Law & Order";
    } else {
      detectedCategory = "General Civic Services";
    }
  }

  // Priority detection
  const text = (data.title + " " + data.description).toLowerCase();
  let urgency: "Low" | "Medium" | "High" = "Medium";
  if (text.includes("danger") || text.includes("urgent") || text.includes("hazard") || text.includes("immediate") || text.includes("emergency") || text.includes("severe")) {
    urgency = "High";
  }

  const newPetition: Petition = {
    id: newId,
    title: data.title,
    status: "submitted",
    category: detectedCategory,
    location: data.location,
    date: today,
    submittedDate: today,
    assignedTo: `${detectedCategory} Department`,
    estimatedResolution: "3-5 business days",
    urgency,
    description: data.description,
    timeline: [
      { date: today, time: now, event: "Petition submitted by citizen", status: "completed" },
      { date: today, time: now, event: `AI classified as ${detectedCategory} (${urgency} Urgency)`, status: "completed" },
      { date: today, time: "Pending", event: `Routing to ${detectedCategory} Department`, status: "current" },
      { date: "Next 24h", time: "", event: "Department officer assignment", status: "pending" },
      { date: "Estimated 3-5 days", time: "", event: "Resolution & verification", status: "pending" },
    ]
  };

  const updated = [newPetition, ...all];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }

  return newPetition;
}
