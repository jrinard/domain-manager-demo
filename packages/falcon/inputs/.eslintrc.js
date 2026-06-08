const falconTailwind = require('../tailwind/.eslintrc')
module.exports = {
  "extends": ["plugin:@nx/react", "../../../.eslintrc.json"],
  "ignorePatterns": ["!**/*"],
  "plugins": ["tailwindcss"],
  "settings": {
    "tailwindcss": falconTailwind.settings.tailwindcss
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parserOptions": {
        "project": [`${__dirname}/tsconfig.*?.json`]
      },
      rules: falconTailwind.overrides[0].rules
    }
  ]
}
