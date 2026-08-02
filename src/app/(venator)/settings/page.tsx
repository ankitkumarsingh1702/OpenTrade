/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/profile#appearance");
}
