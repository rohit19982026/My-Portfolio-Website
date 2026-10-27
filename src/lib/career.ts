/** The career facts shown in the "My journey" section. Presentation lives in
 *  components/journey; this file is only the content. */

export const intro = { lede: "Education and career, from 2014 to today." };

export const school = [
  { year: 2014, title: "Class 10", note: "Completed Class 10" },
  { year: 2016, title: "Class 12", note: "Completed Class 12" },
];

export const degree = {
  year: 2020,
  title: ["Bachelor of", "Computer Application"],
  place: "Brainware University, Kolkata",
};

export const bt = {
  year: 2020,
  lines: ["Started my career", "at British Telecom"],
  role: "Change Manager, IT Infrastructure",
  span: "Aug 2020 to Nov 2022 · Kolkata",
};

export const phdata = {
  when: "Dec 2022",
  title: "Joined phData",
  note: "Moved to phData in December 2022",
  role: "Technical Project Manager, Data & AI",
};

export const award = {
  title: "phData Innovation Award",
  desc: "Given for the agents that set up new projects from signed SOWs and sent weekly status reports to clients by email and Slack.",
};

export const certs = [
  { name: "Claude Certified Architect (Foundations)", issuer: "Anthropic" },
  { name: "PSM I, Professional Scrum Master", issuer: "Scrum.org" },
  { name: "ITIL Foundation", issuer: "Axelos" },
  { name: "LandingLens Computer Vision Fundamentals", issuer: "LandingAI" },
  { name: "LandingLens on Snowflake", issuer: "LandingAI" },
  { name: "Deeply Practical Project Management", issuer: "Course" },
  { name: "Data Warehouse Fundamentals", issuer: "Course" },
];
