"use client";

import { Armor, ArmorKind } from "@/app/api/mhdb/armor/Armor";
import { ActionIcon, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ArmorGroup({ armors }: { armors: Armor[] }) {
  const armorMap = Object.fromEntries(
    Object.values(ArmorKind).map((armorKind) => [
      armorKind,
      armors.filter((armor) => armorKind === armor.kind)?.[0],
    ])
  ) as Record<ArmorKind, Armor | undefined>;

  return (
    <Group grow preventGrowOverflow={false}>
      {Object.entries(armorMap).map(([armorKind, armor], index) => (
        <ActionIcon
          key={index}
          disabled={!armor}
          component={Link}
          scroll={false}
          href={`/armor/${armor?.id}`}
          size={36}
          variant="outline"
          className="bg-transparent"
        >
          <Image
            src={`/icon/armor/${armor ? armorKind : "none"}.png`}
            alt={armorKind}
            width={24}
            height={24}
          />
        </ActionIcon>
      ))}
    </Group>
  );
}
