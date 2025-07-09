"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { InsertPokemonCard } from "@/lib/types"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
}

async function createCard(card: InsertPokemonCard) {
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  })

  if (!response.ok) {
    throw new Error("Failed to create card")
  }

  return response.json()
}

export function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const [formData, setFormData] = useState<InsertPokemonCard>({
    name: "",
    set: "",
    cardNumber: "",
    rarity: "Common",
    condition: "Near Mint",
    marketValue: 0,
    notes: "",
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] })
      toast({
        title: "Success",
        description: "Card added to your collection!",
      })
      onClose()
      setFormData({
        name: "",
        set: "",
        cardNumber: "",
        rarity: "Common",
        condition: "Near Mint",
        marketValue: 0,
        notes: "",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add card. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Card Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="set">Set</Label>
            <Input
              id="set"
              value={formData.set}
              onChange={(e) => setFormData({ ...formData, set: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rarity">Rarity</Label>
            <Select
              value={formData.rarity}
              onValueChange={(value) => setFormData({ ...formData, rarity: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Common">Common</SelectItem>
                <SelectItem value="Uncommon">Uncommon</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Rare Holo">Rare Holo</SelectItem>
                <SelectItem value="Ultra Rare">Ultra Rare</SelectItem>
                <SelectItem value="Secret Rare">Secret Rare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => setFormData({ ...formData, condition: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mint">Mint</SelectItem>
                <SelectItem value="Near Mint">Near Mint</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Light Played">Light Played</SelectItem>
                <SelectItem value="Played">Played</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketValue">Market Value ($)</Label>
            <Input
              id="marketValue"
              type="number"
              step="0.01"
              min="0"
              value={formData.marketValue}
              onChange={(e) => setFormData({ ...formData, marketValue: Number.parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about this card..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Adding..." : "Add Card"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
