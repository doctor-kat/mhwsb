import { Armor } from "@/app/api/mhdb/armor/Armor";
import { baseUrl } from "@/app/api/mhdb/endpoint";

export async function getArmor({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}/armor/${id}`, {
    cache: "force-cache",
  });
  const armor: Armor = await response.json();
  return armor;
}

export async function getAllArmor() {
  const response = await fetch(`${baseUrl}/armor`, {
    cache: "force-cache",
  });
  const armors: Armor[] = await response.json();
  return armors;
}
