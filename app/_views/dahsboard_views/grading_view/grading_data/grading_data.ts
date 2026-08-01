import { ScaleTemplate, GradeRow, RangedGrade } from "../grading_types";

const STEP = 0.01;
export const SCORE_MAX = 100; // score ranges are always out of 100, regardless of the point scale chosen

export const DEFAULT_TEMPLATES: Record<
  Exclude<ScaleTemplate, "custom">,
  {
    scaleMax: number; // max GPA points for this scale — unrelated to the score domain
    grades: Omit<GradeRow, "id">[];
  }
> = {
  "5.0": {
    scaleMax: 5,
    grades: [
      { letter: "A", points: 5.0, min: 70 },
      { letter: "B", points: 4.0, min: 60 },
      { letter: "C", points: 3.0, min: 50 },
      { letter: "D", points: 2.0, min: 45 },
      { letter: "F", points: 0.0, min: 0 },
    ],
  },
  "4.0": {
    scaleMax: 4,
    grades: [
      { letter: "A", points: 4.0, min: 70 },
      { letter: "B", points: 3.0, min: 60 },
      { letter: "C", points: 2.0, min: 50 },
      { letter: "D", points: 1.0, min: 45 },
      { letter: "F", points: 0.0, min: 0 },
    ],
  },
};

export function makeId() {
  return crypto.randomUUID();
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function withIds(rows: Omit<GradeRow, "id">[]): GradeRow[] {
  return rows.map((r) => ({ ...r, id: makeId() }));
}

/** Order is the source of truth — index 0 = highest grade. Score domain is always 0–100. */
export function computeRanges(grades: GradeRow[]): RangedGrade[] {
  return grades.map((g, i) => ({
    ...g,
    max: i === 0 ? SCORE_MAX : round2(grades[i - 1].min - STEP),
  }));
}

export interface RowBounds {
  floor: number;
  ceiling: number;
}

export function getRowBounds(grades: GradeRow[], index: number): RowBounds {
  const isLast = index === grades.length - 1;
  return {
    floor: isLast ? 0 : grades[index + 1].min,
    ceiling: index === 0 ? SCORE_MAX : grades[index - 1].min,
  };
}

export function isRowMinValid(grades: GradeRow[], index: number): boolean {
  const { floor, ceiling } = getRowBounds(grades, index);
  const isLast = index === grades.length - 1;
  const min = grades[index].min;
  if (isLast) return min === 0;
  return min > floor && min < ceiling;
}

/** pointScaleMax bounds the `points` field only — the score domain is always fixed at 100. */
export function validateGrades(
  grades: GradeRow[],
  pointScaleMax: number,
): string[] {
  const errors: string[] = [];
  if (grades.length === 0) {
    errors.push("Add at least one grade.");
    return errors;
  }

  const letters = grades.map((g) => g.letter.trim().toUpperCase());
  if (letters.some((l) => !l))
    errors.push("Every grade needs a letter (e.g. A, B, C).");
  if (new Set(letters).size !== letters.length)
    errors.push("Grade letters must be unique.");
  if (pointScaleMax <= 0)
    errors.push("Point scale max must be greater than 0.");

  const last = grades[grades.length - 1];
  if (last && last.min !== 0)
    errors.push(`"${last.letter || "Lowest grade"}" must start at 0.`);

  const first = grades[0];
  if (first && first.min >= SCORE_MAX) {
    errors.push(
      `"${first.letter || "Top grade"}" minimum must be less than ${SCORE_MAX}.`,
    );
  }

  for (let i = 0; i < grades.length - 1; i++) {
    if (grades[i].min <= grades[i + 1].min) {
      errors.push(
        `"${grades[i].letter || "A grade"}" minimum must be greater than "${grades[i + 1].letter || "the grade below it"}"'s.`,
      );
    }
    if (grades[i].points < grades[i + 1].points) {
      errors.push(
        `"${grades[i].letter}" shouldn't be worth fewer points than "${grades[i + 1].letter}".`,
      );
    }
  }

  if (grades.some((g) => g.points < 0 || g.min < 0))
    errors.push("Values can't be negative.");
  if (grades.some((g) => g.points > pointScaleMax))
    errors.push(`Points can't exceed the scale max (${pointScaleMax}).`);

  return errors;
}

export interface RowBounds {
  floor: number; // min must be strictly greater than this
  ceiling: number; // min must be strictly less than this
}

export interface SavedGradingSystem {
  pointScaleMax: number;
  grades: GradeRow[]; // ordered highest to lowest; min is 0–100
}

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// TODO: replace with the real persisted output of the Grading System page.
const savedGradingSystem: SavedGradingSystem = {
  pointScaleMax: 5,
  grades: [
    { id: "g1", letter: "A", points: 5.0, min: 70 },
    { id: "g2", letter: "B+", points: 4.0, min: 65 },
    { id: "g3", letter: "B", points: 3.5, min: 60 },
    { id: "g4", letter: "C", points: 3.0, min: 50 },
    { id: "g5", letter: "D", points: 2.0, min: 45 },
    { id: "g6", letter: "F", points: 0.0, min: 0 },
  ],
};

export const gradingApi = {
  getGradingSystem: () => delay(savedGradingSystem),
};
