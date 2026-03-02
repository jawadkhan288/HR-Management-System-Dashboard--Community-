import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Report } from "./components/Report";
import { Employees } from "./components/Employees";
import { JobPosting } from "./components/JobPosting";
import { Candidate } from "./components/Candidate";
import { CalendarPage } from "./components/CalendarPage";
import { ResumeParsing } from "./components/ResumeParsing";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "report", Component: Report },
      { path: "employees", Component: Employees },
      { path: "job-posting", Component: JobPosting },
      { path: "candidate", Component: Candidate },
      { path: "calendar", Component: CalendarPage },
      { path: "resume-parsing", Component: ResumeParsing },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
]);