import React, { useState } from "react";
import { DamageType } from "@/types/character";
import styles from "./ActionPanel.module.css";

interface ActionPanelProps {
  onDealDamage: (amount: number, type: DamageType) => Promise<boolean>;
  onHeal: (amount: number) => Promise<boolean>;
  onSetTemporaryHP: (amount: number) => Promise<boolean>;
  onReset: () => Promise<boolean>;
  loading?: boolean;
  error?: string | null;
}

const DAMAGE_TYPES: DamageType[] = [
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

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onDealDamage,
  onHeal,
  onSetTemporaryHP,
  onReset,
  loading = false,
  error,
}) => {
  const [damageAmount, setDamageAmount] = useState<string>("");
  const [damageType, setDamageType] = useState<DamageType>("bludgeoning");
  const [healAmount, setHealAmount] = useState<string>("");
  const [tempHPAmount, setTempHPAmount] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setSuccessMessage(null);
  };

  const handleDealDamage = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(damageAmount, 10);

    if (isNaN(amount) || amount <= 0) {
      return;
    }

    setActionLoading("damage");
    clearMessages();

    try {
      const success = await onDealDamage(amount, damageType);
      if (success) {
        setDamageAmount("");
        setSuccessMessage(`Dealt ${amount} ${damageType} damage!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error dealing damage:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleHeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(healAmount, 10);

    if (isNaN(amount) || amount <= 0) {
      return;
    }

    setActionLoading("heal");
    clearMessages();

    try {
      const success = await onHeal(amount);
      if (success) {
        setHealAmount("");
        setSuccessMessage(`Healed ${amount} hit points!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error healing:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSetTemporaryHP = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(tempHPAmount, 10);

    if (isNaN(amount) || amount < 0) {
      return;
    }

    setActionLoading("tempHP");
    clearMessages();

    try {
      const success = await onSetTemporaryHP(amount);
      if (success) {
        setTempHPAmount("");
        setSuccessMessage(`Set temporary HP to ${amount}!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error setting temporary HP:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReset = async () => {
    setActionLoading("reset");
    clearMessages();

    try {
      const success = await onReset();
      if (success) {
        setDamageAmount("");
        setHealAmount("");
        setTempHPAmount("");
        setSuccessMessage("Character reset to full health!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error resetting character:", error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div
      className={styles.actionPanel}
      role="region"
      aria-label="Character Actions"
    >
      <h2 className={styles.panelTitle}>Actions</h2>

      {error && (
        <div className={styles.errorMessage} role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {successMessage && (
        <div className={styles.successMessage} role="status" aria-live="polite">
          {successMessage}
        </div>
      )}

      <div className={styles.actionGrid}>
        <div className={styles.actionSection}>
          <h3 className={styles.sectionTitle}>Deal Damage</h3>
          <form onSubmit={handleDealDamage}>
            <div className={styles.inputGroup}>
              <label htmlFor="damage-amount" className={styles.label}>
                Damage Amount
              </label>
              <input
                id="damage-amount"
                type="number"
                min="1"
                value={damageAmount}
                onChange={(e) => setDamageAmount(e.target.value)}
                className={styles.input}
                placeholder="Enter damage amount"
                required
                aria-describedby="damage-amount-help"
                disabled={loading || actionLoading !== null}
              />
              <span id="damage-amount-help" className="sr-only">
                Enter a positive number for damage amount
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="damage-type" className={styles.label}>
                Damage Type
              </label>
              <select
                id="damage-type"
                value={damageType}
                onChange={(e) => setDamageType(e.target.value as DamageType)}
                className={styles.select}
                disabled={loading || actionLoading !== null}
                aria-describedby="damage-type-help"
              >
                {DAMAGE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <span id="damage-type-help" className="sr-only">
                Select the type of damage to deal
              </span>
            </div>

            <button
              type="submit"
              className={`${styles.button} ${styles.damageButton}`}
              disabled={loading || actionLoading !== null || !damageAmount}
              aria-describedby="deal-damage-help"
            >
              {actionLoading === "damage" && (
                <span className={styles.loadingSpinner} aria-hidden="true" />
              )}
              Deal Damage
            </button>
            <span id="deal-damage-help" className="sr-only">
              This will deal the specified damage to the character
            </span>
          </form>
        </div>

        <div className={styles.actionSection}>
          <h3 className={styles.sectionTitle}>Heal</h3>
          <form onSubmit={handleHeal}>
            <div className={styles.inputGroup}>
              <label htmlFor="heal-amount" className={styles.label}>
                Heal Amount
              </label>
              <input
                id="heal-amount"
                type="number"
                min="1"
                value={healAmount}
                onChange={(e) => setHealAmount(e.target.value)}
                className={styles.input}
                placeholder="Enter heal amount"
                required
                aria-describedby="heal-amount-help"
                disabled={loading || actionLoading !== null}
              />
              <span id="heal-amount-help" className="sr-only">
                Enter a positive number for heal amount
              </span>
            </div>

            <button
              type="submit"
              className={`${styles.button} ${styles.healButton}`}
              disabled={loading || actionLoading !== null || !healAmount}
              aria-describedby="heal-help"
            >
              {actionLoading === "heal" && (
                <span className={styles.loadingSpinner} aria-hidden="true" />
              )}
              Heal
            </button>
            <span id="heal-help" className="sr-only">
              This will heal the character by the specified amount
            </span>
          </form>
        </div>

        <div className={styles.actionSection}>
          <h3 className={styles.sectionTitle}>Temporary HP</h3>
          <form onSubmit={handleSetTemporaryHP}>
            <div className={styles.inputGroup}>
              <label htmlFor="temp-hp-amount" className={styles.label}>
                Temporary HP Amount
              </label>
              <input
                id="temp-hp-amount"
                type="number"
                min="0"
                value={tempHPAmount}
                onChange={(e) => setTempHPAmount(e.target.value)}
                className={styles.input}
                placeholder="Enter temporary HP"
                required
                aria-describedby="temp-hp-help"
                disabled={loading || actionLoading !== null}
              />
              <span id="temp-hp-help" className="sr-only">
                Enter a non-negative number for temporary hit points
              </span>
            </div>

            <button
              type="submit"
              className={`${styles.button} ${styles.tempHpButton}`}
              disabled={
                loading || actionLoading !== null || tempHPAmount === ""
              }
              aria-describedby="set-temp-hp-help"
            >
              {actionLoading === "tempHP" && (
                <span className={styles.loadingSpinner} aria-hidden="true" />
              )}
              Set Temporary HP
            </button>
            <span id="set-temp-hp-help" className="sr-only">
              This will set temporary hit points for the character
            </span>
          </form>
        </div>
      </div>

      <button
        onClick={handleReset}
        className={`${styles.button} ${styles.resetButton}`}
        disabled={loading || actionLoading !== null}
        aria-describedby="reset-help"
      >
        {actionLoading === "reset" && (
          <span className={styles.loadingSpinner} aria-hidden="true" />
        )}
        Reset Character
      </button>
      <span id="reset-help" className="sr-only">
        This will reset the character to full health
      </span>
    </div>
  );
};
