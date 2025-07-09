"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { PokemonCard } from "@/lib/schema"

interface CardDetailsModalProps {
  card: PokemonCard
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CardDetailsModal({ card, open, onOpenChange }: CardDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {card.imageUrl && (
            <div className="aspect-[3/4] bg-muted rounded overflow-hidden">
              <img src={card.imageUrl || "/placeholder.svg"} alt={card.name} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Set</h4>
              <Badge variant="secondary">{card.set}</Badge>
            </div>

            {card.number && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Number</h4>
                <p className="text-sm">{card.number}</p>
              </div>
            )}

            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Rarity</h4>
              <p className="text-sm capitalize">{card.rarity.replace("-", " ")}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm text-muted-foreground">Condition</h4>
              <p className="text-sm capitalize">{card.condition.replace("-", " ")}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Value</h4>
            <p className="text-2xl font-bold">${card.value}</p>
          </div>

          {card.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">{card.notes}</p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Added</h4>
            <p className="text-sm text-muted-foreground">
              {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : "Unknown"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
