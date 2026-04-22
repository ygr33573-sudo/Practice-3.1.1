# Animation Design — Cabinet Dr. Benali

## Direction

**Subtle & Institutional.** Calm, deliberate motion that supports trust. No bouncing, no spring physics, no number counters. Animations guide attention through the page as the user scrolls — they do not perform.

## Animation Tokens

These values are used consistently across every animated element:

- **Entrance:** `opacity: 0 → 1`, `y: 20 → 0`
- **Duration:** `0.6s`
- **Easing:** Framer Motion default ease-out
- **Stagger between items:** `0.08s`
- **Heading-first lead:** heading reveals at `t=0`, subtitle at `t=0.08s`, first card at `t=0.16s`
- **Viewport trigger:** `whileInView` with `viewport={{ once: true }}` on all scroll-triggered animations

## Files Changed

- `src/App.tsx` — all motion changes
- `src/index.css` — one change: remove or repurpose `animate-bounce-subtle` (unused class)

## Section-by-Section Spec

### Hero Badge (bug fix)
The `animate-bounce-subtle` class is applied to the availability card in the hero but the keyframe is never defined in `index.css`. The class does nothing.

**Fix:** Remove the class. Wrap the badge `div` in a `motion.div` with:
```
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.8, duration: 0.5 }}
```
Badge fades in after the main hero content settles, then stays perfectly still.

### Stats Section ("Pourquoi nous choisir ?")
**Current:** Section heading is static. Cards have staggered `whileInView` with `delay: i * 0.1`.

**Change:**
- Wrap the heading `div` (h2 + p) in `motion.div` with `whileInView` entrance at `t=0`.
- Standardise card stagger to `delay: i * 0.08` (from 0.1) for consistency.

### Services Section (`#services`)
**Current:** Cards have `whileHover={{ y: -10 }}` only. No entrance animation.

**Change:**
- Wrap the section header block (label + h2 + description paragraph) in `motion.div` with `whileInView` entrance at `t=0`.
- Each service card `motion.div` gains `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 20 }}` + `viewport={{ once: true }}` + `transition={{ delay: index * 0.08 + 0.16 }}`.
- The two grid rows animate independently (first grid at row-level stagger, second grid continues the stagger).

### Domains Section (`#domaines`)
**Current:** Cards stagger with `whileInView`. Heading block is static.

**Change:**
- Wrap the heading block (h2 + p) in `motion.div` with `whileInView` entrance at `t=0`.
- Keep existing card stagger unchanged (already correct pattern).

### Testimonials Section
**Current:** No animation whatsoever.

**Change (heading-first sequence, all `whileInView`):**
1. Section label ("Paroles de patients") — `opacity: 0→1`, `t=0`
2. Quote block (`blockquote` + `MessageSquare` icon) — `opacity: 0→1, y: 20→0`, `t=0.08s`
3. Patient attribution row — `opacity: 0→1`, `t=0.16s`
4. Stats grid — each of the 4 stat cards staggers at `t = 0.08s * i + 0.16s`

### CTA Section ("Prenez soin de votre santé")
**Current:** No animation.

**Change:**
1. Heading (`h2`) — `opacity: 0→1, y: 20→0`, `t=0`
2. Paragraph — `opacity: 0→1`, `t=0.08s`
3. Button row — `opacity: 0→1`, `t=0.16s`

### Contact Section (`#contact`)
**Current:** No animation.

**Change:**
1. Heading ("Nous trouver") — `opacity: 0→1, y: 20→0`, `t=0`
2. Contact list items (address, hours, phone) — stagger at `t = 0.08s * i + 0.08s`
3. Map block — `opacity: 0→1, scale: 0.98→1`, `t=0.24s`

## What Is Not Changing

- Mobile menu overlay — already animated correctly (`AnimatePresence` + slide)
- Hero main content — already animated correctly (left col + right image)
- Domain cards — already animated correctly, only heading added
- All `whileHover` interactions — kept as-is
- CSS button transitions — kept as-is
- Footer — no animation (appropriate for a footer)

## Out of Scope

- Number counters on stats
- Parallax scrolling
- Testimonial carousel / auto-rotation
- Ken-burns or any infinite image animation
- Page transitions / route-level animation
