import { colors } from './themes'

export default defineNuxtConfig({
  ssr: false, // generate page
  modules: [
    '@vue-macros/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vuestic/nuxt',
    '@nuxt/content',
    '@nuxt/devtools',
  ],
  css: ['@unocss/reset/tailwind.css'],
  vuestic: {
    config: {
      colors: {
        variables: {
          ...colors,
        },
      },
      components: {
        VaButton: {
        },
      },
    },
  },
  content: {
    // sources:{
    //   driver:'fs',
    //   base:
    // }
    highlight: {
      // Theme used in all color schemes.

      preload: [
        'json',
        'shell',
        'yaml',
      ],
      // OR
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
    },
  },
  // unocss: {
  //   attributify: true,
  //   icons: true,
  //   components: false,
  //   shortcuts: [
  //     ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  //   ],
  // },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
      },
      {
        code: 'zh',
        file: 'zh-CN.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
    },
    lazy: true,
    langDir: '../../packages/locales',
    defaultLocale: 'zh',
  },
  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },
})
