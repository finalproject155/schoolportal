import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";
import { UserCircle } from "lucide-react";
import PageHeader from "@/components/portal/PageHeader";
import ProfileForm from "./components/ProfileForm";
import AvatarCard from "./components/AvatarCard";
import ChangePasswordForm from "./components/ChangePasswordForm";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = sessionToken ? await verifySessionToken(sessionToken) : null;

  const initial = {
    firstName: session?.firstName ?? "Student",
    email: session?.email ?? "",
    matric: session?.matric ?? "",
    phone: "+234 902 723 4716",
    dob: "1997-03-14",
    gender: "Female",
    country: "Nigeria",
    state: "Ogun State/Abeokuta",
    howHeard: "Through LinkedIn",
  };

  return (
    <main className="flex flex-col gap-5 my-5">
      <PageHeader
        title="Profile Management"
        subtitle="View and update your personal information"
        badge={initial.matric || undefined}
        badgeIcon={UserCircle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ProfileForm initial={initial} />
        </div>
        <div className="flex flex-col gap-5">
          <AvatarCard firstName={initial.firstName} />
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  );
}
