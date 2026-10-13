export type Project = {
  name: string;
  slug: string;
  liveDemoUrl: string;
  sourceUrl: string;
  imageSrc: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Split Expenses",
    slug: "split-expenses",
    liveDemoUrl: "https://split-expenses-web.onrender.com",
    sourceUrl: "https://github.com/egrigolatto/SplitExpenses",
    imageSrc: "/images/split-expenses.png",
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
  },
];
