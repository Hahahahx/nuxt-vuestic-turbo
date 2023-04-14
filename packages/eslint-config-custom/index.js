module.exports = ({
  extends: [
    '@unocss',
    'prettier',
    '@antfu',
  ],
  rules: {
    'max-statements-per-line': 'off',
    'no-console': 'warn',
    'comma-dangle': [
      'error', 'always-multiline',
    ],
    'eslint-comments/no-unlimited-disable': 'off',
    'arrow-parens': [
      'error', 'always',
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'semi': [
      'error', 'never',
    ],
    'indent': [
      'error', 2,
    ],
    'no-lonely-if': 'error',
    'import/export': 'warn',
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        multiline: true,
        minProperties: 2,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 3,
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: [
          'script',
          'template',
          'style',
        ],
      },
    ],
    'vue/no-multiple-template-root': 'off',
  },
  settings: {
    'mdx/code-blocks': true,
    'mdx/language-mapper': {},
  },
  // overrides: [
  //   {
  //     files: [
  //       '*.mdx', '*.md',
  //     ],
  //     rules: { '@typescript-eslint/indent': 'off' },
  //     extends: 'plugin:mdx/recommended',
  //     parserOptions: { ecmaVersion: 'latest' },
  //   },
  // ],
  ignorePatterns: [
    '**/*.json',
    'dist',
    'cache',
    'node_modules',
    '.turbo',
    '.nuxt',
    'public',
    '.output',
    '!.storybook',
  ],
})
