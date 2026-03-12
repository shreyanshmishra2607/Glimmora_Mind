import { create } from "zustand";

interface SessionBookingState {
  selectedTherapistId: string | null;
  selectedSlotId: string | null;
  setSelection: (therapistId: string | null, slotId: string | null) => void;
  clearSelection: () => void;
}

export const useSessionStore = create<SessionBookingState>((set) => ({
  selectedTherapistId: null,
  selectedSlotId: null,
  setSelection: (therapistId, slotId) =>
    set({ selectedTherapistId: therapistId, selectedSlotId: slotId }),
  clearSelection: () =>
    set({ selectedTherapistId: null, selectedSlotId: null }),
}));
