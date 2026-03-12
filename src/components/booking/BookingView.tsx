"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useTherapist, useAvailability, useSessionBooking } from "@/shared/hooks";
import {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { Button, Card, CardContent } from "@/components/ui";
import { formatDateTime } from "@/shared/utils";

export function BookingView() {
  const searchParams = useSearchParams();
  const therapistId = searchParams.get("therapist") ?? null;
  const { therapist, isLoading: therapistLoading } = useTherapist(therapistId);
  const { slots, isLoading: slotsLoading } = useAvailability(therapistId);
  const { book, isPending: bookingPending } = useSessionBooking();
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId),
    [slots, selectedSlotId]
  );

  async function handleConfirm() {
    if (!therapistId || !selectedSlotId) return;
    try {
      await book({ slotId: selectedSlotId, therapistId });
      setBooked(true);
      setConfirmOpen(false);
      setSelectedSlotId(null);
    } catch {
      // Error could be shown via toast
    }
  }

  if (!therapistId) {
    return (
      <p className="text-muted-foreground">
        Select a therapist from the marketplace to book a session.
      </p>
    );
  }

  if (therapistLoading || !therapist) {
    return <p className="text-muted-foreground">Loading therapist...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <p className="font-medium">{therapist.name}</p>
          <p className="text-sm text-muted-foreground">Choose a time slot</p>
        </CardContent>
      </Card>

      {slotsLoading ? (
        <p className="text-muted-foreground">Loading availability...</p>
      ) : slots.length === 0 ? (
        <p className="text-muted-foreground">No slots available.</p>
      ) : (
        <div className="grid gap-2">
          {slots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedSlotId === slot.id ? "default" : "outline"}
              className="justify-start"
              onClick={() => {
                setSelectedSlotId(slot.id);
                setConfirmOpen(true);
              }}
            >
              {formatDateTime(slot.startAt)}
            </Button>
          ))}
        </div>
      )}

      {booked && (
        <p className="text-sm text-primary font-medium">
          Session booked successfully.
        </p>
      )}

      <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ModalPortal>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Confirm booking</ModalTitle>
              <ModalDescription>
                {selectedSlot &&
                  `Book session on ${formatDateTime(selectedSlot.startAt)} with ${therapist.name}?`}
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-9 px-4">
                Cancel
              </ModalClose>
              <Button
                onClick={handleConfirm}
                loading={bookingPending}
                disabled={!selectedSlotId}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalPortal>
      </Modal>
    </div>
  );
}
