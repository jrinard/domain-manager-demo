# @spacedock/data-validation

Validation utilities for Spacedock, wrapping Zod for schema-based validation and form generation.

## Usage

```typescript
import { z } from '@spacedock/data-validation'
import { zodToFormMetadata } from '@spacedock/data-validation/form-adapter'

// Define a schema
const schema = z.object({
  name: z.string().min(1),
  age: z.number().positive(),
})

// Extract form metadata for rendering
const formMetadata = zodToFormMetadata(schema)

// Validate data
const result = schema.safeParse(data)
```

## Features

- Re-exports Zod for consistent imports across codebase
- Custom Zod extensions for common patterns
- Form adapter to convert Zod schemas to form metadata
- Section schema utilities
