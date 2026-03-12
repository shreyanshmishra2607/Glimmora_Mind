import type { Session, TimeSlot } from "@/shared/types";
import { mockTherapists } from "./mockTherapists";

export const mockSessions: Session[] = [
  {
    id: "sess-1",
    therapistId: "th-1",
    therapistName: "Dr. Sarah Chen",
    userId: "user-1",
    startAt: "2025-03-20T09:00:00Z",
    endAt: "2025-03-20T09:50:00Z",
    status: "scheduled",
    type: "video",
  },
  {
    id: "sess-2",
    therapistId: "th-2",
    therapistName: "Michael Roberts",
    userId: "user-1",
    startAt: "2025-03-10T11:00:00Z",
    endAt: "2025-03-10T11:50:00Z",
    status: "completed",
    type: "chat",
  },
];

export function getMockSlotsForTherapist(therapistId: string): TimeSlot[] {
  const therapist = mockTherapists.find((t) => t.id === therapistId);
  if (!therapist?.availableSlots) return [];
  return therapist.availableSlots.map((startAt, i) => ({
    id: `slot-${therapistId}-${i}`,
    startAt,
    endAt: new Date(new Date(startAt).getTime() + 50 * 60 * 1000).toISOString(),
    therapistId,
  }));
}
