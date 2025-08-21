import React from "react";
import { CharacterState } from "@/types/character";
import styles from "./CharacterDisplay.module.css";

interface CharacterDisplayProps {
  character: CharacterState;
}

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  character,
}) => {

  return (
    <div
      className={styles.characterCard}
      role="region"
      aria-label="Character Information"
    >
      <div className={styles.characterHeader}>
        <div>
          <h1 className={styles.characterName}>{character.name}</h1>
          <p className={styles.characterLevel}>
            Level {character.level}{" "}
            {character.classes.map((c) => c.name).join(", ")}
          </p>
        </div>
      </div>

      <div className={styles.hpSection}>
        <h2 className={styles.hpTitle}>Hit Points</h2>
        <div className={styles.hpGrid}>
          <div className={styles.hpItem}>
            <div className={styles.hpLabel}>Current</div>
            <div
              className={styles.hpValue}
              aria-label={`Current hit points: ${character.currentHitPoints}`}
            >
              {character.currentHitPoints}
            </div>
          </div>
          <div className={styles.hpItem}>
            <div className={styles.hpLabel}>Temporary</div>
            <div
              className={`${styles.hpValue} ${styles.hpTemporary}`}
              aria-label={`Temporary hit points: ${character.temporaryHitPoints}`}
            >
              {character.temporaryHitPoints}
            </div>
          </div>
          <div className={styles.hpItem}>
            <div className={styles.hpLabel}>Maximum</div>
            <div
              className={`${styles.hpValue} ${styles.hpMax}`}
              aria-label={`Maximum hit points: ${character.maxHitPoints}`}
            >
              {character.maxHitPoints}
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.statsGrid}
        role="group"
        aria-label="Character Statistics"
      >
        {Object.entries(character.stats).map(([statName, statValue]) => (
          <div key={statName} className={styles.statItem}>
            <div className={styles.statLabel}>{statName}</div>
            <div
              className={styles.statValue}
              aria-label={`${statName}: ${statValue}`}
            >
              {statValue}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.defensesSection}>
        <h2 className={styles.defensesTitle}>Defenses</h2>
        <div
          className={styles.defensesList}
          role="list"
          aria-label="Character Defenses"
        >
          {character.defenses.length > 0 ? (
            character.defenses.map((defense, index) => (
              <span
                key={index}
                className={`${styles.defenseItem} ${
                  defense.defense === "immunity"
                    ? styles.immunity
                    : styles.resistance
                }`}
                role="listitem"
                aria-label={`${defense.defense} to ${defense.type} damage`}
              >
                {defense.defense === "immunity" ? "🛡️" : "🔰"} {defense.type} (
                {defense.defense})
              </span>
            ))
          ) : (
            <span className={styles.noDefenses}>No special defenses</span>
          )}
        </div>
      </div>
    </div>
  );
};
