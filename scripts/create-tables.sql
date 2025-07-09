-- Create the pokemon_cards table
CREATE TABLE IF NOT EXISTS pokemon_cards (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  set TEXT NOT NULL,
  number TEXT,
  rarity TEXT NOT NULL,
  condition TEXT NOT NULL,
  value DECIMAL(10, 2) DEFAULT 0.00,
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_name ON pokemon_cards(name);
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_set ON pokemon_cards(set);
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_rarity ON pokemon_cards(rarity);
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_condition ON pokemon_cards(condition);
CREATE INDEX IF NOT EXISTS idx_pokemon_cards_created_at ON pokemon_cards(created_at);
