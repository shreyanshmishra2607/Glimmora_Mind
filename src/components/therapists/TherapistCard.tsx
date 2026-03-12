"use client";

import Link from "next/link";
import type { Therapist } from "@/shared/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
} from "@/components/ui";

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  const initials = therapist.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{therapist.name}</h3>
          <p className="text-sm text-muted-foreground">
            {therapist.rating} · {therapist.reviewCount} reviews
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {therapist.specialization.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {therapist.bio}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/booking?therapist=${therapist.id}`}>
          <Button size="sm">Book session</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
