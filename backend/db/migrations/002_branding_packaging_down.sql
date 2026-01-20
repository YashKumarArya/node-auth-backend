BEGIN;

DROP TRIGGER IF EXISTS trg_client_brands_updated ON client_brands;
DROP TRIGGER IF EXISTS trg_branding_packages_updated ON branding_packages;
DROP TRIGGER IF EXISTS trg_packaging_solutions_updated ON packaging_solutions;
DROP TRIGGER IF EXISTS trg_business_types_updated ON business_types;

DROP FUNCTION IF EXISTS update_updated_at;

DROP TABLE IF EXISTS order_status_logs;
DROP TABLE IF EXISTS design_assets;
DROP TABLE IF EXISTS orders;

DROP TYPE IF EXISTS order_status;

DROP TABLE IF EXISTS client_brands;
DROP TABLE IF EXISTS branding_package_elements;
DROP TABLE IF EXISTS branding_elements;
DROP TABLE IF EXISTS branding_packages;
DROP TABLE IF EXISTS packaging_components;
DROP TABLE IF EXISTS packaging_solutions;
DROP TABLE IF EXISTS business_types;

COMMIT;
