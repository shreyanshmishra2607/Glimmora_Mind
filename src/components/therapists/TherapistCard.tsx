"use client";

import Link from "next/link";
import type { Therapist } from "@/shared/types";
import {
  Card,
  CardContent,
  CardFooter,
  Badge,
  Button,
} from "@/components/ui";
import { Star } from "lucide-react";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= Math.round(rating)
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
              : "h-3.5 w-3.5 text-muted-foreground/30"
          }
        />
      ))}
      <span className="ml-1 text-xs font-medium text-foreground">{rating}</span>
    </div>
  );
}

const BG_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
];

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  const initials = getInitials(therapist.name);
  const colorClass = BG_COLORS[therapist.id.charCodeAt(therapist.id.length - 1) % BG_COLORS.length];

  return (
    <Card className="flex flex-col hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <CardContent className="pt-5 pb-4 px-5 flex-1">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${colorClass}`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base leading-snug">{therapist.name}</h3>
            <div className="mt-1">
              <StarRating rating={therapist.rating} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {therapist.reviewCount} reviews
            </p>
          </div>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {therapist.specialization.slice(0, 3).map((s) => (
            <Badge key={s} variant="secondary" className="text-xs px-2 py-0.5">
              {s}
            </Badge>
          ))}
          {therapist.specialization.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{therapist.specialization.length - 3}
            </Badge>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {therapist.bio}
        </p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Link href={`/booking?therapist=${therapist.id}`} className="w-full">
          <Button size="sm" className="w-full">
            Book session
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
