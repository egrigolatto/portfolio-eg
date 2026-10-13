import {
  siCss,
  siDocker,
  siGit,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type Technology = {
  iconPath: string;
  name: string;
};

const entries: { icon: SimpleIcon; name: string }[] = [
  { icon: siHtml5, name: "HTML" },
  { icon: siCss, name: "CSS" },
  { icon: siJavascript, name: "JavaScript" },
  { icon: siTypescript, name: "TypeScript" },
  { icon: siReact, name: "React" },
  { icon: siNodedotjs, name: "Node.js" },
  { icon: siPython, name: "Python" },
  { icon: siPostgresql, name: "PostgreSQL" },
  { icon: siGit, name: "Git" },
  { icon: siDocker, name: "Docker" },
];

export const technologies: Technology[] = entries.map(({ icon, name }) => ({
  iconPath: icon.path,
  name,
}));
