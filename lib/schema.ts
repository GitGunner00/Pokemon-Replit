import { pgTable, text, decimal, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const pokemonCards = pgTable("pokemon_cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  set: text("set").notNull(),
  cardNumber: text("card_number").notNull(),
  rarity: text("rarity").notNull(),
  condition: text("condition").notNull(),
  marketValue: decimal("market_value", { precision: 10, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const insertPokemonCardSchema = createInsertSchema(pokemonCards, {
  name: z.string().min(1, "Card name is required"),
  set: z.string().min(1, "Set is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  rarity: z.enum(["Common", "Uncommon", "Rare", "Rare Holo", "Ultra Rare", "Secret Rare"]),
  condition: z.enum(["Mint", "Near Mint", "Excellent", "Good", "Light Played", "Played", "Poor"]),
  marketValue: z.number().min(0).optional(),
  notes: z.string().optional(),
})

export const selectPokemonCardSchema = createSelectSchema(pokemonCards)

export type PokemonCard = z.infer<typeof selectPokemonCardSchema>
export type InsertPokemonCard = z.infer<typeof insertPokemonCardSchema>
