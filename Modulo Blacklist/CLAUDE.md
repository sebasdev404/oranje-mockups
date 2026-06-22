# Oranje Platform — project rules

## Component reuse (STRICT)
When building or editing any UI in this project, **reuse the existing components already used in the app's modules** (Reclutamiento, Requisiciones, Entrevistas, Schedule, Blacklist) — same classes, markup, typography, icons, backgrounds, dimensions, and states.

- Do **NOT** invent new components when an equivalent already exists. Find it and reuse it.
- Do **NOT** rely on any "internal DS" that isn't actually what the modules use — it is often wrong. The source of truth is what you see used in THIS project's modules.
- Components must look and behave coherently across modules and be scalable.

Known reusable components (examples):
- Option/radio cards → `.recl-mig-opt` (icon + nm/det + `check_circle` chk; `.checked` state) or `.recl-origen-opt`.
- File / evidence upload → `.entrev-rej-attach` + `.entrev-rej-file` (file chips). CV-style: `.recl-cv-drop` / `.recl-upload`.
- Candidate cards (assignment) → `.ram-card` (check + avatar + name/DOC/status/hoteles + `.ram-tag` row + Ver perfil).
- Modal shell → light `.recl-modal-head` (orange-dot eyebrow), cream `.recl-modal-body`, numbered orange section labels, orange gradient primary CTA.
- Filter dropdowns → `.recl-filter-grp` + `.recl-fdd` (Posición, Zona, Modalidad, Inglés, Estado).

## ID convention
- Show the colaborador ID, not internal references. Requisiciones cards: `ID C-####`. Blacklist: `ID-####`.
