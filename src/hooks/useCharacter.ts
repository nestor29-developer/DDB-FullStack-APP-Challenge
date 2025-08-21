import { useState, useEffect, useCallback } from "react";
import { CharacterState, DamageType, ApiResponse } from "@/types/character";

export const useCharacter = () => {
  const [character, setCharacter] = useState<CharacterState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/character");
      const result: ApiResponse<CharacterState> = await response.json();

      if (result.success && result.data) {
        setCharacter(result.data);
      } else {
        setError(result.error || "Failed to fetch character");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const dealDamage = useCallback(async (amount: number, type: DamageType) => {
    try {
      setError(null);
      const response = await fetch("/api/character/damage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, type }),
      });

      const result: ApiResponse<CharacterState> = await response.json();

      if (result.success && result.data) {
        setCharacter(result.data);
        return true;
      } else {
        setError(result.error || "Failed to deal damage");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    }
  }, []);

  const heal = useCallback(async (amount: number) => {
    try {
      setError(null);
      const response = await fetch("/api/character/heal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const result: ApiResponse<CharacterState> = await response.json();

      if (result.success && result.data) {
        setCharacter(result.data);
        return true;
      } else {
        setError(result.error || "Failed to heal");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    }
  }, []);

  const setTemporaryHP = useCallback(async (amount: number) => {
    try {
      setError(null);
      const response = await fetch("/api/character/temporary-hp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const result: ApiResponse<CharacterState> = await response.json();

      if (result.success && result.data) {
        setCharacter(result.data);
        return true;
      } else {
        setError(result.error || "Failed to set temporary HP");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    }
  }, []);

  const resetCharacter = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch("/api/character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reset" }),
      });

      const result: ApiResponse<CharacterState> = await response.json();

      if (result.success && result.data) {
        setCharacter(result.data);
        return true;
      } else {
        setError(result.error || "Failed to reset character");
        return false;
      }
    } catch (err) {
      setError("Network error occurred");
      return false;
    }
  }, []);

  useEffect(() => {
    fetchCharacter();
  }, [fetchCharacter]);

  return {
    character,
    loading,
    error,
    dealDamage,
    heal,
    setTemporaryHP,
    resetCharacter,
    refetch: fetchCharacter,
  };
};
