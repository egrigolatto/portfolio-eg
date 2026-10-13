import type { Content } from "./index";

export const en: Content = {
  meta: {
    title: "Emanuel Grigolatto | Full Stack Developer",
    description:
      "Personal portfolio of Emanuel Grigolatto — Full Stack Developer.",
  },
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    skip: "Skip to content",
    menuLabel: "Main navigation",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    languageLabel: "Language",
  },
  hero: {
    role: "Full Stack Developer",
    intro:
      "A developer interested in building thoughtful digital experiences and solving problems through technology.",
    cta: "Get in touch",
    cv: "CV",
  },
  about: {
    label: "About",
    statement:
      "Interested in understanding how things work and continuously learning across the stack.",
    study: "",
    linkedin: "Connect with me",
  },
  projects: {
    label: "Projects",
    live: "Live demo",
    source: "Source",
    items: {
      "split-expenses": {
        description:
          "Split shared expenses among a group with automatic balance calculation, minimizing the number of transfers needed to settle up.",
        alt: "Split Expenses summary for the “Viaje a la costa” meeting: per-participant balances and the minimum set of transfers that settle the group.",
      },
    },
  },
  toolkit: {
    label: "Technical Toolkit",
  },
  contact: {
    label: "Contact",
    invitation: "Interested in working together? Drop a message.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Submit",
    sending: "Sending…",
    sent: "Thanks for reaching out! I'll reply by email shortly.",
    errors: {
      name: "Please enter a name between 2 and 80 characters.",
      email: "Please enter a valid email address.",
      message: "Your message must be between 10 and 4000 characters.",
      form: "Something went wrong while sending. Please try again in a few minutes.",
    },
    github: "GitHub",
    cv: "My CV",
  },
  footer: {
    rights: "All rights reserved.",
    github: "GitHub",
  },
};
