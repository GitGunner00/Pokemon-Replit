import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { pokemonCards, insertPokemonCardSchema } from "@/lib/schema"
import { desc } from "drizzle-orm"

export async function GET() {
  try {
    const cards = await db.select().from(pokemonCards).orderBy(desc(pokemonCards.createdAt))

    return NextResponse.json(cards)
  } catch (error) {
    console.error("Failed to fetch cards:", error)
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = insertPokemonCardSchema.parse(body)

    // Insert the card into the database
    const [newCard] = await db.insert(pokemonCards).values(validatedData).returning()

    return NextResponse.json(newCard, { status: 201 })
  } catch (error) {
    console.error("Failed to create card:", error)
    return NextResponse.json({ error: "Failed to create card" }, { status: 500 })
  }
}
