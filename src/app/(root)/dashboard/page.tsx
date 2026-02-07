import React from "react";
import DegreeProgress from "./components/DegreeProgress";
import UpcomingDeadlines from "./components/UpcomingDeadlines";
import Announcements from "./components/Announcements";
import QuickLinks from "./components/QuickLinks";
import CurrentCourses from "./components/CurrentCourses";

export default function page() {
  return (
    <main className="flex flex-col gap-5 my-5">
      <div className="flex flex-col lg:flex-row gap-5 h-full mb-5">
        <DegreeProgress />
        <Announcements />
        <UpcomingDeadlines />
      </div>
      <QuickLinks />
      <CurrentCourses />
    </main>
  );
}
