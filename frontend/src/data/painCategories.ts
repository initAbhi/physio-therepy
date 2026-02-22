export interface PainCategory {
  id: string;
  name: string;
  conditions: string[];
}

export const painCategories: Record<string, PainCategory> = {
  neck: {
    id: "neck",
    name: "Neck",
    conditions: [
      "Spasm",
      "Trigger point",
      "Radiculopathy",
      "Posture-related issues",
      "Tingling / Numbness",
    ],
  },
  shoulder: {
    id: "shoulder",
    name: "Shoulder",
    conditions: [
      "Decreased mobility",
      "Frozen shoulder (Adhesive capsulitis)",
      "Tendinitis",
      "Impingement syndrome",
      "Fracture",
      "Tingling",
    ],
  },
  elbow: {
    id: "elbow",
    name: "Elbow",
    conditions: [
      "Tennis elbow (Lateral epicondylitis)",
      "Golfer's elbow (Medial epicondylitis)",
      "Decreased mobility",
      "Student's elbow (Olecranon bursitis)",
      "Tingling",
    ],
  },
  wrist: {
    id: "wrist",
    name: "Wrist",
    conditions: [
      "CTS (Carpal Tunnel Syndrome)",
      "Tingling / Numbness",
      "Pain in fingers",
      "R/A pain (likely Repetitive Activity pain)",
    ],
  },
  hip: {
    id: "hip",
    name: "Hip",
    conditions: [
      "Replacement",
      "Pain",
      "Laxity",
      "Immobility",
      "Incontinence",
      "Sciatica",
    ],
  },
  knee: {
    id: "knee",
    name: "Knee",
    conditions: [
      "Replacement",
      "Pain / OA (Osteoarthritis)",
      "Ligament injury",
      "Shin pain",
      "Patellofemoral pain",
      "Patellar immobility",
    ],
  },
  back: {
    id: "back",
    name: "Back",
    conditions: [
      "Lower back pain",
      "Herniated disc",
      "Sciatica",
      "Muscle strain",
      "Spinal stenosis",
    ],
  },
  chest: {
    id: "chest",
    name: "Chest",
    conditions: [
      "Pain when breathing",
      "Muscle strain",
      "Costochondritis",
      "Tightness",
    ],
  },
  abdomen: { // Renamed from abs
    id: "abdomen",
    name: "Abdomen",
    conditions: [
      "Abdominal pain",
      "Muscle strain",
      "Cramps",
      "Digestive issues",
      "Weakness",
    ],
  },
  ankle: {
    id: "ankle",
    name: "Ankle",
    conditions: [
      "Sprain",
      "Achilles tendinitis",
      "Plantar fasciitis",
      "Fracture",
      "Instability",
    ],
  },
  biceps: {
    id: "biceps",
    name: "Biceps",
    conditions: [
      "Strain",
      "Tendonitis",
      "Rupture",
      "Pain",
    ],
  },
  forearm: {
    id: "forearm",
    name: "Forearm",
    conditions: [
      "Strain",
      "Pain",
      "Tightness",
      "Numbsess",
    ],
  },
  hand: {
    id: "hand",
    name: "Hand",
    conditions: [
      "Arthritis",
      "Carpal Tunnel",
      "Trigger Finger",
      "Pain",
      "Numbness",
    ],
  },
  thigh: {
    id: "thigh",
    name: "Thigh",
    conditions: [
      "Strain",
      "Bruise",
      "Pain",
      "Weakness",
    ],
  },
  shin: {
    id: "shin",
    name: "Shin",
    conditions: [
      "Shin Splints",
      "Stress Fracture",
      "Pain",
    ],
  },
  foot: {
    id: "foot",
    name: "Foot",
    conditions: [
      "Plantar Fasciitis",
      "Bunions",
      "Pain",
      "Numbness",
    ],
  },
};

export type BodyPartId = keyof typeof painCategories;
