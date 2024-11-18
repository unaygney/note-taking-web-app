/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  $schema: 'https://json.schemastore.org/prettierrc',
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/app/(.*)$',
    '^./(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  printWidth: 80,
  singleQuote: true,
  proseWrap: 'always',
  tailwindFunctions: ['cn', 'cva'],
}