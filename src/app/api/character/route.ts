import { NextRequest, NextResponse } from 'next/server';
import characterService from '@/services/characterService';
import { ApiResponse } from '@/types/character';

export async function GET() {
  try {
    const character = characterService.getCharacterState();
    const response: ApiResponse = {
      success: true,
      data: character,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'reset') {
      const character = characterService.resetCharacter();
      const response: ApiResponse = {
        success: true,
        data: character,
      };
      return NextResponse.json(response);
    }
    
    const response: ApiResponse = {
      success: false,
      error: 'Invalid action',
    };
    return NextResponse.json(response, { status: 400 });
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
