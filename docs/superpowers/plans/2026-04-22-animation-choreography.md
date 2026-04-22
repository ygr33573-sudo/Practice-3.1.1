# Animation Choreography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add consistent scroll-triggered entrance animations to all sections currently lacking them, fix the broken hero badge animation, and standardise stagger timing across the entire landing page.

**Architecture:** All changes are inline Framer Motion props in `src/App.tsx`. No new components, no abstractions. One CSS class removed from `src/index.css`. Each section gets a heading-first reveal pattern: heading fades in at t=0, cards stagger in at 0.08s intervals starting at t=0.16s.

**Tech Stack:** React 18, Framer Motion (`motion/react`), Tailwind CSS v4, Vite

> **Note on testing:** This project has no test framework configured. Verification for each task is visual — run `npm run dev` and scroll through the page in a browser.

---

## Animation Tokens (reference for all tasks)

```
entrance:  initial={{ opacity: 0, y: 20 }}  →  whileInView={{ opacity: 1, y: 0 }}
duration:  0.6s
stagger:   0.08s between items
heading:   delay 0s
subtitle:  delay 0.08s
card[i]:   delay = i * 0.08 + 0.16
viewport:  { once: true }  (on every whileInView)
```

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/App.tsx` | Modify | 7 animation additions |
| `src/index.css` | Modify | Remove unused `animate-bounce-subtle` class reference note |

---

### Task 1: Fix hero badge (broken animation)

**Files:**
- Modify: `src/App.tsx:227`

The availability badge has `animate-bounce-subtle` applied but the keyframe is never defined — it does nothing. Replace with a Framer Motion fade-in that fires once on load, then stays static.

- [ ] **Step 1: Open `src/App.tsx` and locate the badge div (around line 227)**

Find this:
```tsx
<div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 animate-bounce-subtle">
```

- [ ] **Step 2: Replace the div with a motion.div**

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4"
>
```

Note: uses `animate` (not `whileInView`) because this is part of the hero which loads immediately, not scroll-triggered.

- [ ] **Step 3: Verify visually**

Run `npm run dev`, open the browser. On page load, the badge should fade in ~0.8s after the hero content settles, then stay still. No bouncing, no infinite movement.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: replace undefined animate-bounce-subtle with framer motion fade-in on hero badge"
```

---

### Task 2: Animate stats section heading

**Files:**
- Modify: `src/App.tsx:244-265`

The "Pourquoi nous choisir ?" heading is static while its cards already stagger in. Add a whileInView entrance to the heading and tighten card stagger from 0.1s to 0.08s for consistency.

- [ ] **Step 1: Wrap the heading block in a motion.div**

Find (around line 244):
```tsx
<div className="text-center mb-16">
  <h2 className="text-3xl font-display font-medium mb-4">Pourquoi nous choisir ?</h2>
  <p className="text-medical-muted max-w-2xl mx-auto">Une approche moderne de la médecine centrée sur le confort et la précision du diagnostic.</p>
</div>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-16"
>
  <h2 className="text-3xl font-display font-medium mb-4">Pourquoi nous choisir ?</h2>
  <p className="text-medical-muted max-w-2xl mx-auto">Une approche moderne de la médecine centrée sur le confort et la précision du diagnostic.</p>
</motion.div>
```

- [ ] **Step 2: Update stat card stagger timing**

Find (around line 252):
```tsx
transition={{ delay: i * 0.1 }}
```

Replace with:
```tsx
transition={{ delay: i * 0.08 + 0.16, duration: 0.6 }}
```

- [ ] **Step 3: Verify visually**

Scroll to the stats section. Heading should fade in first, then the four cards should stagger in after.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: animate stats section heading and standardise card stagger timing"
```

---

### Task 3: Animate services section

**Files:**
- Modify: `src/App.tsx:268-386`

The Services section has `whileHover` on cards but no scroll-triggered entrance. Add heading-first choreography then staggered card entrances for both grid rows.

- [ ] **Step 1: Wrap the section header block in a motion.div**

Find (around line 269):
```tsx
<div className="flex items-end justify-between mb-16 gap-4 flex-wrap">
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="flex items-end justify-between mb-16 gap-4 flex-wrap"
>
```

Close tag stays the same (`</div>` → `</motion.div>`).

- [ ] **Step 2: Add entrance to the Consultation card (first card, row 1)**

Find (around line 284):
```tsx
<motion.div 
  whileHover={{ y: -10 }}
  className="md:col-span-2 medical-card p-0 flex flex-col md:flex-row overflow-hidden border-none shadow-sm bg-slate-50"
>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -10 }}
  transition={{ delay: 0.16, duration: 0.6 }}
  className="md:col-span-2 medical-card p-0 flex flex-col md:flex-row overflow-hidden border-none shadow-sm bg-slate-50"
>
```

- [ ] **Step 3: Add entrance to the Soins Spécialisés card (second card, row 1)**

Find (around line 315):
```tsx
<motion.div 
  whileHover={{ y: -10 }}
  className="medical-card border-none bg-blue-50/50"
>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -10 }}
  transition={{ delay: 0.24, duration: 0.6 }}
  className="medical-card border-none bg-blue-50/50"
>
```

- [ ] **Step 4: Add entrance to the Diagnostics card (first card, row 2)**

Find (around line 338):
```tsx
<motion.div 
  whileHover={{ y: -10 }}
  className="medical-card p-0 flex flex-col border-none shadow-sm bg-white"
>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -10 }}
  transition={{ delay: 0.16, duration: 0.6 }}
  className="medical-card p-0 flex flex-col border-none shadow-sm bg-white"
>
```

- [ ] **Step 5: Add entrance to the Téléconsultation card (second card, row 2)**

Find (around line 354):
```tsx
<motion.div 
  whileHover={{ y: -10 }}
  className="medical-card border-none bg-medical-primary text-white flex flex-col justify-center items-start overflow-hidden relative"
>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -10 }}
  transition={{ delay: 0.24, duration: 0.6 }}
  className="medical-card border-none bg-medical-primary text-white flex flex-col justify-center items-start overflow-hidden relative"
>
```

- [ ] **Step 6: Add entrance to the Prévention card (third card, row 2)**

Find (around line 372):
```tsx
<motion.div 
  whileHover={{ y: -10 }}
  className="medical-card border-none bg-slate-50/50"
>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -10 }}
  transition={{ delay: 0.32, duration: 0.6 }}
  className="medical-card border-none bg-slate-50/50"
>
```

- [ ] **Step 7: Verify visually**

Scroll to the Services section. Header text should appear first. Row 1: Consultation then Soins Spécialisés fade in. Row 2: Diagnostics, Téléconsultation, Prévention stagger in. All cards still lift on hover.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add scroll-triggered entrance animations to all services section cards"
```

---

### Task 4: Animate domains section heading

**Files:**
- Modify: `src/App.tsx:392-401`

Domain cards already stagger in with whileInView. The heading block above them is static. Add a matching entrance.

- [ ] **Step 1: Wrap the heading block in a motion.div**

Find (around line 392):
```tsx
<div className="flex justify-between items-end mb-16">
  <div>
    <h2 className="text-3xl font-display font-medium mb-4">Domaines d'Intervention</h2>
    <p className="text-medical-muted max-w-lg">Des solutions médicales complètes pour toute la famille, de la prévention au suivi thérapeutique spécialisé.</p>
  </div>
  <button className="hidden md:flex items-center gap-2 text-medical-primary font-bold text-xs uppercase tracking-widest transition-opacity hover:opacity-70 group">
    <span>Voir tous les services</span>
    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
  </button>
</div>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="flex justify-between items-end mb-16"
>
  <div>
    <h2 className="text-3xl font-display font-medium mb-4">Domaines d'Intervention</h2>
    <p className="text-medical-muted max-w-lg">Des solutions médicales complètes pour toute la famille, de la prévention au suivi thérapeutique spécialisé.</p>
  </div>
  <button className="hidden md:flex items-center gap-2 text-medical-primary font-bold text-xs uppercase tracking-widest transition-opacity hover:opacity-70 group">
    <span>Voir tous les services</span>
    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
  </button>
</motion.div>
```

Also update the existing domain card stagger to add `duration: 0.6` for consistency:

Find (around line 408):
```tsx
transition={{ delay: i * 0.1 }}
```

Replace with:
```tsx
transition={{ delay: i * 0.08 + 0.16, duration: 0.6 }}
```

- [ ] **Step 2: Verify visually**

Scroll to Domaines. Heading + button should appear first, then the four domain cards stagger in.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: animate domains section heading and standardise domain card timing"
```

---

### Task 5: Animate testimonials section

**Files:**
- Modify: `src/App.tsx:437-474`

This dark full-bleed section has zero animation. Add heading-first choreography: label → quote block → patient info → stats grid.

- [ ] **Step 1: Animate the section label**

Find (around line 440):
```tsx
<div className="italic uppercase text-xs font-bold tracking-[0.2em] mb-12 opacity-60 text-center">Paroles de patients</div>
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 0.6 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="italic uppercase text-xs font-bold tracking-[0.2em] mb-12 text-center"
>Paroles de patients</motion.div>
```

Note: target opacity is `0.6` (matches the original `opacity-60` class which we remove since motion controls opacity now).

- [ ] **Step 2: Animate the left column (quote + patient)**

Find (around line 443):
```tsx
<div>
  <MessageSquare size={48} className="text-medical-primary mb-8" />
  <blockquote className="text-3xl font-display font-medium leading-normal mb-8">
```

Replace the opening `<div>` with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.08, duration: 0.6 }}
>
  <MessageSquare size={48} className="text-medical-primary mb-8" />
  <blockquote className="text-3xl font-display font-medium leading-normal mb-8">
```

Close tag: `</div>` → `</motion.div>` (the div that wraps the blockquote and patient info).

- [ ] **Step 3: Animate each stat card in the right column**

Find the stats map (around line 460):
```tsx
{[
  { label: "Années d'expérience", value: "15+" },
  { label: "Consultations", value: "12k+" },
  { label: "Taux de satisfaction", value: "98%" },
  { label: "Spécialités", value: "4" }
].map(stat => (
  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
```

Replace with:
```tsx
{[
  { label: "Années d'expérience", value: "15+" },
  { label: "Consultations", value: "12k+" },
  { label: "Taux de satisfaction", value: "98%" },
  { label: "Spécialités", value: "4" }
].map((stat, i) => (
  <motion.div
    key={stat.label}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08 + 0.16, duration: 0.6 }}
    className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
  >
```

Close tag: `</div>` → `</motion.div>` for each stat card.

- [ ] **Step 4: Verify visually**

Scroll to the dark Testimonials section. Label fades first, then the quote slides up from below, then the stat cards stagger in on the right.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add entrance animations to testimonials section"
```

---

### Task 6: Animate CTA section

**Files:**
- Modify: `src/App.tsx:477-497`

The blue CTA block has no animation. Stagger: heading → paragraph → buttons.

- [ ] **Step 1: Animate the heading**

Find (around line 481):
```tsx
<h2 className="text-4xl lg:text-5xl font-display font-medium mb-8">Prenez soin de votre santé dès aujourd'hui</h2>
```

Replace with:
```tsx
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-4xl lg:text-5xl font-display font-medium mb-8"
>Prenez soin de votre santé dès aujourd'hui</motion.h2>
```

- [ ] **Step 2: Animate the paragraph**

Find (around line 482):
```tsx
<p className="text-lg text-blue-100 mb-12 italic">
  Réservez votre créneau en ligne en moins de 2 minutes. Notre équipe vous recontactera pour confirmer le rendez-vous.
</p>
```

Replace with:
```tsx
<motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.08, duration: 0.6 }}
  className="text-lg text-blue-100 mb-12 italic"
>
  Réservez votre créneau en ligne en moins de 2 minutes. Notre équipe vous recontactera pour confirmer le rendez-vous.
</motion.p>
```

- [ ] **Step 3: Animate the button row**

Find (around line 485):
```tsx
<div className="flex flex-wrap justify-center gap-6">
```

Replace with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.16, duration: 0.6 }}
  className="flex flex-wrap justify-center gap-6"
>
```

Close tag: `</div>` → `</motion.div>`.

- [ ] **Step 4: Verify visually**

Scroll to the blue CTA block. Heading appears first, then the paragraph, then the two buttons rise into view together.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add entrance animations to CTA section"
```

---

### Task 7: Animate contact section

**Files:**
- Modify: `src/App.tsx:500-558`

The Contact section has no animation. Stagger: heading → contact items → map block.

- [ ] **Step 1: Animate the section heading**

Find (around line 505):
```tsx
<h2 className="text-4xl font-display font-medium mb-8 italic">Nous trouver</h2>
```

Replace with:
```tsx
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-4xl font-display font-medium mb-8 italic"
>Nous trouver</motion.h2>
```

- [ ] **Step 2: Animate each contact list item**

Find (around line 507):
```tsx
<ul className="space-y-8">
  <li className="flex gap-6">
    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
      <MapPin size={20} />
    </div>
```

Replace the three `<li>` elements — wrap each in a `motion.li`:

```tsx
<ul className="space-y-8">
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.08, duration: 0.6 }}
    className="flex gap-6"
  >
    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
      <MapPin size={20} />
    </div>
    <div>
      <p className="font-semibold text-lg mb-1">Adresse</p>
      <p className="text-medical-muted">45 Boulevard Mohamed V, Bureau 12<br />Casablanca, 20000</p>
    </div>
  </motion.li>

  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.16, duration: 0.6 }}
    className="flex gap-6"
  >
    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
      <Clock size={20} />
    </div>
    <div>
      <p className="font-semibold text-lg mb-1">Horaires d'ouverture</p>
      <p className="text-medical-muted">Lundi - Vendredi: 09:00 - 18:00<br />Samedi: 09:00 - 13:00</p>
    </div>
  </motion.li>

  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.24, duration: 0.6 }}
    className="flex gap-6"
  >
    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
      <Phone size={20} />
    </div>
    <div>
      <p className="font-semibold text-lg mb-1">Téléphone</p>
      <p className="text-medical-muted">05 22 00 00 00</p>
    </div>
  </motion.li>
</ul>
```

- [ ] **Step 3: Animate the map block**

Find (around line 539):
```tsx
<div className="relative">
  <div className="aspect-square bg-slate-100 rounded-[40px] overflow-hidden group">
```

Replace the outer `<div className="relative">` with:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.24, duration: 0.6 }}
  className="relative"
>
  <div className="aspect-square bg-slate-100 rounded-[40px] overflow-hidden group">
```

Close tag: `</div>` → `</motion.div>` for the outer relative div.

- [ ] **Step 4: Verify visually**

Scroll to Contact. Heading appears first, then the three contact rows stagger in from the top, and the map gently fades in with a very slight scale-up from the right.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add staggered entrance animations to contact section"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Fix `animate-bounce-subtle` — static fade-in | Task 1 ✓ |
| Stats heading whileInView | Task 2 ✓ |
| Standardise stats stagger to 0.08s | Task 2 ✓ |
| Services heading whileInView | Task 3 ✓ |
| All 5 service cards get whileInView | Task 3 ✓ |
| Service cards keep whileHover | Task 3 ✓ |
| Domains heading whileInView | Task 4 ✓ |
| Standardise domains stagger to 0.08s | Task 4 ✓ |
| Testimonials label → quote → patient → stats | Task 5 ✓ |
| CTA heading → paragraph → buttons | Task 6 ✓ |
| Contact heading → items → map | Task 7 ✓ |
| viewport={{ once: true }} everywhere | All tasks ✓ |
| duration: 0.6 everywhere | All tasks ✓ |

**Out-of-scope (confirmed not in plan):** number counters, parallax, carousel, ken-burns, infinite animations. ✓
