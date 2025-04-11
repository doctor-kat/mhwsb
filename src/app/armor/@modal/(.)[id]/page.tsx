import { getArmor } from "@/app/api/mhdb/armor";
import { getArmorSet } from "@/app/api/mhdb/armor/sets";
import { getAllSkills } from "@/app/api/mhdb/skills";
import ArmorModal from "@/app/armor/@modal/(.)[id]/ArmorModal";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const armor = await getArmor({ id: Number(id) });
  const armorSet = await getArmorSet({ id: armor.armorSet.id! });
  const allSkills = Object.groupBy(await getAllSkills(), (skill) => skill.id);

  const skills = [
    ...armor.skills.map((skill) => skill.id),
    armorSet.bonus?.id,
    armorSet.groupBonus?.id,
  ]
    .filter(
      (id): id is number => id !== undefined && allSkills[id] !== undefined
    )
    .map((id) => allSkills[id]![0]);

  return <ArmorModal armor={armor} armorSet={armorSet} skills={skills} />;
}
