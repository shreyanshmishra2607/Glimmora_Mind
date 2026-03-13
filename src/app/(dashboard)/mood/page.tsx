import { MoodView } from "@/components/mood/MoodView";

export default function MoodPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Mood Tracking</h1>
      <MoodView />
    </div>
  );
}
