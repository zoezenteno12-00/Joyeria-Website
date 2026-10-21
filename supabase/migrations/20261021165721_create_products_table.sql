/*
# Create products table for jewelry store (single-tenant, no auth)

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, name of the jewelry piece)
  - `description` (text, detailed description)
  - `category` (text, type of jewelry: collares, pulseras, anillos, aretes, pines, dijes)
  - `material` (text, material type: oro, plata, platino, piedras, madera, fantasia)
  - `price` (numeric, price in USD)
  - `available` (boolean, whether the item is in stock)
  - `season` (text, recommended season: primavera, verano, otono, invierno, todas)
  - `image_url` (text, URL of the product image)
  - `featured` (boolean, whether to show on homepage)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `products`.
- Allow anon + authenticated full CRUD because this is a single-tenant catalog with no sign-in.
- All data is intentionally public/shared.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  material text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  season text NOT NULL DEFAULT 'todas',
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);
