export const grade_scale = [
  { letter: "A", min: 4.5, max: 5.0, label: "Excellent", color: "green" },
  { letter: "B", min: 3.5, max: 4.49, label: "Very Good", color: "blue" },
  { letter: "C", min: 2.5, max: 3.49, label: "Good", color: "yellow" },
  { letter: "D", min: 1.5, max: 2.49, label: "Fair", color: "orange" },
  { letter: "E", min: 1.0, max: 1.49, label: "Pass", color: "purple" },
  { letter: "F", min: 0, max: 0.99, label: "Fail", color: "red" },
];

export const grade_color_map: Record<string, string> = {
  green: "bg-green-100  text-green-700  border-green-200",
  blue: "bg-blue-100   text-blue-700   border-blue-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  red: "bg-red-100    text-red-700    border-red-200",
};
