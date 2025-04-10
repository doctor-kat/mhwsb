"use client";

import { Weapon } from "@/app/api/mhdb/weapons/Weapon";
import { rarityColor } from "@/app/utils";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import Image from "next/image";
import React from "react";

export default function WeaponGroup({ weapons }: { weapons: Weapon[] }) {
  const weaponsByColumn = Object.groupBy(
    weapons,
    (weapon) => weapon.crafting.column
  );

  return (
    <Group>
      {Array(10)
        .fill(null)
        .map((_, index) => {
          const weapon = weaponsByColumn[index]?.[0];
          if (weapon) {
            return (
              <Tooltip key={index} label={weapon.name}>
                <ActionIcon
                  size={36}
                  variant="outline"
                  className="bg-transparent"
                  color={`${rarityColor[weapon.rarity]}.9`}
                >
                  <Image
                    src={`/icon/weapon_${weapon.kind}.png`}
                    alt={weapon.kind}
                    width={24}
                    height={24}
                  />
                </ActionIcon>
              </Tooltip>
            );
          }

          return (
            <ActionIcon
              key={index}
              disabled
              size={36}
              variant="outline"
              className="bg-transparent"
            ></ActionIcon>
          );
        })}
    </Group>
  );
}
