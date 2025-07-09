-- Create the pokemon_cards table
CREATE TABLE IF NOT EXISTS pokemon_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  set TEXT NOT NULL,
  card_number TEXT NOT NULL,
  rarity TEXT NOT NULL,
  condition TEXT NOT NULL,
  market_value DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create an index on the name column for faster searches
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_name ON pokemon_cards(name);

-- Create an index on the set column for filtering
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_set ON pokemon_cards(set);

-- Create an index on the rarity column for filtering
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_rarity ON pokemon_cards(rarity);
