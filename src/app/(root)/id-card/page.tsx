import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { IdCard } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import IdCardPreview from "./components/IdCardPreview";
import ReprintRequestPanel from "./components/ReprintRequestPanel";

export default async function IdCardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Student ID Card"
        subtitle="Download your digital ID card or request a physical reprint"
        badge={session?.matric || undefined}
        badgeIcon={IdCard}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div>
          <IdCardPreview
            name={session?.firstName || "Student"}
            matric={session?.matric || "N/A"}
            program="BSc. Computer Science"
            level="500 Level"
            validThru="Aug 2026"
          />
        </div>
        <div className="lg:col-span-2">
          <ReprintRequestPanel />
        </div>
      </div>
    </main>
  );
}
