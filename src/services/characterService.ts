import { Character, CharacterState, DamageType } from "@/types/character";
import brivData from "../../briv.json";

class CharacterService {
  private characterState!: CharacterState;

  constructor() {
    this.initializeCharacter();
  }

  private initializeCharacter(): void {
    const character = brivData as Character;
    this.characterState = {
      ...character,
      currentHitPoints: character.hitPoints,
      temporaryHitPoints: 0,
      maxHitPoints: character.hitPoints,
    };
  }

  getCharacterState(): CharacterState {
    return { ...this.characterState };
  }

  dealDamage(amount: number, damageType: DamageType): CharacterState {
    if (amount <= 0) {
      throw new Error("Damage amount must be positive");
    }

    const immunity = this.characterState.defenses.find(
      (defense) => defense.type === damageType && defense.defense === "immunity"
    );

    if (immunity) {
      return this.getCharacterState();
    }

    const resistance = this.characterState.defenses.find(
      (defense) =>
        defense.type === damageType && defense.defense === "resistance"
    );

    let finalDamage = amount;
    if (resistance) {
      finalDamage = Math.floor(amount / 2);
    }

    if (this.characterState.temporaryHitPoints > 0) {
      if (finalDamage >= this.characterState.temporaryHitPoints) {
        finalDamage -= this.characterState.temporaryHitPoints;
        this.characterState.temporaryHitPoints = 0;
        this.characterState.currentHitPoints = Math.max(
          0,
          this.characterState.currentHitPoints - finalDamage
        );
      } else {
        this.characterState.temporaryHitPoints -= finalDamage;
      }
    } else {
      this.characterState.currentHitPoints = Math.max(
        0,
        this.characterState.currentHitPoints - finalDamage
      );
    }

    return this.getCharacterState();
  }

  heal(amount: number): CharacterState {
    if (amount <= 0) {
      throw new Error("Heal amount must be positive");
    }

    this.characterState.currentHitPoints = Math.min(
      this.characterState.maxHitPoints,
      this.characterState.currentHitPoints + amount
    );

    return this.getCharacterState();
  }

  setTemporaryHitPoints(amount: number): CharacterState {
    if (amount < 0) {
      throw new Error("Temporary hit points cannot be negative");
    }

    this.characterState.temporaryHitPoints = Math.max(
      this.characterState.temporaryHitPoints,
      amount
    );

    return this.getCharacterState();
  }

  resetCharacter(): CharacterState {
    this.initializeCharacter();
    return this.getCharacterState();
  }
}

export const characterService = new CharacterService();
export default characterService;
