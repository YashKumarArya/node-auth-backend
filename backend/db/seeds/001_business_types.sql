INSERT INTO business_types (name, slug, description, display_order)
VALUES
  ('Restaurants', 'restaurants', 'Branding & packaging solutions for restaurants', 1),
  ('Bakeries', 'bakeries', 'Custom branded packaging for bakeries & dessert brands', 2),
  ('Cafés', 'cafes', 'Packaging & branding for cafés and coffee shops', 3),
  ('Fast Food', 'fast-food', 'High-volume branded packaging for QSRs', 4),
  ('North Indian', 'north-indian', 'Packaging for North Indian food businesses', 5),
  ('Chinese', 'chinese', 'Chinese & Pan-Asian food packaging solutions', 6),
  ('Hotels', 'hotels', 'Premium hospitality branding & packaging', 7),
  ('Eco-Friendly', 'eco-friendly', 'Sustainable & eco-friendly branded packaging', 8)
ON CONFLICT (slug) DO NOTHING;
