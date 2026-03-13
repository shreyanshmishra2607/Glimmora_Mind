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
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { formatDateTime } from "@/shared/utils";
import { CalendarCheck, Clock, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingView() {
  const searchParams = useSearchParams();
  const therapistId  = searchParams.get("therapist") ?? null;

  const { therapist, isLoading: therapistLoading } = useTherapist(therapistId);
  const { slots, isLoading: slotsLoading }         = useAvailability(therapistId);
  const { book, isPending: bookingPending }         = useSessionBooking();

  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen]       = useState(false);
  const [booked, setBooked]                 = useState(false);

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
      // error handled via toast
    }
  }

  /* ── No therapist selected ─────────────────────────────────────────── */
  if (!therapistId) {
    return (
      <div className="text-center py-16">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <CalendarCheck className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Select a therapist from the marketplace to book a session.
        </p>
      </div>
    );
  }

  /* ── Loading therapist ─────────────────────────────────────────────── */
  if (therapistLoading || !therapist) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="h-5 bg-muted rounded w-40 mb-2" />
          <div className="h-3 bg-muted rounded w-24" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Therapist card ─────────────────────────────────────────────── */}
      <Card>
        <CardContent className="pt-5 pb-5 px-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {therapist.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base">{therapist.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{therapist.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-xs text-muted-foreground">{therapist.reviewCount} reviews</span>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0 hidden sm:flex">Available</Badge>
          </div>
        </CardContent>
      </Card>

      {/* ── Booked success banner ──────────────────────────────────────── */}
      {booked && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 animate-slide-up">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Session booked successfully!</p>
            <p className="text-xs mt-0.5 text-emerald-600">
              You&apos;ll receive a confirmation shortly.
            </p>
          </div>
        </div>
      )}

      {/* ── Time slots ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Choose a time slot
          </CardTitle>
        </CardHeader>
        <CardContent>
          {slotsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No slots available right now. Check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slots.map((slot) => {
                const dt = new Date(slot.startAt);
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => {
                      setSelectedSlotId(slot.id);
                      setConfirmOpen(true);
                    }}
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-all duration-150",
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    <p className="text-xs font-semibold">
                      {dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      {dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">50 min</p>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Confirm modal ──────────────────────────────────────────────── */}
      <Modal open={confirmOpen} onOpenChange={setConfirmOpen}>
        <ModalPortal>
          <ModalOverlay />
          <ModalContent className="max-w-sm">
            <ModalHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
              <ModalTitle className="text-center">Confirm your booking</ModalTitle>
              <ModalDescription className="text-center">
                {selectedSlot
                  ? `${formatDateTime(selectedSlot.startAt)} with ${therapist.name}`
                  : ""}
              </ModalDescription>
            </ModalHeader>
            <ModalFooter className="flex-col sm:flex-row gap-2">
              <ModalClose className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg text-sm font-medium border border-input bg-background hover:bg-accent h-10 px-5 transition-colors">
                Cancel
              </ModalClose>
              <Button
                onClick={handleConfirm}
                loading={bookingPending}
                disabled={!selectedSlotId}
                className="w-full sm:w-auto"
              >
                Confirm booking
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalPortal>
      </Modal>
    </div>
  );
}
