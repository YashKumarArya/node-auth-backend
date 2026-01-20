[ Restaurants ] [ Bakeries ] [ Cafés ] [ Fast Food ] [ North Indian ]
[ Chinese ] [ Hotels ] [ Eco-Friendly ] [ Custom Branding ]

┌───────────────────────────────┐
│ Header / Navigation           │
├───────────────────────────────┤
│ Hero Section (Brand Promise)  │
├───────────────────────────────┤
│ Business Type Selector        │
├───────────────────────────────┤
│ Packaging Solutions Preview   │
├───────────────────────────────┤
│ How It Works (Process)        │
├───────────────────────────────┤
│ Branding Packages (Pricing)   │
├───────────────────────────────┤
│ Clients / Social Proof        │
├───────────────────────────────┤
│ Why Choose Us                 │
├───────────────────────────────┤
│ CTA Banner                    │
├───────────────────────────────┤
│ Footer                        │
└───────────────────────────────┘
┌──────────────────────────────────────────────┐
│                                              │
│  Build Your Food Brand Through Packaging     │
│                                              │
│  Custom-designed, branded food packaging     │
│  for restaurants, bakeries & cafés           │
│                                              │
│  [ Get Branded Packaging ]   [ View Solutions ]│
│                                              │
│  ✔ Design Included   ✔ Printing Included     │
│  ✔ Made for Food Businesses                  │
│                                              │
└──────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│ LOGO                                                             │
│                                                                  │
│ Restaurants  Bakeries  Cafés  Fast Food  North Indian  Chinese   │
│ Hotels  Eco-Friendly  Custom Branding                            │
└──────────────────────────────────────────────────────────────────┘
Hover on “Bakeries”
┌─────────────────────────────────────────────┐
│ Bakery Branding & Packaging                 │
│                                             │
│ • Cake Box Branding                         │
│ • Pastry & Dessert Packaging                │
│ • Cupcake Boxes with Logo                   │
│ • Cookie & Brownie Packaging                │
│ • Festive Bakery Packaging                  │
│                                             │
│ → View All Bakery Solutions                 │
└─────────────────────────────────────────────┘
Hover on “Restaurants”
┌─────────────────────────────────────────────┐
│ Restaurant Branding & Packaging             │
│                                             │
│ • Takeaway Packaging with Branding          │
│ • Biryani Packaging with Branding           │
│ • Thali Packaging Solutions                 │
│ • Family Meal Branding Kits                 │
│ • Combo Meal Packaging                      │
│                                             │
│ → View All Restaurant Solutions             │
└─────────────────────────────────────────────┘
Logic:

onMouseEnter → show panel

onMouseLeave → hide panel
HomepageData {
  navigation: NavigationCategory[]
  homepageSections: HomepageSection[]
  brandingPackages: BrandingPackage[]
  testimonials: Testimonial[]
}
NavigationCategory {
  id: string
  name: string              // Restaurants
  slug: string              // restaurants
  description: string
  solutions: PackagingSolutionPreview[]
}
{
  "id": "restaurant",
  "name": "Restaurants",
  "slug": "restaurants",
  "description": "Branding & packaging solutions for restaurants",
  "solutions": [
    {
      "id": "takeaway",
      "name": "Takeaway Packaging with Branding",
      "slug": "takeaway-packaging",
      "shortDescription": "Branded boxes for daily food delivery"
    },
    {
      "id": "biryani",
      "name": "Biryani Packaging Solutions",
      "slug": "biryani-packaging",
      "shortDescription": "Leak-proof, premium biryani branding"
    }
  ]
}
PackagingSolutionPreview {
  id: string
  name: string
  slug: string
  shortDescription: string
  image?: string
}
HomepageSection {
  id: string
  type: "hero" | "business-selector" | "solutions" | "process" | "branding" | "testimonials" | "cta"
  title?: string
  subtitle?: string
  data?: any
}
{
  "id": "solutions-preview",
  "type": "solutions",
  "title": "Branding & Packaging Solutions",
  "data": {
    "businessType": "restaurant",
    "limit": 4
  }
}
BrandingPackage {
  id: string
  name: string              // Starter / Professional / Premium
  description: string
  highlights: string[]
  recommended?: boolean
}
{
  "id": "professional",
  "name": "Professional Branding",
  "description": "For growing food brands",
  "highlights": [
    "Custom design theme",
    "Up to 3 revisions",
    "QR & social media branding"
  ],
  "recommended": true
}
    Testimonial {
  id: string
  brandName: string
  quote: string
  logo?: string
}
{
  "id": "temptations",
  "brandName": "Temptations",
  "quote": "Our packaging finally looks like a real brand."
}

Restaurant Branding & Packaging Solutions

Bakery Branding & Packaging Solutions

Café & Coffee Shop Branding

Fast Food & QSR Branding Packaging

North Indian Food Branding Packaging

Chinese & Pan-Asian Branding Packaging

Hotel & Hospitality Branding Solutions

Eco-Friendly Branded Packaging

Custom Brand Identity for Food Businesses