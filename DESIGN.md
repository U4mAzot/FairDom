# Design System Strategy: The Architectural Editorial

## 1. Overview & Creative North Star
**The Creative North Star: "The Transparent Architect"**
This design system moves away from the cluttered, "listing-heavy" aesthetic of traditional real estate platforms. Instead, it adopts an editorial approach that treats property search like a high-end architectural magazine. We balance the authority of Deep Navy with the optimistic energy of Vibrant Green through a layout strategy defined by **intentional asymmetry, expansive breathing room, and tonal depth.**

By moving away from rigid grids and 1px borders, we create a "seamless" interface. The UI should feel like it was carved from a single block of marble—solid, trustworthy, and premium—yet light enough to navigate effortlessly.

---

## 2. Color & Surface Philosophy
The palette is rooted in `primary` (#041627) to establish an immediate sense of institutional trust, while `tertiary_fixed` (#6BFE9C) provides a high-energy "save/growth" signal.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning. 
Boundaries must be defined solely through background color shifts. To separate a "Featured Properties" section from the hero, transition from `surface` (#F7F9FB) to `surface-container-low` (#F2F4F6). This creates a sophisticated "zoning" effect rather than a boxed-in feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
*   **Base Level:** `surface` (#F7F9FB) for the main canvas.
*   **Zone Level:** `surface-container-low` (#F2F4F6) for large content areas.
*   **Card/Component Level:** `surface-container-lowest` (#FFFFFF) to make elements "pop" against the lower backgrounds.

### The "Glass & Gradient" Rule
To elevate the "Modern" requirement, floating navigation bars and property filters must utilize **Glassmorphism**. Use `surface` with 80% opacity and a `backdrop-blur-md` effect. 
*   **Signature Texture:** Main CTAs should not be flat. Apply a subtle linear gradient from `primary` (#041627) to `primary_container` (#1A2B3C) at a 135-degree angle to give buttons a "milled" premium finish.

---

## 3. Typography: The Editorial Voice
We utilize a dual-typeface system to balance character with utility.

*   **The Hero (Manrope):** Used for `display` and `headline` roles. Manrope’s geometric yet open nature feels modern and "architectural." Large-scale headlines should use tight letter-spacing (-0.02em) to command attention.
*   **The Workhorse (Inter):** Used for `title`, `body`, and `label` roles. Inter is chosen for its unparalleled legibility in dense data environments (price lists, square footage, property specs).

**Hierarchy Intent:**
*   `display-lg` (3.5rem): Reserved for hero value propositions.
*   `headline-sm` (1.5rem): Used for property titles in cards.
*   `label-md` (0.75rem): Used for metadata (e.g., "New Construction") in `secondary_fixed` (#DDE3ED) containers.

---

## 4. Elevation & Depth
In this design system, shadows are a last resort. We rely on **Tonal Layering**.

### The Layering Principle
Achieve lift by stacking colors. A property card (`surface-container-lowest`) placed on a search results page (`surface-container-low`) creates a natural, soft "lift" that feels integrated into the environment.

### Ambient Shadows
Where floating elements (like a "Contact Agent" fab) require separation:
*   **Blur:** 24px - 40px
*   **Opacity:** 4% - 6% 
*   **Color:** Use a tinted shadow based on `on_surface` (#191C1E) rather than pure black.

### The "Ghost Border" Fallback
If accessibility requires a border (e.g., in high-contrast modes), use a **Ghost Border**: `outline_variant` (#C4C6CD) at 15% opacity. This provides a "suggestion" of a boundary without interrupting the visual flow.

---

## 5. Components & Tailwind Implementation

### Property Cards (The "No-Divider" Rule)
Forbid the use of divider lines within cards. Separate the price, address, and specs using vertical white space (`spacing-4` or `spacing-6`).
*   **Container:** `bg-surface-container-lowest rounded-xl p-6`
*   **Hover:** `transition-transform duration-300 hover:-translate-y-1`

### CTA Buttons (The "Growth" Action)
*   **Primary:** `bg-gradient-to-br from-primary to-primary_container text-on_primary px-8 py-3 rounded-md shadow-sm`
*   **Success (Savings/Growth):** Use `tertiary_fixed_dim` (#4AE183) for "Calculate Savings" or "Price Drop" alerts to signal financial positivity.

### Interactive Maps
*   **Styling:** Use a custom Mapbox/Google style that strips out heavy colors, using a grayscale base that allows our `primary` and `tertiary` pins to stand out.
*   **Overlay:** Map controls should use the Glassmorphism rule (`bg-white/80 backdrop-blur-md`).

### Professional Forms
*   **Inputs:** `bg-surface-container-low border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-tertiary_fixed`
*   **Labeling:** Labels should use `label-md` in `on_surface_variant`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts. For example, a 60/40 split for hero sections where the image overlaps the background container.
*   **Do** use `tertiary` (#001A08) for ultra-high contrast text on top of the vibrant green accents to ensure AAA accessibility.
*   **Do** embrace "White Space as a Feature." Use `spacing-16` (4rem) between major sections to let the design breathe.

### Don’t:
*   **Don’t** use "Card-in-Card" layouts with borders. Use shifts in surface color (`surface-container-high` inside `surface-container-low`).
*   **Don’t** use standard 90-degree corners. Stick to the `xl` (0.75rem) or `lg` (0.5rem) roundedness for a friendlier, modern feel.
*   **Don’t** use pure black (#000000) for text. Always use `on_surface` (#191C1E) to maintain the "Deep Navy" sophisticated tone.

---

## 7. Responsive Tailwind Configuration Hint