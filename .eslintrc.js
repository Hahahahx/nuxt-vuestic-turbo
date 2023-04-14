const apps = 'apps/'
const nuxtPath = `${apps}/nuxt`

module.exports = ({
  extends: ['custom'],
  root: true,
  settings: {
    next: {
      rootDir: [
        'apps/*/', 'packages/*/',
      ],
    },
  },
  overrides: [
    // Welche Regeln brauchen wir?
    {
      files: [
        '*.mdx', '*.md',
      ],
      rules: { '@typescript-eslint/indent': 'off' },
      extends: 'plugin:mdx/recommended',
      parserOptions: { ecmaVersion: 'latest' },
    },
    // Package Overrides
    {
      files: ['./packages/**/*.{js,ts,vue}'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },

    // Nuxt Overrides
    {
      files: [
        `${nuxtPath}/components/**/*.{js,ts,vue}`,
        `${nuxtPath}/pages/**/*.{js,ts,vue}`,
        `${nuxtPath}/layouts/**/*.{js,ts,vue}`,
      ],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
})
