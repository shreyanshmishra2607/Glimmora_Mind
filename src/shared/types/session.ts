export type SessionStatus = "scheduled" | "completed" | "cancelled";

export interface Session {
  id: string;
  therapistId: string;
  therapistName: string;
  userId: string;
  startAt: string; // ISO
  endAt: string;
  status: SessionStatus;
  type: "video" | "chat" | "voice";
}

export interface TimeSlot {
  id: string;
  startAt: string;
  endAt: string;
  therapistId: string;
}
