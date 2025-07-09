"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, Star, DollarSign } from "lucide-react"
import type { PokemonCard } from "@/lib/schema"

interface CollectionStatsProps {
  cards: PokemonCard[]
}

export function CollectionStats({ cards }: CollectionStatsProps) {
  const totalCards = cards.length
  const totalValue = cards.reduce((sum, card) => sum + Number.parseFloat(card.value || "0"), 0)
  const uniqueSets = new Set(cards.map((card) => card.set)).size
  const rareCards = cards.filter(
    (card) => card.rarity.includes("rare") || card.rarity.includes("ultra") || card.rarity.includes("secret"),
  ).length

  const stats = [
    {
      title: "Total Cards",
      value: totalCards.toLocaleString(),
      icon: Package,
      description: "Cards in collection",
    },
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      description: "Estimated collection value",
    },
    {
      title: "Unique Sets",
      value: uniqueSets.toString(),
      icon: TrendingUp,
      description: "Different Pokemon sets",
    },
    {
      title: "Rare Cards",
      value: rareCards.toString(),
      icon: Star,
      description: "Rare or better cards",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
