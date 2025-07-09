"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, DollarSign, Star } from "lucide-react"
import type { PokemonCard } from "@/lib/types"

interface CollectionStatsProps {
  cards: PokemonCard[]
}

export function CollectionStats({ cards }: CollectionStatsProps) {
  const totalCards = cards.length
  const totalValue = cards.reduce((sum, card) => sum + (card.marketValue || 0), 0)
  const uniqueSets = new Set(cards.map((card) => card.set)).size
  const rareCards = cards.filter(
    (card) =>
      card.rarity === "Rare" ||
      card.rarity === "Rare Holo" ||
      card.rarity === "Ultra Rare" ||
      card.rarity === "Secret Rare",
  ).length

  const stats = [
    {
      title: "Total Cards",
      value: totalCards.toLocaleString(),
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Collection Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Unique Sets",
      value: uniqueSets.toString(),
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Rare Cards",
      value: rareCards.toString(),
      icon: Star,
      color: "text-yellow-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
