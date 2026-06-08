# @domain/schemas

Home section schemas and types for the Spacedock platform.

## Overview

This package contains Zod schemas, TypeScript types, and validation logic for all home section types. It serves as a shared dependency for both `@domain/ui` (components) and `@domain/configs` (configuration utilities).

## Architecture

```text
@spacedock/data-validation  (Zod wrapper)
         ↑
   @domain/schemas          (Section schemas + types) ← YOU ARE HERE
         ↑         ↑
   @domain/ui  @domain/configs
```

## Contents

- **Types**: `HomeSectionType`, `SectionMetadata`, etc.
- **Fragments**: Reusable schema fragments (`zDashboardFilters`, `zIconConfig`)
- **Sections**: Individual section schemas (title, stats-count, activity-table, etc.)
- **Registry**: Central schema registry for programmatic access

## Usage

```typescript
import { statsCountSchema, ActiveEmployeesData, getSectionSchema, HomeSectionType } from '@domain/schemas'

// Get a schema
const schema = getSectionSchema('stats-count')

// Validate section data
const result = schema.safeParse(data)

// Use inferred types
const data: ActiveEmployeesData = {
  sub_type: 'active-employees',
  daysCount: 30,
  iconColorScheme: 'blue',
}
```
