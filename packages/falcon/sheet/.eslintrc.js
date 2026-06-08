const falconTailwind = require('../tailwind/.eslintrc')
module.exports = {
  ...falconTailwind,
  extends: ['plugin:@nx/react', '../../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  plugins: ['tailwindcss'],
  settings: {
    tailwindcss: falconTailwind.settings.tailwindcss,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['packages/falcon/sheet/tsconfig.*?.json'],
      },
      rules: falconTailwind.overrides[0].rules,
    },
  ],
}
