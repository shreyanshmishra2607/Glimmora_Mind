import type { Therapist } from "@/shared/types";

export const mockTherapists: Therapist[] = [
  {
    id: "th-1",
    name: "Dr. Sarah Chen",
    avatarUrl: null,
    specialization: ["Anxiety", "Depression", "Stress"],
    languages: ["English", "Mandarin"],
    rating: 4.9,
    reviewCount: 124,
    bio: "Licensed clinical psychologist with 10+ years of experience in cognitive behavioral therapy.",
    availableSlots: [
      "2025-03-13T09:00:00Z",
      "2025-03-13T14:00:00Z",
      "2025-03-14T10:00:00Z",
    ],
  },
  {
    id: "th-2",
    name: "Michael Roberts",
    avatarUrl: null,
    specialization: ["Relationships", "Trauma", "PTSD"],
    languages: ["English"],
    rating: 4.8,
    reviewCount: 89,
    bio: "Trauma-informed therapist specializing in EMDR and couples counseling.",
    availableSlots: [
      "2025-03-13T11:00:00Z",
      "2025-03-14T09:00:00Z",
      "2025-03-15T15:00:00Z",
    ],
  },
  {
    id: "th-3",
    name: "Dr. Priya Sharma",
    avatarUrl: null,
    specialization: ["Anxiety", "Mindfulness", "Work-life balance"],
    languages: ["English", "Hindi"],
    rating: 4.7,
    reviewCount: 56,
    bio: "Integrative therapist combining CBT with mindfulness-based approaches.",
    availableSlots: [
      "2025-03-14T08:00:00Z",
      "2025-03-14T16:00:00Z",
      "2025-03-16T10:00:00Z",
    ],
  },
];
