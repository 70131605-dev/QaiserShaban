/**
 * Resume content. Personal details, experience, education, skills and
 * projects come from the other data files, so the site and the PDF never
 * disagree; only resume-specific wording lives here.
 */
export const resume = {
  headline: "Software Engineer · Full-Stack Developer",
  summary:
    "Software Engineer and Full-Stack Developer based in Lahore, building production web applications, business systems, POS software and mobile apps for real clients. I work across the full stack, from responsive React and Next.js interfaces to Node.js, Express and PHP back ends and MySQL, MongoDB and Firebase data layers, and I care about clean architecture, usability and software that solves real operational problems.",

  /** Projects on the resume, in order (slugs from data/projects.ts). */
  projects: ["hot-and-spicy", "iramali-clothing-store", "humas-signature-salon", "pos-system", "erp-system"],

  /** Short skill lines, grouped the way recruiters scan them. */
  skills: [
    { label: "Frontend", items: "React, Next.js, TypeScript, JavaScript, Redux, Tailwind CSS, HTML5, CSS3" },
    { label: "Backend", items: "Node.js, Express.js, PHP, Laravel, REST APIs, JWT authentication, API integration" },
    { label: "Databases & cloud", items: "MySQL, MongoDB, Firebase, Cloudinary" },
    { label: "Mobile & desktop", items: "React Native, Electron" },
    { label: "Tools", items: "Git, GitHub, GitHub Actions, Postman, Vite, VS Code" },
  ],

  strengths: [
    "End-to-end delivery: interface, API, database and deployment",
    "Business software: POS, restaurant, booking and e-commerce",
    "Offline-first and multi-branch systems",
    "Clear communication with clients and teams",
  ],

  languages: "English (professional), Urdu (native)",
};
