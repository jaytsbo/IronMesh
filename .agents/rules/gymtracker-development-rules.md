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
