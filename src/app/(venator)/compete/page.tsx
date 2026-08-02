/*
 * Copyright © 2026 Ankit Kumar Singh
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Metadata } from "next";

import { CampusInterestForm } from "@/components/venator/compete/campus-interest-form";
import { CampusRankings } from "@/components/venator/compete/campus-rankings";
import { CompetitionBrief } from "@/components/venator/compete/competition-brief";

export const metadata: Metadata = { title: "Compete" };

export default function CompetePage() {
  return (
    <div className="page page--content page--compete">
      <header className="page-title">
        <span aria-hidden="true" />
        <h1>Compete</h1>
      </header>
      <CompetitionBrief />
      <CampusInterestForm />
      <CampusRankings />
    </div>
  );
}
