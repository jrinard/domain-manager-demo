const { join } = require('node:path')

const createTailwindConfig = require(
  join(__dirname, 'packages/falcon/tailwind/src'),
).createConfig

/** @type {import('tailwindcss').Config} */
module.exports = createTailwindConfig(__dirname, [
  'src',
  'packages/interfaces/domain-manager',
  'packages/domain/ui',
  'packages/domain/configs',
  'packages/domain/styles',
  'packages/falcon-ui',
  'packages/bento',
  'packages/starliner',
  'packages/dossier',
  'packages/navigator',
  'packages/falcon/buttons',
  'packages/falcon/icons',
  'packages/falcon/date-picker',
  'packages/falcon/icon-picker',
  'packages/manifest',
  'packages/chaincode',
])
