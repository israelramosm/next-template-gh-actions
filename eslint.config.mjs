import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import tseslint from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    plugins: {
      react,
      prettier: prettierPlugin,
    },
    rules: {
      // JavaScript rules
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
      // React rules
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': ['warn', { extensions: ['ts', 'tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Prettier as a warning rather than an error
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],
    },
  },
];

export default eslintConfig;
