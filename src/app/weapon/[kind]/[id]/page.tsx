import { getAllSkills } from "@/app/api/mhdb/skills";
import { getWeapon } from "@/app/api/mhdb/weapons";
import { WeaponKind } from "@/app/api/mhdb/weapons/WeaponKind";
import { rarityColor } from "@/app/utils";
import BaseWeaponInfo from "@/app/weapon/[kind]/[id]/BaseWeaponInfo";
import { Card, SimpleGrid, Text } from "@mantine/core";
import React from "react";

export async function getData({ id }: { id: number }) {
  const weapon = await getWeapon({ id });
  const allSkills = Object.groupBy(await getAllSkills(), (skill) => skill.id);

  const skills = (weapon.skills ?? [])
    .map((skillRank) => skillRank.skill.id)
    .map((id) => allSkills[id!]![0]);

  return { weapon, skills };
}

export default async function Page({
  params,
}: {
  params: Promise<{ kind: WeaponKind; id: number }>;
}) {
  const { id } = await params;
  const data = await getData({ id });

  return (
    <Card>
      <SimpleGrid cols={2}>
        <Text fw={500} c={`${rarityColor[data.weapon.rarity]}.9`}>
          {data.weapon.name}
        </Text>
      </SimpleGrid>
      <BaseWeaponInfo {...data} />
    </Card>
  );
}
