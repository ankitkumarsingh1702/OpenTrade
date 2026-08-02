import type { Metadata } from "next";

import { ProfileContent } from "@/components/venator/profile/profile-content";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="page page--content page--profile">
      <header className="page-title page-title--profile">
        <span aria-hidden="true" />
        <h1>Profile</h1>
      </header>
      <ProfileContent />
    </div>
  );
}
