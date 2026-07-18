import React from "react";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import WelcomeHero from "./components/WelcomeHero";
import DashboardStats from "./components/DashboardStats";
import ProgramProgressCard from "./components/ProgramProgressCard";
import TodayScheduleCard from "./components/TodayScheduleCard";
import Announcements from "./components/Announcements";
import UpcomingDeadlines from "./components/UpcomingDeadlines";
import QuickLinks from "./components/QuickLinks";
import CurrentCourses from "./components/CurrentCourses";
import { PROGRAM } from "../program/data";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  return (
    <main className="flex flex-col gap-5 my-5">
      <WelcomeHero
        firstName={session?.firstName || "Student"}
        program={PROGRAM.name}
        level="500 Level"
      />

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ProgramProgressCard />
        <TodayScheduleCard />
        <Announcements />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <QuickLinks />
        </div>
        <UpcomingDeadlines />
      </div>

      <CurrentCourses />
    </main>
  );
}
