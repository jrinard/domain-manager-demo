import type { Config } from 'tailwindcss'
import { TOKEN_DEFS } from '../schema/tokens'

export function tokensAsTailwindColors(): Record<string, string> {
  const entries = Object.keys(TOKEN_DEFS)
    .filter((k) => !k.startsWith('--radius')) // Exclude radius tokens from colors
    .map((k) => [
      k.replace(/^--/, ''),
      `var(${k})`,
    ]) as [string, string][]
  return Object.fromEntries(entries)
}

export function withTokenColors(config: Config): Config {
  return {
    ...config,
    theme: {
      ...(config.theme || {}),
      extend: {
        ...((config.theme && (config.theme as any).extend) || {}),
        colors: {
          ...((config.theme as any)?.extend?.colors || {}),
          ...tokensAsTailwindColors(),
        },
      },
    },
  }
}
