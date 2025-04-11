"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import ArmorTable from "@/app/armor/ArmorTable";
import { ColumnFilter } from "@tanstack/react-table";
import React, { useState } from "react";
import { ArmorSet } from "../api/mhdb/armor/sets/ArmorSet";
import { Skill } from "../api/mhdb/skills/Skill";

export default function Client({
  data,
}: {
  data: {
    armors: Armor[];
    armorSets: ArmorSet[];
    skills: Skill[];
  };
}) {
  const columnFiltersState = useState<ColumnFilter[]>([
    { id: "rank", value: ["high"] },
  ]);

  return <ArmorTable data={data} columnFiltersState={columnFiltersState} />;
}
