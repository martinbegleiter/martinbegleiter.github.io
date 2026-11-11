# Design System Specification: The Sentinel Terminal Aesthetic

## 1. Overview & Creative North Star: "The Digital Sentinel"
This design system is built to evoke the high-stakes, high-precision environment of a secure command terminal. Our Creative North Star is **The Digital Sentinel**: an experience that feels authoritative, clandestine, and hyper-functional. 

To move beyond "standard" dashboard tropes, we reject the rigid, even-spaced grid in favor of **Intentional Asymmetry** and **Editorial Information Density**. We use a mix of "Bento Box" layouts and terminal-style overflows to create a sense of deep technical sophistication. The goal is a UI that feels like a custom-tooled instrument, not a generic software template.

---

## 2. Colors & Tonal Depth
The palette is rooted in a deep, nocturnal navy, punctuated by high-energy lemon accents that mimic the "glow" of a high-fidelity display.

### Core Palette
- **Background (`#0a0e14` / `surface_container_lowest`):** The foundation. A deep, obsidian-navy that provides the necessary contrast for luminosity effects.
- **Primary Accent (`#fde047` / `primary_container`):** A sharp, "Lemon Glow." Used for critical data points, active states, and focus elements.
- **Surface Tiers:**
    - `surface`: `#10141a` (Standard sections)
    - `surface_container`: `#1c2026` (Card backgrounds)
    - `surface_container_high`: `#262a31` (Elevated interaction states)

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for structural sectioning. Boundaries must be defined through **Tonal Stepping**. For instance, a `surface_container` module sits directly on the `surface` background. The change in value is the boundary. This creates a seamless, integrated look rather than a boxed-in "webby" feel.

### Signature Textures & Glassmorphism
To achieve the "Sentinel" look, apply a subtle linear gradient to main CTAs (from `primary_fixed_dim` to `primary_container`). For floating overlays or modal windows, use **Glassmorphism**:
- **Background:** `surface_container` at 70% opacity.
- **Backdrop Blur:** `12px` to `20px`.
- **Effect:** This allows the underlying terminal "code" or grid patterns to bleed through, maintaining the illusion of a layered HUD.

---

## 3. Typography: Editorial Tech
We utilize **Space Grotesk** across all scales to maintain a cohesive, monospaced-adjacent personality that feels both human and robotic.

- **Display (3.5rem / 2.75rem):** Reserved for hero names or system status. Use `letter-spacing: -0.02em` to add a premium editorial feel.
- **Headline (2rem - 1.5rem):** Used for primary section titles. In this system, headlines should often be paired with a "Label" prefix (e.g., `[ 01 // SYSTEM_CORE ]`) to reinforce the terminal aesthetic.
- **Body (1rem - 0.75rem):** High-readability blocks. Use `on_surface_variant` (`#cec6ad`) for secondary text to reduce visual noise.
- **Labels (0.75rem - 0.6875rem):** The workhorse of the system. Used for metadata, terminal tags, and status indicators. Often rendered in all-caps with increased letter-spacing.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, "Up" is defined by "Bright." We do not use traditional drop shadows.

- **The Layering Principle:** Place a `surface_container_low` card on a `surface` background to create a "recessed" feel, or a `surface_container_highest` element on `surface` to create a "raised" feel.
- **Ambient Glow:** Instead of a black shadow, use a **Color Glow** for high-priority active elements. Apply a `0px 0px 15px` blur using the `primary_container` color at 20% opacity. This mimics light emission from a screen.
- **The Ghost Border:** If a border is required for accessibility in input fields, use the `outline_variant` token at **15% opacity**. It should be a suggestion of a line, not a hard barrier.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary_container` with `on_primary` text. No border. Sharp corners (`DEFAULT: 0.25rem`).
- **Secondary:** Transparent background with a `Ghost Border` and `primary_fixed_dim` text. 
- **Tertiary (Ghost):** Text only with a `>` prefix character that animates (slides 2px right) on hover.

### Cards & Modules (Bento Styles)
- **Rules:** No dividers. Use `body-sm` metadata and wide gutters (24px - 32px) to separate content.
- **Interaction:** On hover, a card should shift from `surface_container` to `surface_container_high` and gain a subtle glow.

### Input Fields
- **Styling:** Underline-only or subtle `surface_container` fill. 
- **Active State:** The cursor should be a solid block (Primary Yellow) to mimic a terminal CLI.

### Chips & Tags
- **Style:** Small, all-caps `label-sm` text.
- **Structure:** Surrounded by square brackets (e.g., `[ STATUS: ACTIVE ]`) rather than a pill-shaped container to maintain the "Sentinel" aesthetic.

---

## 6. Do’s and Don’ts

### Do:
- **Use "System Speak":** Add decorative terminal prefixes like `//`, `>_`, or `[root]` to labels.
- **Embrace Asymmetry:** Allow one column to be significantly wider than others to create an editorial rhythm.
- **Layer Surfaces:** Use at least three tiers of `surface-container` depth in a single view to provide richness.

### Don't:
- **No Rounded Corners:** Avoid the "full" or "xl" roundedness tokens unless it's for a specific status light. Stick to "sm" (`0.125rem`) or "none" to keep the aesthetic sharp and technical.
- **No Pure White:** Never use `#ffffff`. Use `primary` (`#fffcff`) or `on_surface` (`#dfe2eb`) to keep the "glow" feeling intentional and not blinding.
- **No Standard Dividers:** Never use a solid 100% opacity line to separate list items. Use vertical rhythm and whitespace.