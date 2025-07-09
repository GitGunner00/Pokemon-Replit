"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { PokemonCard } from "@/lib/types"

interface CardDetailsModalProps {
  card: PokemonCard
  isOpen: boolean
  onClose: () => void
}

export function CardDetailsModal({ card, isOpen, onClose }: CardDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{card.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Set</h3>
              <p className="text-lg">{card.set}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Card Number</h3>
              <p className="text-lg">{card.cardNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Rarity</h3>
              <Badge variant="secondary" className="mt-1">
                {card.rarity}
              </Badge>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Condition</h3>
              <Badge variant="outline" className="mt-1">
                {card.condition}
              </Badge>
            </div>
          </div>

          {card.marketValue && (
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Market Value</h3>
              <p className="text-2xl font-bold text-green-600">${card.marketValue.toFixed(2)}</p>
            </div>
          )}

          {card.notes && (
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Notes</h3>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{card.notes}</p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>Added: {new Date(card.createdAt).toLocaleDateString()}</p>
            {card.updatedAt !== card.createdAt && <p>Updated: {new Date(card.updatedAt).toLocaleDateString()}</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
