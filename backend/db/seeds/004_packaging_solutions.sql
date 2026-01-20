-- RESTAURANTS
INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Takeaway Packaging with Branding',
       'takeaway-packaging',
       'Branded packaging for daily food delivery'
FROM business_types WHERE slug = 'restaurants';

INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Biryani Packaging Solutions',
       'biryani-packaging',
       'Leak-proof, premium biryani branding'
FROM business_types WHERE slug = 'restaurants';

-- BAKERIES
INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Cake Box Branding',
       'cake-box-branding',
       'Custom branded cake boxes for bakeries'
FROM business_types WHERE slug = 'bakeries';

INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Dessert & Pastry Packaging',
       'dessert-packaging',
       'Elegant packaging for pastries and desserts'
FROM business_types WHERE slug = 'bakeries';

-- CAFÉS
INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Coffee Cup & Sleeve Branding',
       'coffee-cup-branding',
       'Branded cups and sleeves for cafés'
FROM business_types WHERE slug = 'cafes';

-- FAST FOOD
INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Burger & Combo Meal Packaging',
       'burger-combo-packaging',
       'High-volume fast food branding kits'
FROM business_types WHERE slug = 'fast-food';

-- HOTELS
INSERT INTO packaging_solutions
  (business_type_id, name, slug, short_description)
SELECT id,
       'Room Service Packaging',
       'room-service-packaging',
       'Premium packaging for hotel room service'
FROM business_types WHERE slug = 'hotels';
