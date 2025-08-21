export type DamageType = 
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'fire'
  | 'cold'
  | 'acid'
  | 'thunder'
  | 'lightning'
  | 'poison'
  | 'radiant'
  | 'necrotic'
  | 'psychic'
  | 'force';

export type DefenseType = 'resistance' | 'immunity';

export interface CharacterClass {
  name: string;
  hitDiceValue: number;
  classLevel: number;
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface ItemModifier {
  affectedObject: string;
  affectedValue: string;
  value: number;
}

export interface CharacterItem {
  name: string;
  modifier: ItemModifier;
}

export interface CharacterDefense {
  type: DamageType;
  defense: DefenseType;
}

export interface Character {
  name: string;
  level: number;
  hitPoints: number;
  classes: CharacterClass[];
  stats: CharacterStats;
  items: CharacterItem[];
  defenses: CharacterDefense[];
}

export interface CharacterState extends Character {
  currentHitPoints: number;
  temporaryHitPoints: number;
  maxHitPoints: number;
}

export interface DamageRequest {
  amount: number;
  type: DamageType;
}

export interface HealRequest {
  amount: number;
}

export interface TemporaryHPRequest {
  amount: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
