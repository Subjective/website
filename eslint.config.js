const { defineConfig, globalIgnores } = require('eslint/config')

const tsParser = require('@typescript-eslint/parser')
const globals = require('globals')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const js = require('@eslint/js')
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const jsxA11y = require('eslint-plugin-jsx-a11y')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  ...nextCoreWebVitals,
  { rules: jsxA11y.flatConfigs.recommended.rules },
  {
    languageOptions: {
      parser: tsParser,

      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ),

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      'react/prop-types': 0,
      'no-unused-vars': 0,
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores(['**/node_modules']),
])
