export interface MockProgram {
  id: string;
  title: string;
  description: string;
  stepCount: number;
}

export const mockPrograms: MockProgram[] = [
  {
    id: "prog-1",
    title: "Stress Relief Basics",
    description: "A 7-day introduction to managing daily stress.",
    stepCount: 7,
  },
  {
    id: "prog-2",
    title: "Sleep & Relaxation",
    description: "Improve sleep quality with evening routines.",
    stepCount: 5,
  },
];
