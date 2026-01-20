import pool from "../../db/index.js";

export async function fetchHomepageData() {
  // =========================
  // Navigation (hover menu)
  // =========================
  const navigationQuery = `
    SELECT
      bt.id,
      bt.name,
      bt.slug,
      COALESCE(
        json_agg(
          json_build_object(
            'id', ps.id,
            'name', ps.name,
            'slug', ps.slug,
            'description', ps.short_description
          )
        ) FILTER (WHERE ps.id IS NOT NULL),
        '[]'
      ) AS solutions
    FROM business_types bt
    LEFT JOIN packaging_solutions ps
      ON ps.business_type_id = bt.id
      AND ps.is_active = TRUE
    WHERE bt.is_active = TRUE
    GROUP BY bt.id
    ORDER BY bt.display_order;
  `;

  const navigationResult = await pool.query(navigationQuery);

  // =========================
  // Branding Packages
  // =========================
  const brandingPackagesQuery = `
    SELECT
      bp.id,
      bp.name,
      bp.description,
      bp.is_recommended,
      COALESCE(
        json_agg(be.name) FILTER (WHERE be.name IS NOT NULL),
        '[]'
      ) AS elements
    FROM branding_packages bp
    LEFT JOIN branding_package_elements bpe
      ON bp.id = bpe.branding_package_id
    LEFT JOIN branding_elements be
      ON be.id = bpe.branding_element_id
    GROUP BY bp.id
    ORDER BY bp.is_recommended DESC, bp.name;
  `;

  const brandingPackagesResult = await pool.query(brandingPackagesQuery);

  return {
    navigation: navigationResult.rows,
    brandingPackages: brandingPackagesResult.rows.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      isRecommended: pkg.is_recommended,
      elements: pkg.elements,
    })),
  };
}