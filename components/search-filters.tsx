"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { PokemonCard } from "@/lib/types"

interface SearchFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedSet: string
  onSetChange: (value: string) => void
  selectedRarity: string
  onRarityChange: (value: string) => void
  cards: PokemonCard[]
}

export function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedSet,
  onSetChange,
  selectedRarity,
  onRarityChange,
  cards,
}: SearchFiltersProps) {
  const uniqueSets = Array.from(new Set(cards.map((card) => card.set))).sort()
  const uniqueRarities = Array.from(new Set(cards.map((card) => card.rarity))).sort()

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full sm:w-64"
        />
      </div>

      <Select value={selectedSet} onValueChange={onSetChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Sets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="allSets">All Sets</SelectItem>
          {uniqueSets.map((set) => (
            <SelectItem key={set} value={set}>
              {set}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRarity} onValueChange={onRarityChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Rarities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="allRarities">All Rarities</SelectItem>
          {uniqueRarities.map((rarity) => (
            <SelectItem key={rarity} value={rarity}>
              {rarity}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
