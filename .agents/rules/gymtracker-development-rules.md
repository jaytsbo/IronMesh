---
trigger: always_on
---

# GymTracker Development Rules

## Tech Stack & Runtime
- Framework: React Native with Expo (Managed Workflow, latest stable).
- Routing: Expo Router (file-based routing under app/ directory).
- Language: TypeScript (strict mode enabled, avoid 'any', prefer explicit interfaces).
- Styling: NativeWind (Tailwind CSS v4/v3 for React Native).
- Local Database: expo-sqlite (use modern useSQLiteContext and async migration APIs).
- State & Gestures: React Native Reanimated + React Native Gesture Handler.

## Architecture & Code Quality
- Strictly separate UI, state/hooks, and database queries.
- All database operations must be wrapped in TypeScript-typed repository functions.
- Every business entity must have corresponding interface definitions in types/.
- Write clear comments in Traditional Chinese (繁體中文).

## Change Management & Workflow
- **Pre-Change Proposal & Approval**: Before making any code adjustments, submit a structured Change Plan Report outlining:
  1. **Root Cause / Issue Location**: Pinpoint the exact bug, performance bottleneck, or affected files/functions.
  2. **Proposed Solution**: Detailed step-by-step strategy for the fix or feature addition.
  3. **Impact Scope**: Components, hooks, database models, or types that will be affected.
  *Wait for user confirmation and approval before executing any code modifications.*
- **Self-Testing & Verification**: Immediately after implementing the approved changes, conduct automated and manual verification:
  1. Run TypeScript type checks and linting to ensure zero type errors.
  2. Validate database transactions, migration integrity, and state consistency.
  3. Verify edge cases and regressions to ensure all existing features remain intact before concluding the task.