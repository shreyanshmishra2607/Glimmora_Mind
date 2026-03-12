import { BookingView } from "@/components/booking/BookingView";

export default function BookingPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Book a session</h1>
      <BookingView />
    </div>
  );
}
