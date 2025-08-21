"use client";

import React from "react";
import { CharacterDisplay } from "@/components/CharacterDisplay/CharacterDisplay";
import { ActionPanel } from "@/components/ActionPanel/ActionPanel";
import { useCharacter } from "@/hooks/useCharacter";

export default function Home() {
  const {
    character,
    loading,
    error,
    dealDamage,
    heal,
    setTemporaryHP,
    resetCharacter,
  } = useCharacter();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading character...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !character) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h1 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                Error Loading Character
              </h1>
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No character data available.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            D&D Character HP Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your character's hit points, damage, and healing
          </p>
        </header>

        <div className="space-y-8">
          <CharacterDisplay character={character} />
          <ActionPanel
            onDealDamage={dealDamage}
            onHeal={heal}
            onSetTemporaryHP={setTemporaryHP}
            onReset={resetCharacter}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
