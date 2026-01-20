BEGIN;

-- ==============================
-- BUSINESS TYPES
-- ==============================
CREATE TABLE business_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================
-- PACKAGING SOLUTIONS
-- ==============================
CREATE TABLE packaging_solutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_type_id UUID NOT NULL REFERENCES business_types(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  short_description TEXT,
  long_description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_packaging_solutions_business
ON packaging_solutions(business_type_id);

-- ==============================
-- PACKAGING COMPONENTS (INTERNAL)
-- ==============================
CREATE TABLE packaging_components (
  id SERIAL PRIMARY KEY,
  packaging_solution_id UUID NOT NULL REFERENCES packaging_solutions(id) ON DELETE CASCADE,
  component_type VARCHAR(50) NOT NULL,
  material VARCHAR(50),
  size VARCHAR(50),
  notes TEXT
);

-- ==============================
-- BRANDING PACKAGES
-- ==============================
CREATE TABLE branding_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  design_included BOOLEAN DEFAULT TRUE,
  revisions_allowed INT DEFAULT 0,
  turnaround_days INT,
  is_recommended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================
-- BRANDING ELEMENTS
-- ==============================
CREATE TABLE branding_elements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- ==============================
-- BRANDING PACKAGE ↔ ELEMENTS
-- ==============================
CREATE TABLE branding_package_elements (
  id SERIAL PRIMARY KEY,
  branding_package_id UUID NOT NULL REFERENCES branding_packages(id) ON DELETE CASCADE,
  branding_element_id INT NOT NULL REFERENCES branding_elements(id) ON DELETE CASCADE,
  UNIQUE (branding_package_id, branding_element_id)
);

-- ==============================
-- CLIENT BRANDS
-- ==============================
CREATE TABLE client_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name VARCHAR(150) NOT NULL,
  business_type_id UUID REFERENCES business_types(id),
  logo_url TEXT,
  brand_colors JSONB,
  font_preferences TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================
-- ORDER STATUS ENUM
-- ==============================
CREATE TYPE order_status AS ENUM (
  'pending',
  'designing',
  'awaiting_approval',
  'printing',
  'dispatched',
  'completed',
  'cancelled'
);

-- ==============================
-- ORDERS
-- ==============================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_brand_id UUID NOT NULL REFERENCES client_brands(id),
  packaging_solution_id UUID NOT NULL REFERENCES packaging_solutions(id),
  branding_package_id UUID NOT NULL REFERENCES branding_packages(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  status order_status DEFAULT 'pending',
  total_price NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_client
ON orders(client_brand_id);

CREATE INDEX idx_orders_status
ON orders(status);

-- ==============================
-- DESIGN ASSETS (OPTIONAL BUT READY)
-- ==============================
CREATE TABLE design_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================
-- ORDER STATUS LOGS
-- ==============================
CREATE TABLE order_status_logs (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status order_status,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================
-- UPDATED_AT TRIGGER
-- ==============================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_business_types_updated
BEFORE UPDATE ON business_types
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_packaging_solutions_updated
BEFORE UPDATE ON packaging_solutions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_branding_packages_updated
BEFORE UPDATE ON branding_packages
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_client_brands_updated
BEFORE UPDATE ON client_brands
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMIT;
