import { BookingView } from "@/components/booking/BookingView";

export default function BookingPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Book a Session</h1>
      <BookingView />
    </div>
  );
}
