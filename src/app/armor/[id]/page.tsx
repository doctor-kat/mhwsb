import { getArmor } from "@/app/api/mhdb/armor";
import { getArmorSet } from "@/app/api/mhdb/armor/sets";
import { getAllSkills } from "@/app/api/mhdb/skills";
import ArmorInfo from "@/app/armor/[id]/ArmorInfo";
import { rarityColor } from "@/app/utils";
import { Card, Modal, SimpleGrid, Text } from "@mantine/core";
import { redirect } from "next/navigation";
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

  return (
    <Card>
      <SimpleGrid cols={2}>
        <Text fw={500} c={`${rarityColor[armor.rarity]}.9`}>
          {armor.name}
        </Text>
      </SimpleGrid>
      <ArmorInfo armor={armor} armorSet={armorSet} skills={skills} />
    </Card>
  );
}
