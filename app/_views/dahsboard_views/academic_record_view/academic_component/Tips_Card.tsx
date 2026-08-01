// tips-card.tsx
import { Lightbulb } from "lucide-react";

const TIPS = [
  "Create a new session for each academic year.",
  "Add semesters within a session.",
  "Semester dates must fall within the session's academic year.",
];

const TipsCard = () => (
  <div className="rounded-xl border bg-purple-50 p-4">
    <div className="flex items-center gap-2 mb-2">
      <Lightbulb className="h-4 w-4 text-purple-600" />
      <span className="text-sm font-semibold text-purple-700">Tips</span>
    </div>
    <ul className="list-disc pl-5 text-sm text-purple-700 space-y-1">
      {TIPS.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </div>
);

export default TipsCard;
