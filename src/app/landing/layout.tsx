import type { Metadata } from "next";
import Nav from "@/app/navLayout/nav/nav"
import Footer from "./componets/footer"

export const metadata: Metadata = {
  title: "E-PORTAL",
  description: "The School Portal Website is a centralized digital platform designed to simplify and enhance communication, academic management, and administrative processes within a school environment. It provides students, teachers, and administrators with secure access to essential academic resources and tools in one place.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="pt-[100px]">{children}</div>
      <Footer />
    </>
  );
}
