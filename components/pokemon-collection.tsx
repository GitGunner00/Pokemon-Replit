"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddCardModal } from "@/components/add-card-modal"
import { CardDetailsModal } from "@/components/card-details-modal"
import { CollectionStats } from "@/components/collection-stats"
import { SearchFilters } from "@/components/search-filters"
import type { PokemonCard } from "@/lib/schema"

export function PokemonCollection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    set: "",
    rarity: "",
    condition: "",
  })

  const queryClient = useQueryClient()

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["/api/cards"],
    queryFn: async () => {
      const response = await fetch("/api/cards")
      if (!response.ok) throw new Error("Failed to fetch cards")
      return response.json()
    },
  })

  const addCardMutation = useMutation({
    mutationFn: async (cardData: any) => {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      })
      if (!response.ok) throw new Error("Failed to add card")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] })
      setIsAddModalOpen(false)
    },
  })

  const filteredCards = cards.filter((card: PokemonCard) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSet = !filters.set || card.set === filters.set
    const matchesRarity = !filters.rarity || card.rarity === filters.rarity
    const matchesCondition = !filters.condition || card.condition === filters.condition

    return matchesSearch && matchesSet && matchesRarity && matchesCondition
  })

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-muted rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pokemon Card Collection</h1>
          <p className="text-muted-foreground">Manage your Pokemon card collection</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      <CollectionStats cards={cards} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card: PokemonCard) => (
              <Card
                key={card.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCard(card)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{card.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted rounded mb-4 flex items-center justify-center">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl || "/placeholder.svg"}
                        alt={card.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="text-muted-foreground text-sm">No Image</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{card.set}</Badge>
                      <span className="text-sm font-medium">${card.value}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{card.rarity}</span>
                      <span>{card.condition}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No cards found</h3>
              <p className="text-muted-foreground">
                {searchTerm || Object.values(filters).some(Boolean)
                  ? "Try adjusting your search or filters"
                  : "Add your first Pokemon card to get started"}
              </p>
            </div>
          )}
        </div>
      </div>

      <AddCardModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={(data) => addCardMutation.mutate(data)}
        isLoading={addCardMutation.isPending}
      />

      {selectedCard && (
        <CardDetailsModal card={selectedCard} open={!!selectedCard} onOpenChange={() => setSelectedCard(null)} />
      )}
    </div>
  )
}
