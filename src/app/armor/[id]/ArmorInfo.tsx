"use client";

import { Armor } from "@/app/api/mhdb/armor/Armor";
import { ArmorSet } from "@/app/api/mhdb/armor/sets/ArmorSet";
import { Skill } from "@/app/api/mhdb/skills/Skill";
import { rarityColor } from "@/app/utils";
import {
  Badge,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function ArmorInfo({
  armor,
  skills,
  armorSet,
}: {
  armor: Armor;
  armorSet: ArmorSet;
  skills: Skill[];
}) {
  const skillsMap = Object.groupBy(skills, (skill) => skill.id);

  return (
    <Stack gap="sm">
      <Text size="xs" c="dimmed" className="italic">
        {armor.description}
      </Text>
      <Group>
        {Object.entries(armor.resistances).map(([element, value]) => (
          <Badge
            key={element}
            variant="default"
            leftSection={
              <Image
                src={`/icon/element_${element}.png`}
                alt={element}
                width={24}
                height={24}
              />
            }
          >
            {value}
          </Badge>
        ))}
      </Group>
      <Group>
        {armor.slots.toSorted().map((slot, index) => (
          <ThemeIcon key={index} variant="outline" color="black">
            <Image
              src={`/icon/decoration_${slot}.png`}
              width={20}
              height={20}
              alt={`decoration_${slot}`}
            />
          </ThemeIcon>
        ))}
      </Group>
      <Group>
        {armor.skills.map((skill) => (
          <Badge
            key={skill.id}
            variant="default"
            rightSection={skill.level}
            className="capitalize"
          >
            {skillsMap[skill.id]?.[0].name ?? skill.id}
          </Badge>
        ))}
        {armorSet.bonus && (
          <Badge variant="default" className="capitalize">
            {skillsMap[armorSet.bonus.id]?.[0].name}
          </Badge>
        )}
        {armorSet.groupBonus && (
          <Badge variant="default" className="capitalize">
            {skillsMap[armorSet.groupBonus.id]?.[0].name}
          </Badge>
        )}
      </Group>
    </Stack>
  );
}
