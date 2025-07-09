"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { pokemonSets, cardRarities, cardConditions } from "@/lib/schema"

interface SearchFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filters: {
    set: string
    rarity: string
    condition: string
  }
  onFiltersChange: (filters: { set: string; rarity: string; condition: string }) => void
}

export function SearchFilters({ searchTerm, onSearchChange, filters, onFiltersChange }: SearchFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({ set: "", rarity: "", condition: "" })
    onSearchChange("")
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some(Boolean)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="search">Search Cards</Label>
          <Input
            id="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="set-filter">Set</Label>
          <Select value={filters.set} onValueChange={(value) => onFiltersChange({ ...filters, set: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All sets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sets</SelectItem>
              {pokemonSets.map((set) => (
                <SelectItem key={set.value} value={set.value}>
                  {set.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rarity-filter">Rarity</Label>
          <Select value={filters.rarity} onValueChange={(value) => onFiltersChange({ ...filters, rarity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All rarities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All rarities</SelectItem>
              {cardRarities.map((rarity) => (
                <SelectItem key={rarity.value} value={rarity.value}>
                  {rarity.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="condition-filter">Condition</Label>
          <Select
            value={filters.condition}
            onValueChange={(value) => onFiltersChange({ ...filters, condition: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conditions</SelectItem>
              {cardConditions.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
