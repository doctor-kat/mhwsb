"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import ArmorInfo from "@/app/armor/[id]/ArmorInfo";
import { rarityColor } from "@/app/utils";
import { Modal, SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function ArmorModal({
  armor,
  skills,
  armorSet,
}: {
  armor: Armor;
  armorSet: ArmorSet;
  skills: Skill[];
}) {
  const router = useRouter();

  return (
    <Modal
      opened
      onClose={() => router.back()}
      title={
        <SimpleGrid cols={2}>
          <Text fw={500} c={`${rarityColor[armor.rarity]}.9`}>
            {armor.name}
          </Text>
        </SimpleGrid>
      }
    >
      <ArmorInfo armor={armor} armorSet={armorSet} skills={skills} />
    </Modal>
  );
}
