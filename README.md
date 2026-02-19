# Lawyer Prompt Studio

MVP web app for ready-to-ship legal prompt templates plus a guided template wizard.

## Features

- Library with search, filters, and quality scoring
- Template detail views with copy, variables, examples, and warnings
- Prompt Wizard with best-practice steps
- My Templates with local persistence, edit/duplicate/export
- Import/export JSON and Markdown

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS

## UI Refresh

- Introduced design tokens (color, type, radii, shadows) for a cohesive SaaS-grade system
- Added reusable UI primitives (buttons, cards, tags, inputs, section headers)
- Redesigned home, library, template detail, wizard, and my-templates for stronger hierarchy and scannability
- Added sticky filters, richer empty states, and polished interactions

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

- `app/library`: Template library page
- `app/templates/[id]`: Template detail page
- `app/wizard`: Prompt wizard
- `app/my-templates`: Local template manager
- `lib/templates.ts`: Seed templates
- `lib/quality.ts`: Quality checker rubric
- `lib/storage.ts`: Local persistence + import/export

## Roadmap

1. Add authentication and team workspaces
2. Connect to a backend for shared template libraries
3. Add versioning, approvals, and audit logs
4. Support multi-model execution with evaluation harness
5. Expand template metadata (risk tier, jurisdiction map, practice tags)
