## Road Trip Birthday Game – Style Guide

### Overall Vibe
- **Theme**: Cozy, romantic road trip at golden hour, lighthearted and playful.
- **Tone**: Cute, encouraging, zero stress. Every screen should feel like a tiny love note.
- **Target Device**: Mobile-first (portrait), thumb-friendly controls, large tap targets, minimal text per screen.

---

### Color Palette
- **Primary Color – Sunset Rose**
  - Hex: `#FF6B81`
  - Usage: Main buttons (`Spotted`, `Try again`, `Next level`), primary highlights, progress bar fill.
  - Feel: Warm, romantic, energetic.

- **Secondary Color – Neutral White (70%)**
  - Hex: `rgba(255, 255, 255, 0.7)` (or `#FFFFFFB3`)
  - Usage: Accents, icons, stars, progress indicators (no glows).
  - Feel: Calm, clean, understated.

- **Background – Night Road Gradient**
  - Start: `#0B1020` (top)
  - End: `#1C2438` (bottom)
  - Usage: App background as a vertical gradient suggesting a night sky / late evening drive.

- **Surface Cards – Soft Midnight**
  - Hex: `#242B3D`
  - Usage: Panels behind text, cards for level description, modals (`Try again`, `Skip level`).
  - Corners: 18–24px rounded for a soft, friendly feel.

- **Success / Celebration – Mint Sparkle**
  - Hex: `#8CE5C4`
  - Usage: Success states and confetti accents for celebration moments (no borders/glows on message cards).

- **Error / Warning – Gentle Coral**
  - Hex: `#FF9B8C`
  - Usage: Non-harsh indicators for collisions/failed attempt (car crash outline, subtle shake).
  - Note: Avoid pure red to keep the mood soft and non-stressful.

- **Text Colors**
  - Primary Text: `#FFFFFF` (high contrast on dark surfaces).
  - Secondary Text: `#C7D0E8` for less important copy / helper text.
  - Muted / Hint Text: `#7C88A8` for small labels or non-critical info.

---

### Typography
- **Primary Heading Font**
  - Style: Rounded, playful sans serif.
  - Web-safe fallback stack (example):  
    `"Baloo 2", "Fredoka", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Usage: Game title, level titles, large numbers (countdowns), big birthday messages.

- **Body Font**
  - Style: Clean, highly readable mobile sans serif.
  - Fallback stack (example):  
    `"Nunito", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Usage: Instructions like “Spot a red car”, small labels, button text.

- **Font Sizes (mobile baseline)**
  - Title / Main Heading: 28–32px.
  - Level Title / Dialog Title: 22–24px.
  - Body Text / Instructions: 15–17px.
  - Small Labels / Hints: 12–13px.

- **Text Treatment**
  - Use light shadows on headings over dark backgrounds to ensure readability.
  - Maximum of 2–3 lines of text per screen; prefer short, sweet sentences.
  - Birthday messages can use slightly more whimsical letter spacing and subtle animation (fade-in, gentle scale).

---

### Layout & Look/Feel
- **Orientation**
  - Designed for **portrait** mobile.
  - Critical touch areas within thumb-friendly zone (lower 2/3 of screen).

- **Top Section**
  - **App Bar (minimal)**
    - Elements: Small back/home icon (if needed), subtle progress indicator (e.g. “Level 3 / 10”).
    - Background: Transparent or slightly darker overlay on the gradient.
    - Avoid clutter; keep top clean to focus on the current task.

- **Middle Section**
  - **Instruction Card**
    - Contains the challenge: e.g. “Spot a red car” / “Spot a yellow number plate”.
    - Appears on a rounded card (`Soft Midnight`) with a slight drop shadow and maybe a tiny car/emoji icon.
    - Positioned around center, but leaving enough vertical space below for the `Spotted` button.

- **Bottom Section**
  - **Primary Action Area**
    - Large `Spotted` button, centered horizontally, slightly above the bottom edge for easy thumb reach.
    - Bottom-most area reserved for secondary controls like `Skip level` (small, text-only link or ghost button).

- **Spacing & Corners**
  - Use generous padding: 16–24px margins from screen edges.
  - Buttons and cards with strongly rounded corners (18–24px) to make everything feel soft and cozy.

---

### Buttons & Interactions
- **Primary Button – `Spotted` / `Next level`**
  - Background: `#FF6B81` (Primary).
  - Text: `#FFFFFF`, semi-bold.
  - Shape: Full-width or 80% width, max 320px, pill-shaped.
  - Effects:
    - Hover (desktop): Slightly lighter tint (no glow).
    - Press: Subtle scale down (0.96) and darken by ~10%.

- **Secondary Button – `Skip to next level` / `Try again`**
  - Style A (Secondary Filled): Background `Soft Midnight`, border `#FFC857`, text `#FFC857`.
  - Style B (Ghost / Text): Text-only `#C7D0E8` with underline on press, used when de-emphasizing option.

- **Microinteractions**
  - Car crash: Brief shake animation of the game card or car, then settle; gentle, not harsh.
  - Success: Small confetti burst or sparkling stars around the success message and button.
  - Birthday messages: Fade-in with slight upward motion and a soft scale-up (1.0 → 1.05 → 1.0).

---

### Game Screens – Visual Direction

- **Level Intro / “Spot It” Screen**
  - Background: Night Road Gradient.
  - Center card with task text and a tiny icon (e.g. simple car or plate illustration).
  - Below card: Big `Spotted` button.
  - Optional ambient detail: Faint, stylized road and stars in the background illustration.

- **Mini-Game (e.g. driving the red car)**
  - View: Simple top-down or slightly isometric road.
  - Colors:
    - Player car: Use `Sunset Rose` with a small heart detail (e.g. a tiny heart decal on the roof).
    - Other cars: Muted blues/greys (`#3C4B67`, `#55627D`) so the player car stands out.
    - Road: Dark asphalt (`#1D222E`) with faint lane lines in `#3C4B67`.
  - UI Overlay:
    - Timer at top center or top right on a semi-transparent pill with white text.
    - Minimal HUD; keep the game view mostly clear.

- **Failure State (Crash)**
  - Visual: Quick flash of `Gentle Coral` outline around the player car, subtle shake.
  - Modal Card:
    - Background: `Soft Midnight`, centered, with a small icon (e.g. a slightly squished car + heart still intact).
    - Text: Friendly, encouraging copy. Example: “We bumped into someone! Want to try again or cruise to the next level?”
    - Buttons: `Try again` (primary) and `Skip level` (secondary/text).

- **Success State (Task Completed)**
  - Motion: Quick confetti / sparkles in `Golden Hour` and `Mint Sparkle`.
  - Message Card:
    - Background: Same `Soft Midnight` (flat: no borders, no glows).
    - Copy: Cute birthday-leaning lines (examples in the copy section).
    - Button: `Next level` using primary button style.

---

### Birthday Messages – Tone & Examples
- **Tone**
  - Short, heartfelt, a little playful.
  - Avoid overly cheesy unless that’s your shared sense of humor; default to sweet and light.

- **Sample Messages (on completing a level)**
  - “Another level cleared, another mile with you. Happy birthday, love.”
  - “You spot the best things on the road… including me. 💕”
  - “No matter where we drive, you’re my favorite view. Happy birthday.”
  - “Level up: your birthday adventure continues.”
  - “You make every journey feel like a celebration.”

*(We’ll keep the heart/emoji usage minimal in the UI; can be toned down if you prefer zero emojis.)*

---

### Accessibility & Mobile Considerations
- **Contrast**
  - Aim for sufficient contrast between text and background (light text on dark surfaces).
  - Avoid pure white on pure black for extended reading; use slightly softer tones when possible.

- **Touch Targets**
  - Minimum touch area: 44x44px equivalent.
  - Space between primary and secondary buttons so accidental taps are unlikely in a moving car.

- **Motion**
  - Animations should be short (150–300ms) and gentle; avoid rapid flashes or intense shakes.
  - Provide an option in settings to reduce motion if you choose to add more effects later.

---

### Iconography & Illustrations
- **Style**
  - Simple, flat or subtly shaded vector-style.
  - Rounded corners, no sharp aggressive shapes.
  - Color usage aligned with the palette; avoid adding many new accent colors.

- **Key Icons**
  - Car: Rounded, cute “chibi” style.
  - Road signs / plates: Minimalistic shapes with big, readable symbols.
  - Hearts, stars, confetti: Tiny accents for celebration screens only.

---

### Brand Elements to Reuse
- **Game Name (placeholder)**
  - Use a playful heading style for the main title (e.g. “Roadtrip Birthday Quest” or whatever you decide).
  - Always center title on initial screen, with a simple underline or subtle contrast (no glow/shadow).

- **Consistency Rules**
  - Primary actions (continue, spotted, next) always use the same color and shape.
  - Failure and success screens share layout (title, message, buttons) but differ in color accents and icons.
  - Birthday messages always appear in the same card style to feel like a series of love notes.

