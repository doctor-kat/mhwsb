import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { baseUrl } from "@/app/api/mhdb/endpoint";
import { NextRequest } from "next/server";

export async function getArmorSet({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}/armor/sets/${id}`, {
    cache: "force-cache",
  });
  const armorSet: ArmorSet = await response.json();
  return armorSet;
}

export async function getAllArmorSets() {
  const response = await fetch(`${baseUrl}/armor/sets`, {
    cache: "force-cache",
  });
  const armorSets: ArmorSet[] = await response.json();
  return armorSets;
}
