import { NextRequest, NextResponse } from "next/server";
import characterService from "@/services/characterService";
import { DamageRequest, ApiResponse, DamageType } from "@/types/character";

const VALID_DAMAGE_TYPES: DamageType[] = [
  "bludgeoning",
  "piercing",
  "slashing",
  "fire",
  "cold",
  "acid",
  "thunder",
  "lightning",
  "poison",
  "radiant",
  "necrotic",
  "psychic",
  "force",
];

export async function POST(request: NextRequest) {
  try {
    const body: DamageRequest = await request.json();
    const { amount, type } = body;

    if (typeof amount !== "number" || amount <= 0) {
      const response: ApiResponse = {
        success: false,
        error: "Damage amount must be a positive number",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!type || !VALID_DAMAGE_TYPES.includes(type)) {
      const response: ApiResponse = {
        success: false,
        error: `Invalid damage type. Must be one of: ${VALID_DAMAGE_TYPES.join(
          ", "
        )}`,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedCharacter = characterService.dealDamage(amount, type);
    const response: ApiResponse = {
      success: true,
      data: updatedCharacter,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
