# tailwindcss-surfaces

Tailwind Plugin providing surface modifiers for changing colors.

```
<div className="group-surface-light:text-primary group-surface-dark:text-secondary">On surface</div>
```

## Roadmap Ideas
- Remove `group-` prefix
```
<div className="surface-light:text-primary surface-dark:text-secondary">On surface</div>
```

- Potentially Deprecate `light` and `dark` and use colors
```
<div className="surface-secondary:text-primary surface-primary:text-secondary">On surface</div>
```

- Use (or at least support) Mode Aware https://www.wyeworks.com/blog/2022/10/12/mode-aware-colors-with-tailwind-css/
- Use this instead or wrap it https://www.npmjs.com/package/@mertasan/tailwindcss-variables
