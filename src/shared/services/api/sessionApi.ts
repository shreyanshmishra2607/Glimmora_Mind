import { ApiError } from "@/shared/utils";
import { withDelay, shouldSimulateError } from "@/shared/services/client";
import { mockSessions, getMockSlotsForTherapist, mockTherapists } from "@/mock";
import type { Session, TimeSlot } from "@/shared/types";

export async function getSessionsForUser(userId: string): Promise<Session[]> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return mockSessions.filter((s) => s.userId === userId);
  });
}

export async function getAvailability(therapistId: string): Promise<TimeSlot[]> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    return getMockSlotsForTherapist(therapistId);
  });
}

export async function bookSession(
  userId: string,
  slotId: string,
  therapistId: string
): Promise<Session> {
  return withDelay(async () => {
    if (shouldSimulateError()) throw new ApiError("Network error", 500);
    const slots = getMockSlotsForTherapist(therapistId);
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) throw new ApiError("Slot not available", 404);
    const therapist = mockTherapists.find((t) => t.id === therapistId);
    const newSession: Session = {
      id: `sess-${Date.now()}`,
      therapistId,
      therapistName: therapist?.name ?? "Therapist",
      userId,
      startAt: slot.startAt,
      endAt: slot.endAt,
      status: "scheduled",
      type: "video",
    };
    return newSession;
  });
}
