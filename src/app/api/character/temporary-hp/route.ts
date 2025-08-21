import { NextRequest, NextResponse } from "next/server";
import characterService from "@/services/characterService";
import { TemporaryHPRequest, ApiResponse } from "@/types/character";

export async function POST(request: NextRequest) {
  try {
    const body: TemporaryHPRequest = await request.json();
    const { amount } = body;

    if (typeof amount !== "number" || amount < 0) {
      const response: ApiResponse = {
        success: false,
        error: "Temporary HP amount must be a non-negative number",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedCharacter = characterService.setTemporaryHitPoints(amount);
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
