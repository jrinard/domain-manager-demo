module.exports = {
  "extends": [
    "plugin:@nx/react",
    "../../.eslintrc.json"
  ],
  "ignorePatterns": ["!**/*", "**/tailwind-surfaces/*", "**/vite-plugin/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "no-console": "error"
      }
    },
    {
      "files": ["./package.json"],
      "parser": "jsonc-eslint-parser",
      "rules": {
        "@nx/nx-plugin-checks": "error"
      }
    }
  ]
}
