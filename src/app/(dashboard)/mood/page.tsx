import { MoodView } from "@/components/mood/MoodView";

export default function MoodPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Mood Tracking</h1>
      <MoodView />
    </div>
  );
}
