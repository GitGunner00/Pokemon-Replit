"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddCardModal } from "./add-card-modal"
import { CardDetailsModal } from "./card-details-modal"
import { CollectionStats } from "./collection-stats"
import { SearchFilters } from "./search-filters"
import type { PokemonCard } from "@/lib/types"

async function fetchCards(): Promise<PokemonCard[]> {
  const response = await fetch("/api/cards")
  if (!response.ok) {
    throw new Error("Failed to fetch cards")
  }
  return response.json()
}

export default function PokemonCollection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSet, setSelectedSet] = useState("")
  const [selectedRarity, setSelectedRarity] = useState("")

  const {
    data: cards = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  })

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSet = !selectedSet || card.set === selectedSet
    const matchesRarity = !selectedRarity || card.rarity === selectedRarity
    return matchesSearch && matchesSet && matchesRarity
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading your collection...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">Failed to load collection</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CollectionStats cards={cards} />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSet={selectedSet}
          onSetChange={setSelectedSet}
          selectedRarity={selectedRarity}
          onRarityChange={setSelectedRarity}
          cards={cards}
        />
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCard(card)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{card.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Set:</span>
                  <span className="font-medium">{card.set}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rarity:</span>
                  <span className="font-medium">{card.rarity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">{card.condition}</span>
                </div>
                {card.marketValue && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-medium text-green-600">${card.marketValue.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No cards found matching your criteria</p>
        </div>
      )}

      <AddCardModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {selectedCard && (
        <CardDetailsModal card={selectedCard} isOpen={!!selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  )
}
